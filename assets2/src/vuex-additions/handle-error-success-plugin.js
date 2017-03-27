export default function createHandleErrorSuccess(options) {
    const {
        errorCallBack = () => {
        },
        successCallBack = () => {
        },
    } = options;
    return (store) => {
        // store 初始化时，就会调用subscribe，subscribe中的代码，会再每一个mutations触发之后被调用
        store.subscribe((mutation) => {
            // error 为true/false payload在error === true时，存储的是error对象
            const {error, payload, meta = {}} = mutation.payload;
            let {errorTip = true, successTip = true, sequence} = meta;
            const isPendingOver = sequence && sequence.type === 'next';

            if (error && errorTip) {
                if (typeof errorTip === 'string') {
                    errorCallBack(errorTip, payload);
                } else {
                    let message = payload.toString();
                    if (payload.body) {
                        message = payload.body;
                    }
                    errorCallBack(message, payload);
                }
            }
            if (!error && successTip && isPendingOver) {
                if (successTip === true) {
                    successTip = '操作成功';
                }
                successCallBack(successTip, payload);
            }
        });
    };
}

