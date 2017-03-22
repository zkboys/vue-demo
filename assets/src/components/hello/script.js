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
            const aDivConstructor = Vue.extend(ADiv);
            // render off-document
            const instance = new aDivConstructor({
                el: document.createElement('div'),
            });
            // append to dom and show it
            document.body.appendChild(instance.$el);
        },
    },
};
