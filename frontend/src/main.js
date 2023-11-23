import { createApp } from 'vue';
import App from './App.vue';
import router from './route';
import './assets/theme-chalk/index.css';
import {
    ElInput,
    ElButton,
    ElInputNumber,
} from 'element-plus';

const app = createApp(App);
app.component('EInput', ElInput)
app.component('EButton',ElButton)
app.component('ENumber',ElInputNumber)
app.use(router).mount('#app');
