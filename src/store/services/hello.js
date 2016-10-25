import * as request from '../utils/request';

export const getMessage = (id) => {
    const messages = ['我是信息1，我来自services', 'I am message 2, I come from services'];
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
};

export const getUsers = () => request.post('/signin', {name: 111, pass: 111});
