import * as types from '../../constants/mutation-types';
import {handleMutation} from '../vuex-additions/index';

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
            pending(state, /* action */) {
                state.pending = true;
            },
            resolve(state, action) {
                const {payload} = action;
                state.message = payload;
            },
            reject(state, action) {
                const {payload} = action;
                state.message = `is a error ${payload.body}`;
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
