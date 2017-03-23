import Vue from 'vue';
import Vuex from 'vuex';
import NProgress from 'nprogress';
import createLogger from 'vuex/dist/logger';
import {createSyncState, createHandleError, createHandlePending} from './vuex-additions/index';
import modules from './modules';
import {local} from './common/storage';
import {LOCAL_KEY_PREFIX} from './constants/constants';
import {
    SYNC_STATE_FROM_STORAGE,
} from './constants/mutation-types';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
const syncStateOptions = {
    syncAction: SYNC_STATE_FROM_STORAGE,
    keyPrefix: LOCAL_KEY_PREFIX,
    modules,
    setItem: local.setItem,
};
const handleErrorOptions = {
    errorCallBack(message) {
        // TODO 修改提示信息
        alert(message);
    },
};
const handlePendingOptions = {
    pendingCallBack() {
        NProgress.start();
    },
    pendingOverCallBack() {
        NProgress.done();
    },
};

const plugins = [
    createSyncState(syncStateOptions),
    createHandleError(handleErrorOptions),
    createHandlePending(handlePendingOptions),
];
if (debug) {
    plugins.push(createLogger({}));
}

export default new Vuex.Store({
    modules,
    strict: debug,
    plugins,
});
