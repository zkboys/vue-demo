import * as types from '../mutation-types';
import handleMutation from '../utils/handle-mutation';

const initialState = {
    message: '初始化message',
    pending: false,
};


const mutations = {
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
};

export default {
    state: initialState,
    mutations,
};
