import Vue from 'vue';
import Vuex from 'vuex';
import NProgress from 'nprogress';
import createLogger from 'vuex/dist/logger';
import {createSyncState, createHandleErrorSuccess, createHandlePending} from './vuex-additions/index';
import {debug} from '../config/index.js';
import modules from './modules';
import {local} from './common/storage';
import {LOCAL_KEY_PREFIX} from './constants/constants';
import {
    SYNC_STATE_FROM_STORAGE,
} from './constants/mutation-types';

Vue.use(Vuex);

const syncStateOptions = {
    syncAction: SYNC_STATE_FROM_STORAGE,
    keyPrefix: LOCAL_KEY_PREFIX,
    modules,
    setItem: local.setItem,
};
const handleErrorSuccessOptions = {
    errorCallBack(message) {
        new Vue().$message.error(message);
    },
    successCallBack(message) {
        new Vue().$message.success(message);
    }
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
    createHandleErrorSuccess(handleErrorSuccessOptions),
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
