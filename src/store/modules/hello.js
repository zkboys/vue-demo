import * as types from '../../constants/mutation-types';
import {createAction, handleMutation} from '../vuex-additions/index';
import * as request from '../utils/request';
import {
    GET_USER_URL,
} from '../../constants/url';

export default {
    syncToLocal: {
        message: true,
    },
    state: {
        message: '初始化message',
        pending: false,
    },
    actions: {
        changeHelloMessage: createAction(types.CHANGE_HELLO_MESSAGE,
            ({id}) => {
                const messages = ['我是信息1，我来自action', 'I am message 2, I come from action'];
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (id) {
                            resolve(messages[id]);
                        } else {
                            // throw Error('我自己抛出的错误');
                            reject(Error('获取信息出错了'));
                        }
                    }, 500);
                });
            },
            ({id}) => ({
                id,
            })),

        getUser: createAction(types.GET_USER,
            ({id}) => request.post(GET_USER_URL.replace('{id}', id), {name: 111, pass: 111}),
            () => ({
                autoShowError: true,
                autoShowPending: true,
            })
        ),
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
