import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import createSyncState from './plugins/sync-state-to-local-storage';
import createHandleError from './plugins/handle-error';
import actions from './actions';
import getters from './getters';
import modules from './modules';

import {local} from '../common/storage';
import {LOCAL_KEY_PREFIX} from '../constants/constants';
import {
    SYNC_STATE_FROM_STORAGE,
} from '../constants/mutation-types';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
const syncStateOptions = {
    syncAction: SYNC_STATE_FROM_STORAGE,
    keyPrefix: LOCAL_KEY_PREFIX,
    modules,
    setItem: local.setItem,
};

const plugins = [createSyncState(syncStateOptions), createHandleError()];
if (debug) {
    plugins.push(createLogger({}));
}

export default new Vuex.Store({
    actions,
    getters,
    modules,
    strict: debug,
    plugins,
});
