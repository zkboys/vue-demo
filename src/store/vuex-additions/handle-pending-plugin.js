export default function createHandlePending(options) {
    const {
        pendingCallBack = () => {
        },
        pendingOverCallBack = () => {
        },
    } = options;
    return (store) => {
        // store 初始化时，就会调用subscribe，subscribe中的代码，会再每一个mutations触发之后被调用
        store.subscribe((mutation) => {
            const {meta = {}} = mutation.payload;
            const isPending = meta.sequence && meta.sequence.type === 'start';
            const isPendingOver = meta.sequence && meta.sequence.type === 'next';
            const {autoShowPending = true} = meta;

            if (autoShowPending) {
                if (isPending) {
                    pendingCallBack(mutation);
                }
                if (isPendingOver) {
                    pendingOverCallBack(mutation);
                }
            }
        });
    };
}

