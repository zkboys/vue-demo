import * as types from '../../constants/mutation-types';
import handleMutation from '../utils/handle-mutation';

export default {
    syncToLocal: {
        message: true,
    },
    state: {
        message: '初始化message',
        pending: false,
    },
    mutations: {
        [types.CHANGE_HELLO_MESSAGE]: handleMutation({
            always(/* state, action */) { // 总会 pending resolve reject之前被调用，可以做一些共同的处理
            },
            pending(state) {
                state.pending = true;
            },
            resolve(state, payload) {
                state.message = payload;
            },
            reject(state, error) {
                state.message = `is a error ${error.body}`;
            },
            complete(state, /* action */) { // 在 resolve 或 reject 之后被调用，可以做一些共同的处理
                state.pending = false;
            },
        }),
        [types.SYNC_STATE_FROM_STORAGE](state, action) {
            const {payload} = action;
            if (payload.hello && payload.hello.message) {
                state.message = payload.hello.message;
            }
        },
    },
};
