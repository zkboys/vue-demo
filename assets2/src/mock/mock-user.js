import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {Users} from './mockdata/user.js';

export default function () {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
        msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
        msg: 'failure'
    });

    // 获取用户列表（分页）
    mock.onGet('/api/users').reply(config => {
        let {
            currentPage = 1,
            pageSize = 20,
            userName,
            group,
        } = JSON.parse(config.data);
        let mockUsers = Users.filter(user => {
            if (userName && user.name.indexOf(userName) === -1) {
                return false;
            }

            if (group && user.group.indexOf(group) === -1) {
                return false;
            }

            if (userName && group && (user.name.indexOf(userName) === -1 || user.group.indexOf(group) === -1)) {
                return false;
            }
            return true;
        });
        let total = mockUsers.length;
        mockUsers = mockUsers.filter((u, index) => index < pageSize * currentPage && index >= pageSize * (currentPage - 1));
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, {
                    total: total,
                    results: mockUsers
                }]);
            }, 1000);
        });
    });
};
