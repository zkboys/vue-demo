import * as _ from 'lodash';

function isPromise(val) {
    return val && typeof val.then === 'function';
}

export default function createAction(type, payloadCreator, metaCreator) {
    const finalPayloadCreator = typeof payloadCreator === 'function'
        ? payloadCreator
        : _.identity;

    const actionCreator = ({commit}, args) => {
        const hasError = args instanceof Error;

        const action = {
            type,
        };

        const payload = hasError ? args : finalPayloadCreator(args);
        if (!(payload === null || payload === undefined)) {
            action.payload = payload;
        }

        if (hasError || payload instanceof Error) {
            // Handle FSA errors where the payload is an Error object. Set error.
            action.error = true;
        }

        if (typeof metaCreator === 'function') {
            action.meta = metaCreator(args);
        }
        if (!args) {
            args = {};
        }
        // 异步处理
        const callBacks = {
            resolve: args.resolve,
            reject: args.reject,
        };
        const id = _.uniqueId();

        if (isPromise(payload)) {
            action.meta.sequence = {
                type: 'start',
                id,
            };
            commit(action);
            payload.then( // 异步结束时，再次调用reducer，分为成功或失败
                result => commit(type, {
                    ...action,
                    payload: result,
                    meta: {
                        ...callBacks,
                        ...action.meta,
                        sequence: {
                            type: 'next',
                            id,
                        },
                    },
                }),
                error => commit(type, {
                    ...action,
                    payload: error,
                    error: true,
                    meta: {
                        ...callBacks,
                        ...action.meta,
                        sequence: {
                            type: 'next',
                            id,
                        },
                    },
                })
            );
        } else {
            commit(type, action);
        }
    };

    actionCreator.toString = () => type.toString();

    return actionCreator;
}
