import * as storage from '../../common/storage';

export default function createSyncState() {
    return (store) => {
        // called when the store is initialized
        store.subscribe((mutation, state) => {
            const {error, meta = {}} = mutation.payload;
            const pending = meta.sequence && meta.sequence.type === 'start';
            if (!pending && !error) {
                const itemName = meta.sync;
                storage.setItem(itemName, state[itemName]);
            }
        });
    };
}

