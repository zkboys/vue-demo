import Vue from 'vue';
import {getScrollBarWidth, css} from '../../common/util';
import {mapState, mapActions} from 'vuex';
import './style.less';
import FontIcon from '../font-icon/index.jsx';

export default Vue.component('page-head', {
    components: {
        FontIcon,
    },
    data() {
        return {
            navInnerStyle: '',
        };
    },
    computed: mapState({
        systemMenus: state => state.app.systemMenus,
        activeSystemMenuIndex: state => state.app.activeSystemMenuIndex,
    }),
    methods: {
        ...mapActions([
            'getSystemMenus',
        ]),
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        renderMenus(menus) { // 递归算法构建菜单
            return menus.map((menu, index) => {
                menu.path = menu.path || `${index}`;
                const path = menu.path;
                const text = menu.text;
                const icon = menu.icon;
                const type = menu.type;
                const children = menu.children;

                const isGroup = type === 'group' && children;
                const isSubmenu = !isGroup && children;
                const isMenuItem = !children;
                const iconJsx = icon ? <FontIcon name={icon}/> : null;
                menu.isMenuItem = isMenuItem;

                if (isMenuItem) {
                    return <el-menu-item index={path}>{iconJsx}{text}</el-menu-item>;
                }
                if (isSubmenu) {
                    return (
                        <el-submenu index={path}>
                            <template slot="title">{iconJsx}{text}</template>
                            {this.renderMenus(children)}
                        </el-submenu>
                    )
                }
                if (isGroup) {
                    return (
                        <el-menu-item-group>
                            <template slot="title">{iconJsx}{text}</template>
                            {this.renderMenus(children)}
                        </el-menu-item-group>
                    );
                }
            });
        },
    },
    created() {
        this.getSystemMenus();
    },
    render(h) {
        const menusJsx = this.renderMenus(this.systemMenus);
        return (
            <nav id="nav" ref="nav">
                <div class="nav-inner" ref="navInner" style={this.navInnerStyle}>
                    <el-menu
                        router={true}
                        default-active={this.activeSystemMenuIndex}
                        on-select={this.handleSelect}
                        on-open={this.handleOpen}
                        on-close={this.handleClose}
                        theme="dark">
                        {menusJsx}
                    </el-menu>
                </div>
            </nav>
        );
    },
    mounted() {
        const navEl = this.$refs.nav;
        const navInnerEl = this.$refs.navInner;
        const oldWidth = parseInt(css(navEl, 'width'));
        const newWidth = oldWidth + getScrollBarWidth();
        css(navInnerEl, 'width', `${newWidth}px`);
        setTimeout(() => {
            this.activeSystemMenu = '/hello';
        }, 2000);
    },
});
