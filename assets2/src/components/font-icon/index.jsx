import Vue from 'vue';
import './fontawesome/css/font-awesome.css';

export default Vue.component('page-head', {
    props: {
        className: {
            type: String,
            default: 'font-icon',
        },
        name: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            default: '', // lg 2x 3x 4x 5x
        }
    },
    data() {
        return {};
    },
    render(h) {
        const name = this.name;
        const className = this.className;
        const size = this.size;
        let classStr = '';
        const sizeStr = size ? `fa-${size}` : '';
        if (name.startsWith('fa-')) {
            classStr = `${className} fa ${name} ${sizeStr}`;
        }
        if (name.startsWith('el-icon-')) {
            classStr = `${className} el ${name} ${sizeStr}`;
        }
        return (
            <i class={classStr}/>
        );
    },
});
