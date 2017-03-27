import Vue from 'vue';
import {mapState, mapActions} from 'vuex';

import ADiv from './a-div';

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
            'hidePageTitle',
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
        showADiv() {
            console.log(ADiv);
            const ADivConstructor = Vue.extend(ADiv);
            // render off-document
            const instance = new ADivConstructor({
                el: document.createElement('div'),
            });
            // append to dom and show it
            document.body.appendChild(instance.$el);
        },
    },
    beforeCreated() {
    },
    created() {
        // this.$hidePageHeader();
        this.$setPageTitle('设置的title');
        this.$setBreadcrumb([
            {
                path: '/1',
                text: '自',
                icon: 'el-icon-circle-check',
            },
            {
                path: '/2',
                text: '定',
                icon: 'el-icon-upload',
            },
            {
                path: '/3',
                text: '义',
                icon: 'el-icon-picture',
            },
            {
                path: '/4',
                text: '面包屑导航',
                icon: 'el-icon-setting',
            },
        ]);
        this.$setActiveSystemMenu('/');
    },
};
