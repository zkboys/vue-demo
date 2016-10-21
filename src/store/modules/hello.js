import * as types from '../mutation-types';

const initialState = {
    message: '初始化message',
};

const mutations = {
    [types.CHANGE_HELLO_MESSAGE](state, {message}) {
        state.message = message;
    },
};

export default {
    state: initialState,
    mutations,
};
