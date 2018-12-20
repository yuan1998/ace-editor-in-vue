<template>
    <div class="yuan-ace-editor-container">
        <h1>{{ msg }}</h1>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class HelloWorld extends Vue {
        @Prop({
            default: 'haha'
        })
        private msg!: string;
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
