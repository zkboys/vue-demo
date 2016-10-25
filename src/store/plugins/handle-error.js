import {Toast} from 'mint-ui';

export default function createHandleError() {
    return (store) => {
        // called when the store is initialized
        store.subscribe((mutation) => {
            const {error, payload} = mutation.payload;
            // todo 根据payload（error）类型，处理错误信息
            if (error) {
                Toast({
                    message: payload.toString(),
                    duration: 3000,
                });
            }
        });
    };
}

