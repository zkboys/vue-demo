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
        return res;
    }

    if (status === 401) {
        window.location.href = config.signInPath;
    }

    return res.json().then((body) => {
        const error = new Error(statusText);
        error.body = body;
        error.type = 'http';
        error.status = status;
        throw error;
    });
}

/**
 * 处理返回的结果，
 * @param res
 * @returns promise
 */
function filterJSON(res) {
    return res.json(); // res.json() 是一个promise
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
        .then(filterStatus)
        .then(filterJSON);
}

export function post(url, body) {
    body = filterParams(body);
    url = urlPrefix + url;
    return fetch(url, getOptions('POST', body))
        .then(filterStatus)
        .then(filterJSON);
}

export function put(url, body) {
    body = filterParams(body);
    url = urlPrefix + url;
    return fetch(url, getOptions('PUT', body))
        .then(filterStatus)
        .then(filterJSON);
}

export function del(url, body) {
    body = filterParams(body);
    url = urlPrefix + url;
    return fetch(url, getOptions('DELETE', body))
        .then(filterStatus)
        .then(filterJSON);
}

