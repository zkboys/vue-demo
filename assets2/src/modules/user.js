import * as types from '../constants/mutation-types';
import {createAction, handleMutation} from '../vuex-additions/index';
import * as request from '../common/request';

const GET_USER_URL = '/users';

export default {
    state: {
        users: [],
        pending: false,
    },
    actions: {
        getUsersByPage: createAction(types.GET_USERS_BY_PAGE,
            (params) => {
                return request.get(GET_USER_URL, params);
            },
            (params) => ({
                ...params,
                // errorTip: '自定义获取用户失败提示',
                autoShowPending: true,
                successTip: '自定义获取用户成功提示！'
            }),
        ),
    },
    mutations: {
        [types.GET_USERS_BY_PAGE]: handleMutation({
            always(/* state, action */) {
                // 总会 pending resolve reject之前被调用，可以做一些共同的处理
            },
            pending(state, /* action */) {
                state.pending = true;
            },
            resolve(state, action) {
                const {payload} = action;
                state.users = payload;
            },
            reject(/* state, action */) {
            },
            complete(state, /* action */) {
                // 在 resolve 或 reject 之后被调用，可以做一些共同的处理
                state.pending = false;
            },
        }),
    },
};
