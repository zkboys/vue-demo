import {createAction} from '../vuex-additions/index';
import * as request from '../utils/request';
import {
    CHANGE_HELLO_MESSAGE,
    GET_USER,
} from '../../constants/mutation-types';

import {
    GET_USER_URL,
} from '../../constants/url';

export const changeHelloMessage = createAction(CHANGE_HELLO_MESSAGE,
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
    }));

export const getUser = createAction(GET_USER,
    ({id}) => request.post(GET_USER_URL.replace('{id}', id), {name: 111, pass: 111}),
    () => ({
        autoShowError: true,
        autoShowPending: true,
    })
);

