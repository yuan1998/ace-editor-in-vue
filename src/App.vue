<template>
    <div id="app">
        <AceEditor ref="editor" :config="config" v-model="value"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import AceEditor from './components/AceEditor.vue';

    @Component({
        components: {
            AceEditor,
        },
    })
    export default class App extends Vue {
        public value = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A blanditiis dolor fugit inventore molestiae odio pariatur perspiciatis possimus praesentium quaerat quia quisquam, quos veniam. Id quaerat quisquam sit voluptas voluptatibus.';

        public config = {
            useVim: true,
        };

        public mounted() {
        }

    }
</script>

<style lang="less">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 200px;
    }
</style>
