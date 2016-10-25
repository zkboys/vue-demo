import * as _ from 'lodash';
import * as types from '../mutation-types';
import createAction from '../utils/create-action';
import * as storage from '../../common/storage';

// 进入系统时，要从localStorage中同步哪些state到项目中，需要在这里指定
export const syncStateFromLocalStorage = createAction(types.SYNC_STATE_FROM_STORAGE, (keys) => {
    const allKeys = ['hello'];
    let multiKeys = [];
    if (_.isString(keys)) {
        multiKeys.push(keys);
    } else {
        multiKeys = keys;
    }
    if (!multiKeys) {
        multiKeys = allKeys;
    }
    return storage.multiGet(multiKeys);
});
