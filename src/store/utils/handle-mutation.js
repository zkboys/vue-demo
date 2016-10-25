import * as _ from 'lodash';

export default function handleMutation({
    pending = () => {
    },
    resolve = () => {
    },
    reject = () => {
    },
}) {
    return (state, action) => {
        const {meta = {}, error, payload} = action;
        const isPending = meta.sequence && meta.sequence.type === 'start';
        if (isPending) {
            pending(state, action);
        } else if (error) {
            reject(state, payload, action);
            if (meta.reject && _.isFunction(meta.reject)) {
                meta.reject(payload);
            }
        } else {
            resolve(state, payload, action);
            if (meta.resolve && _.isFunction(meta.resolve)) {
                meta.resolve(payload);
            }
        }
    };
}
