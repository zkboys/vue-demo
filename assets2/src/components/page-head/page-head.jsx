import Vue from 'vue';
import {mapState} from 'vuex';
import './style.less';

export default Vue.component('page-head', {
    data() {
        return {}
    },
    computed: mapState({
        breadcrumb: state => state.app.breadcrumb,
        pageTitle: state => state.app.pageTitle,
    }),
    methods: {
        renderBreadcrumb() {
            const breadcrumb = this.breadcrumb;
            let items = [];
            if (breadcrumb && breadcrumb.length) {
                items = breadcrumb.map(b => {
                    const path = b.path;
                    const icon = b.icon;
                    const text = b.text;
                    if (path && path !== '/nothing') {
                        return (
                            <el-breadcrumb-item to={{path}}>
                                {icon ? <i class={`icon ${icon}`}/> : null}
                                {text}
                            </el-breadcrumb-item>
                        );
                    } else {
                        return (
                            <el-breadcrumb-item>
                                {icon ? <i class={`icon ${icon}`}/> : null}
                                {text}
                            </el-breadcrumb-item>
                        );
                    }
                });
            }
            return items;
        },
    },
    render(h) {
        const pageTitle = this.pageTitle;
        console.log(this.breadcrumb);
        return (
            <div class="page-head">
                <h1>{pageTitle}</h1>
                <div class="breadcrumb">
                    <el-breadcrumb separator="/">
                        {this.renderBreadcrumb()}
                    </el-breadcrumb>
                </div>
            </div>
        );
    },
})
