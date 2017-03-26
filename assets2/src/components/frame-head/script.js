import Popover from '../popover.vue';
import Avatar from '../avatar.jsx';

export default {
    name: 'head',
    components: {
        Popover,
        Avatar,
    },
    data() {
        return {
            showLogoutPopover: false,
            currentUser: {
                name: '王小帅', // TODO 获取真实登录用户信息
            }
        };
    },
    methods: {
        handleLogout() {
            this.showLogoutPopover = false;
            // TODO 需要完善退出登录逻辑
            alert('需要完善退出登录逻辑');
        },
    },
    created() {
    },
};
