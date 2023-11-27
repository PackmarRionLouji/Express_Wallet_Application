import { createApp } from 'vue';
import App from './App.vue';
import router from './route';
import './assets/theme-chalk/index.css';
import {
    ElInput,
    ElButton,
    ElInputNumber,
    ElCascader,
    ElTable,
    ElTableColumn,
    ElPagination,
    ElIcon,
} from 'element-plus';

const app = createApp(App);
app.component('EInput', ElInput)
app.component('EButton',ElButton)
app.component('ENumber',ElInputNumber)
app.component('ECascader',ElCascader)
app.component('ETable',ElTable)
app.component('ETableColumn',ElTableColumn)
app.component('EPagination',ElPagination)
app.component('EIcon',ElIcon)
app.use(router).mount('#app');
