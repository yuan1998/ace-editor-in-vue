import Vue from 'vue'
import App from './App';
import AceEditor from '../packages';

Vue.use(AceEditor);

const app =  new Vue({
    render: h => h(App),
});

app.$mount('#root');
