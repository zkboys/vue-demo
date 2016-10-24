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
            const vm = this;
            this.changeHelloMessage({
                id,
                resolve() {
                    console.log(`resolve callback from components ${id}`);
                    console.log(vm.hello.message);
                },
                reject() {
                    console.log(`reject callback from components ${id}`);
                },
            });
        },
    },
};
