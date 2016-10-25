import {mapState, mapActions} from 'vuex';

export default {
    name: 'hello',
    computed: {
        ...mapState([
            'hello', // 与modules名称对应 hello.message
        ]),
        pendingMessage() {
            return this.hello.pending ? '加载中' : '请求完成';
        },
    },
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
