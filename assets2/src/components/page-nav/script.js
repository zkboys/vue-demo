import {getScrollBarWidth, css} from '../../common/util';
import {mapState, mapActions} from 'vuex';

export default {
    name: 'head',
    data() {
        return {
            navInnerStyle: '',
        };
    },
    computed: mapState({
        systemMenus: state => state.app.systemMenus,
    }),
    methods: {
        ...mapActions([
            'getSystemMenus',
        ]),
        handleSelect(key, keyPath){
            console.log(key, keyPath);
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    created() {
        this.getSystemMenus();
        console.log(this.systemMenus);
    },
    mounted(){
        const navEl = this.$refs.nav;
        const navInnerEl = this.$refs.navInner;
        const oldWidth = parseInt(css(navEl, 'width'));
        const newWidth = oldWidth + getScrollBarWidth();
        css(navInnerEl, 'width', `${newWidth}px`);
    }
};
