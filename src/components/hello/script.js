import {mapState, mapActions} from 'vuex';

export default {
    name: 'hello',
    computed: mapState({
        hello: 'hello',
        pendingMessage(state) {
            return state.hello.pending ? '加载中' : '请求完成';
        },
    }),
    methods: {
        ...mapActions([
            'changeHelloMessage',
        ]),
        changeMessage(id) {
            this.changeHelloMessage({
                id,
                resolve() {
                },
                reject() {
                },
            });
        },
    },
};
