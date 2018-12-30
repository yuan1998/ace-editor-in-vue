<template>
    <div :id="editorId" class="yuan-ace-editor-container">
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Emit} from 'vue-property-decorator';
    import * as ace from 'brace';
    import 'brace/ext/language_tools';
    import 'brace/ext/emmet';

    const defaultConfig = {
        lang: 'javascript',
        theme: 'monokai',
        readOnly: false,
        autoCompletion: false,
        showPrintMargin: false,
        useWrapMode: true,
        useSoftTabs: true,
        tabSize: 4,
        useVim: false,
        cursorPosition: {row: 0, column: 0},
        pagePosition: 0
    };

    @Component
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
        public config?: object;

        @Prop({
            type: String,
            default: ''
        })
        public value!: string;

        public $ace;

        private firstInitial = false;

        public mounted(): void {
            this.firstInitial = true;
            this.init();
        }

        public reload(): void {
            this.init();
        }

        private init(): void {
            const cfg = Object.assign({}, defaultConfig, this.config);

            this.$ace = ace.edit(this.editorId);
            const aceSession = this.$ace.getSession();

            this.firstInitial && this.handleFirstInit();
            this.handleInit();

            require(`brace/mode/${cfg.lang}`);
            require(`brace/theme/${cfg.theme}`);


            aceSession.setMode(`ace/mode/${cfg.lang}`);
            this.$ace.setTheme(`ace/theme/${cfg.theme}`);
            this.$ace.setValue(this.value);
            this.$ace.setReadOnly(cfg.readOnly);
            aceSession.setTabSize(cfg.tabSize);
            aceSession.setUseSoftTabs(cfg.useSoftTabs);


            this.$ace.setOptions({
                enableBasicAutocompletion: cfg.autoCompletion,
                enableLiveAutocompletion: cfg.autoCompletion,
            });

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
            const {getCursorPosition , getFirstVisibleRow} = this.$ace;

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

    }

    export default AceEditor;

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .yuan-ace-editor-container {
        height: 100%;
        width: 100%;
        display: block;
    }
</style>
