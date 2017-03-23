export default {
    name: 'hello',
    data() {
        return {
            msg: 'Welcome to Home',
        };
    },
    methods: {
        testEmit() {
            this.$eventBus.$emit('id-selected', 1);
        },
    },
    created() {
        this.$eventBus.$on('id-selected', id => console.log(id));
    },
};
