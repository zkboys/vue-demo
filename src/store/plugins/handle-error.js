import {Toast} from 'mint-ui';

export default function createHandleError() {
    return (store) => {
        // store 初始化时，就会调用subscribe，subscribe中的代码，会再没一个mutations触发之后被调用
        store.subscribe((mutation) => {
            // error 为true/false payload在error === true时，存储的是error对象
            const {error, payload, meta = {}} = mutation.payload;
            const {autoShowError = true} = meta;

            if (error && autoShowError) {
                let message = payload.toString();
                if (payload.body) {
                    message = payload.body;
                }
                Toast({
                    message,
                    duration: 3000,
                });
            }
        });
    };
}

