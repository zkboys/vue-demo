export const getMessage = (id) => {
    const messages = ['我是信息1，我来自services', 'I am message 2, I come from services'];
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id) {
                resolve(messages[id]);
            } else {
                reject(Error('获取信息出错了'));
            }
        }, 1000);
    });
};
