import Vue from 'vue';
import {mapState} from 'vuex';
import './style.less';
import FontIcon from '../font-icon/index.jsx';

export default Vue.component('page-head', {
    components: {
        FontIcon,
    },
    data() {
        return {}
    },
    computed: mapState({
        showPageHead: state => state.app.showPageHead,
        breadcrumb: state => state.app.breadcrumb,
        pageHead: state => state.app.pageHead,
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
                    const iconJsx = icon ? <FontIcon className="icon" name={icon}/> : null;
                    if (path && b.isMenuItem) {
                        return (
                            <el-breadcrumb-item to={{path}}>
                                {iconJsx}
                                {text}
                            </el-breadcrumb-item>
                        );
                    } else {
                        return (
                            <el-breadcrumb-item>
                                {iconJsx}
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
        const pageTitle = this.pageHead;
        return (
            <div class="page-head" v-show={this.showPageHead}>
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
