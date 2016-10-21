import {mapState, mapGetters, mapActions} from 'vuex';

export default {
    name: 'hello',
    computed: {
        good() {
            return 'good boy';
        },
        ...mapGetters({
            message: 'message',
        }),

        ...mapState({
            helloMessage: 'hello',
        }),
        ...mapState([
            'hello', // 与modules名称对应 hello.message
        ]),
    },
    methods: {
        ...mapActions([
            'changeHelloMessage',
        ]),
    },
};
