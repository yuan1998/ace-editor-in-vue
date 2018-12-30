import Vue, {CreateElement, VNode} from "vue";
import {Component, Prop, Emit} from 'vue-property-decorator';
import * as ace from 'brace';
import './style.less';

const defaultConfig: Config = {
    lang: 'javascript',
    theme: 'monokai',
    readOnly: false,
    autoCompletion: false,
    showPrintMargin: false,
    useWrapMode: true,
    useSoftTabs: true,
    tabSize: 4,
    useVim: false,
    useEmmet: false,
    useBeautifyCode: false,
    cursorPosition: {row: 0, column: 0},
    pagePosition: 0
};

interface Config {
    lang?: string,
    theme?: string,
    readOnly?: boolean,
    autoCompletion?: boolean,
    showPrintMargin?: boolean,
    useWrapMode?: boolean,
    useSoftTabs?: boolean,
    tabSize?: number,
    useVim?: boolean,
    useEmmet?: boolean,
    useBeautifyCode?: boolean,
    cursorPosition?: { row: number, column: number },
    pagePosition?: number
}

@Component({
    name: 'AceEditor'
})
class AceEditor extends Vue {
    @Prop({
        default: 'yuan-ace-editor-container',
        type: String
    })
    private editorId!: string;

    @Prop({
        type: Object,
        default: {}
    })
    public config?: Config;

    @Prop({
        type: String,
        default: ''
    })
    public value!: string;

    private currentConfig: Config = {};
    public $ace;
    public $beautify;

    private firstInitial = false;

    public mounted(): void {
        this.firstInitial = true;
        this.init();
    }

    public reload(): void {
        this.init();
    }

    private init(): void {
        this.currentConfig = Object.assign({}, defaultConfig, this.config);
        const cfg = this.currentConfig;

        this.$ace = ace.edit(this.editorId);
        const aceSession = this.$ace.getSession();

        this.firstInitial && this.handleFirstInit();
        this.handleInit();

        require(`brace/mode/${cfg.lang}`);
        require(`brace/theme/${cfg.theme}`);

        if (cfg.useEmmet) {
            require('brace/ext/emmet');
            this.$ace.setOptions('enableEmmet', true);
        }

        aceSession.setMode(`ace/mode/${cfg.lang}`);
        this.$ace.setTheme(`ace/theme/${cfg.theme}`);
        this.$ace.setValue(this.value);
        this.$ace.setReadOnly(cfg.readOnly);
        aceSession.setTabSize(cfg.tabSize);
        aceSession.setUseSoftTabs(cfg.useSoftTabs);

        if (cfg.useBeautifyCode) {
            require('brace/ext/beautify');
            this.$beautify = ace.acequire('ace/ext/beautify');
                console.log("this.$beautify :",this.$beautify);
        }

        if (cfg.autoCompletion) {
            require('brace/ext/language_tools');
            this.$ace.setOptions({
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
            });
        }

        if (cfg.useVim) {
            require('brace/keybinding/vim');
            this.$ace.setKeyboardHandler('ace/keyboard/vim');
        }

        this.$ace.setShowPrintMargin(cfg.showPrintMargin);
        aceSession.setUseWrapMode(cfg.useWrapMode);

        this.$ace.setValue(this.value);
        this.setCursorPosition(cfg);

        this.$ace.on('change', () => {
            this.handleInput();
            this.handleChange();
        })
    }

    public setCursorPosition(cfg): void {
        const {cursorPosition, pagePosition} = cfg;
        cursorPosition && this.$ace.navigateTo(cursorPosition.row, cursorPosition.column);
        pagePosition && this.$ace.scrollToRow(pagePosition);
    }

    public getCursorPosition(): object {
        const {getCursorPosition, getFirstVisibleRow} = this.$ace;

        return {
            cursorPosition: getCursorPosition(),
            pagePosition: getFirstVisibleRow(),
        }
    }

    public addCommand(options: object): void {
        this.$ace.commands.addCommand(options);
    }

    public removeCommand(name): void {
        this.$ace.commands.removeCommand(name);
    }

    public beautifyCode(): void {
        this.$beautify && this.$beautify.beautify(this.$ace.session);
    }

    @Emit('input')
    handleInput(): string {
        return this.$ace.getValue();
    }

    @Emit('firstInit')
    handleFirstInit() {
        this.firstInitial = false;
        return this.$ace;
    }

    @Emit('init')
    handleInit() {
        return this.$ace;
    }

    @Emit('change')
    handleChange() {
        return this.$ace;
    }

    public render(h: CreateElement): VNode {
        const {editorId} = this;
        return (
            <div
                id={editorId}
                class="yuan-ace-editor-container">
            </div>
        )
    }

}

export default AceEditor;
