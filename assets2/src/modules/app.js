import * as _ from 'lodash';
import * as types from '../constants/mutation-types';
import {createAction, handleMutation} from '../vuex-additions/index';
import {local} from '../common/storage';
import modules from '../modules/index';
import {LOCAL_KEY_PREFIX} from '../constants/constants';

export default {
    syncToLocal: {
        message: true,
        a: true,
        b: {
            c: true,
        },
        e: {
            f: {
                g: true,
            },
        },
    },
    state: {
        systemMenus: [],
        activeSystemMenuIndex: '',
        showPageHead: true,
        pageHead: '',
        breadcrumb: [],
        message: '初始化message',
        pending: false,
        a: 'a',
        b: {
            c: 'c',
            d: 'd',
        },
        e: {
            f: {
                g: {
                    h: 'h',
                },
            },
        },
    },
    actions: {
        syncStateFromLocalStorage: createAction(types.SYNC_STATE_FROM_STORAGE, (keys) => {
            let multiKeys = [];

            if (_.isString(keys)) {
                multiKeys.push(keys);
            } else if (_.isArray(keys)) {
                multiKeys = keys;
            } else {
                for (const moduleName of Object.keys(modules)) {
                    const {syncToLocal} = modules[moduleName];
                    if (syncToLocal) {
                        multiKeys.push(moduleName);
                    }
                }
            }
            multiKeys = multiKeys.map(key => LOCAL_KEY_PREFIX + key);
            const localValues = local.multiGet(multiKeys);
            const result = {};
            Object.keys(localValues).forEach((key) => {
                const newKey = key.replace(LOCAL_KEY_PREFIX, '');
                result[newKey] = localValues[key];
            });
            return result;
        }),
        getSystemMenus: createAction(types.GET_SYSTEM_MENUS, () => {
            // TODO 请求后端真实数据，如果是扁平化数据，这里转成如下结构数据
            // TODO 如果path为null，初始化为/nothing
            /**
             * path: 页面路径，如果为父节点或者group节点，缺省或者写为/nothing
             * text: 菜单显示名称
             * icon: 菜单图标，可以为空
             * type: 菜单类型，父菜单还是分组菜单，可选值：group submenu 默认或缺省为：submenu
             * children: 子菜单或者分组菜单项
             */
            return [
                {
                    text: '哈喽',
                    icon: 'el-icon-message',
                    // type: 'group', // group submenu 默认 submenu
                    children: [
                        {
                            path: '/',
                            text: 'home',
                            icon: 'el-icon-star-on',
                        },
                        {
                            path: '/hello',
                            text: 'hello',
                            icon: 'el-icon-setting',
                        },
                        {
                            path: '/login',
                            text: '登录',
                            icon: 'el-icon-time'
                        },
                        {
                            path: '/nothing',
                            text: '分组名称',
                            icon: 'el-icon-picture',
                            type: 'group',
                            children: [
                                {
                                    path: '/aa',
                                    text: '分组一',
                                },
                                {
                                    path: '/aaa',
                                    text: '分组二',
                                }
                            ],

                        }
                    ],
                },
                {
                    path: '/nothing',
                    text: '人员管理'
                }
            ];
        }),
        setActiveSystemMenuIndex: createAction(types.SET_ACTIVE_SYSTEM_MENU_INDEX),
        hidePageHead: createAction(types.HIDE_PAGE_HEAD),
        showPageHead: createAction(types.SHOW_PAGE_HEAD),
        setBreadcrumb: createAction(types.SET_BREADCRUMB),
        setPageTitle: createAction(types.SET_PAGE_TITLE),
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
        [types.GET_SYSTEM_MENUS](state, action) {
            const {payload} = action;
            state.systemMenus = payload;
        },
        [types.SET_ACTIVE_SYSTEM_MENU_INDEX](state, {payload}) {
            state.activeSystemMenuIndex = payload;
        },
        [types.SYNC_STATE_FROM_STORAGE](state, {payload}) {
            state.message = payload.hello && payload.hello.message;
        },
        [types.SHOW_PAGE_HEAD](state) {
            state.showPageHead = true;
        },
        [types.HIDE_PAGE_HEAD](state) {
            state.showPageHead = false;
        },
        [types.SET_BREADCRUMB](state, {payload}) {
            state.breadcrumb = payload;
        },
        [types.SET_PAGE_TITLE](state, {payload}) {
            state.pageHead = payload;
        },
    },
};
