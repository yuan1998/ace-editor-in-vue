import AceEditor from './components';

function install (Vue: any) {
    Vue.component('AceEditor' , AceEditor);
}

export default  {
    version: '1.0.0',
    install,
    AceEditor
}
