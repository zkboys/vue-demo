import qs from 'query-string';
// Promise based HTTP client for the browser and node.js (https://github.com/mzabriskie/axios)
import axios from 'axios';
import config from '../../config';

const urlPrefix = config.apiPath;
const debug = process.env.NODE_ENV !== 'production';

// axios配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://localhost:8080';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (config.method === 'post') {
        config.data = qs.stringify(config.data)
    }
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
});

/**
 *
 * @param {*} url
 * @param {*} params
 * @param {*} method
 */
function fetch(url, params, method = 'get') {
    url = urlPrefix + url;
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: url,
            data: params
        }).then(response => {
            resolve(response.data)
        }, err => {
            reject(err)
        }).catch((error) => {
            reject(error)
        })
    })
}

export function get(url, params) {
    if (debug) {
        options.credentials = 'same-origin';// 携带cookie，否则前后端分离开发，无法请求后端数据。
    }
    return fetch(url, params, 'get');
}

export function post(url, body) {
    return fetch(url, body, 'post');
}

export function put(url, body) {
    return fetch(url, body, 'put');
}

export function del(url, body) {
    return fetch(url, body, 'delete');
}

