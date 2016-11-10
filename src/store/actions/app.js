import * as _ from 'lodash';
import * as types from '../../constants/mutation-types';
import createAction from '../utils/create-action';
import {local} from '../../common/storage';
import modules from '../modules/index';
import {LOCAL_KEY_PREFIX} from '../../constants/constants';

// 从localStorage中同步state到项目中
export const syncStateFromLocalStorage = createAction(types.SYNC_STATE_FROM_STORAGE, (keys) => {
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
});
