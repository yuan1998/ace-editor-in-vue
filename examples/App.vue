<template>
    <div style="height: 400px;">
        <AceEditor ref="myAce" :config="config" v-model="data" @init="handleInit" @firstInit="handleFirstInit" @change="handleChange"></AceEditor>
        <p style="color: blue;" @click="reformatCode">
            BeautifyCode
        </p>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class App extends Vue {
        public data = '      var a = "Hello World"';

        public config = {
            useBeautifyCode: true
        };

        public reformatCode() {
            const myAce = this.$refs['myAce'];
            myAce.beautifyCode();
        }

        public handleFirstInit (ace) {
            console.log("handleFirstInit");
        }

        public handleInit() {
            console.log("handleInit");
        }

        public handleChange() {
            console.log("handleChange");
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
