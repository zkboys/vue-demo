import Vue from 'vue';

export default Vue.component('page-head', {
    props: {
        className: {
            type: String,
            default: 'user-avatar'
        },
        user: {
            type: Object,
            default() {
                return {
                    name: '匿名用户',
                    loginname: null,
                    avatar: null,
                };
            }
        }
    },
    data() {
        return {};
    },
    methods: {
        getCurrentLoginUserAvatar() {
            const user = this.user;
            const className = this.className;
            if (!user) {
                const backgroundColor = 'rgb(80, 193, 233)';
                return <span class={className} style={{backgroundColor}}>?</span>;
            }
            const userName = user.name || user.loginname;
            const avatar = user.avatar;
            if (avatar) {
                return <img class={className} src={avatar} alt="用户头像"/>;
            }
            const userNameFirstChar = userName[0];
            const colors = [
                'rgb(80, 193, 233)',
                'rgb(255, 190, 26)',
                'rgb(228, 38, 146)',
                'rgb(169, 109, 243)',
                'rgb(253, 117, 80)',
                'rgb(103, 197, 12)',
                'rgb(80, 193, 233)',
                'rgb(103, 197, 12)',
            ];
            const backgroundColor = colors[userNameFirstChar.charCodeAt(0) % colors.length];
            return <span class={className} style={{backgroundColor}}>{userName[0]}</span>;
        }
    },
    render(h) {
        return this.getCurrentLoginUserAvatar();
    },
});
