import AceEditor from './AceEditor';

function install(Vue: any): void {
    Vue.component('AceEditor', AceEditor);
}

export default {
    install,
    AceEditor
}
