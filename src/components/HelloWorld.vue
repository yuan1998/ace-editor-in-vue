<template>
    <div :id="editorId">
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import * as ace from 'brace';

    const defaultConfig = ({
        lang = 'json',
        theme = 'xcode',
        options = {
           useSoftTabs: true,
           tabSize: 4
        },
    }) => ({
        lang,
        theme,
        options: Object.assign({} , options , options),
    });

    @Component
    export default class HelloWorld extends Vue {
        @Prop({
            default: 'yuan-ace-editor-container',
            type: String
        })
        private editorId!: string;

        public $ace;

        public mounted() {
            this.$ace = ace.edit(this.editorId);

            require(`brace/mode/javascript`);
            require(`brace/theme/xcode`);
            require(`brace/ext/emmet`);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .yuan-ace-editor-container {
        height: 100%;
        width: 100%;
        display: block;
    }
</style>
