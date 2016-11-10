import * as _ from 'lodash';
import * as types from '../../constants/mutation-types';
import createAction from '../utils/create-action';
import {local} from '../../common/storage';
import localItemKeys from '../../constants/local-item-keys';

// 进入系统时，要从localStorage中同步哪些state到项目中，需要在这里指定
export const syncStateFromLocalStorage = createAction(types.SYNC_STATE_FROM_STORAGE, (keys) => {
    const allKeys = Object.keys(localItemKeys).map(key => localItemKeys[key]);
    let multiKeys = [];
    if (_.isString(keys)) {
        multiKeys.push(keys);
    } else {
        multiKeys = keys;
    }
    if (!multiKeys || !_.isArray(multiKeys)) {
        multiKeys = allKeys;
    }
    return local.multiGet(multiKeys);
});
