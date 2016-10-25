import * as types from '../mutation-types';
import handleMutation from '../utils/handle-mutation';

export default {
    state: {
        message: '初始化message',
        pending: false,
    },
    mutations: {
        [types.CHANGE_HELLO_MESSAGE]: handleMutation({
            pending(state) {
                state.pending = true;
            },
            resolve(state, payload) {
                state.pending = false;
                state.message = payload;
            },
            reject(state, error) {
                state.pending = false;
                state.message = `is a error ${error}`;
            },
        }),
        [types.SYNC_STATE_FROM_STORAGE](state, action) {
            const {payload} = action;
            state.message = payload.hello.message;
        },
    },
};
