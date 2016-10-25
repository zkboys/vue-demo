import qs from 'query-string';
import 'whatwg-fetch';
import config from '../../configs';

const urlPrefix = config.apiPath;
const debug = process.env.NODE_ENV !== 'production';

/**
 * 统一处理请求参数
 * @param params
 * @returns {{}}
 */
function filterParams(params = {}) {
    /*
     const dom = document.querySelector('meta[name="csrf-token"]');
     params._csrf = dom && dom.getAttribute('content');
     */
    return params;
}

/**
 * 根据返回的状态，对结果进行不同的处理
 * @param res
 * @returns {*}
 */
function filterStatus(res) {
    const status = res.status;
    const statusText = res.statusText;

    if (status >= 200 && status < 300) {
        return res.json();
    }

    if (status === 401) {
        // TODO 需要登录
        window.location.href = config.signInPath;
    }
    return res.json().catch((body) => {
        const error = new Error(statusText);
        error.body = body;
        error.type = 'http';
        error.status = status;
        // TODO 各种请求相关的错误，可以在这里扩展
        if (status === 500) {
            error.body = '未知服务器错误';
        }
        throw error;
    });
}


function getOptions(method, body) {
    const options = {
        method,
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };
    if (debug) {
        options.credentials = 'same-origin';
    }
    return options;
}

export function get(url, params) {
    params = filterParams(params);
    url = urlPrefix + url;
    if (params) {
        url += `?${qs.stringify(params)}`;
    }
    const options = {};
    if (debug) {
        options.credentials = 'same-origin';// 携带cookie，否则前后端分离开发，无法请求后端数据。
    }
    return fetch(url, options)
        .then(filterStatus);
}

export function post(url, body) {
    body = filterParams(body);
    url = urlPrefix + url;
    return fetch(url, getOptions('POST', body))
        .then(filterStatus);
}

export function put(url, body) {
    body = filterParams(body);
    url = urlPrefix + url;
    return fetch(url, getOptions('PUT', body))
        .then(filterStatus);
}

export function del(url, body) {
    body = filterParams(body);
    url = urlPrefix + url;
    return fetch(url, getOptions('DELETE', body))
        .then(filterStatus);
}

