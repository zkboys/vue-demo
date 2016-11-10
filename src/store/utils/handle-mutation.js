import * as _ from 'lodash';
import {Indicator} from 'mint-ui';

export default function handleMutation({
    always = () => {
    },
    pending = () => {
    },
    resolve = () => {
    },
    reject = () => {
    },
    complete = () => {
    },
}) {
    return (state, action) => {
        const {meta = {}, error, payload} = action;
        const isPending = meta.sequence && meta.sequence.type === 'start';
        const {autoShowPending = true} = meta;

        always(state, action);

        if (isPending) {
            if (autoShowPending) {
                Indicator.open();
            }

            pending(state, action);
        } else if (error) {
            Indicator.close();

            reject(state, payload, action);
            complete(state, action);

            if (meta.reject && _.isFunction(meta.reject)) {
                meta.reject(payload);
            }
        } else {
            Indicator.close();

            resolve(state, payload, action);
            complete(state, action);

            if (meta.resolve && _.isFunction(meta.resolve)) {
                meta.resolve(payload);
            }
        }
    };
}
