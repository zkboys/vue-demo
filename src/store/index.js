import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import createSyncState from './plugins/sync-state-to-local-storage';
import createHandleError from './plugins/handle-error';
import actions from './actions';
import getters from './getters';
import modules from './modules';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const plugins = [createSyncState(), createHandleError()];
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
