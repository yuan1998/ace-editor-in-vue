# vue-editor-ace
基于Vue 封装 Ace.

## 开始
安装package.
```
npm install vue-editor-ace --save
or
yarn add vue-editor-ace --save
```

## 使用
1. 引入AceEditor,并安装组件.
    ```javascript  
    ...
    import Vue from 'vue';
    import AceEditor from 'vue-editor-ace';
    ...
    Vue.use(AceEditor);
    ...
    ```
2. 使用组件.
    ```vue
    <AceEditor v-model="context" :config="config" />
    
    ...
    data: {
        context: 'print("Hello World")',
        config: {
            lang: 'dart',
        }
    }
    ```
    `config` 与 `v-model` 为必须参数.
    [查看 `config` 配置](#config-options).
    提示: 组件默认为 `height: 100%` `width:100%`,所以你需要给外部盒子一个大小.  
    例:  
    ```vue
    <div style="width: 500px;height: 500px;">
       <AceEditor v-model="context" :config="config" />
    </div>
    ```
3. 获取ACE实例与使用组件内置方法
    ```vue
    // 给组件打上 ref 标记.
    <AceEditor ref="myAce" ... />
    
    // 获取组件
    let component = this.$refs.myAce;
    // 从组件获取ACE实例
    let ace = this.$refs.myAce.$ace;
    ```
    [所有 `Method`](#methods)
4. 事件
   ```vue
    <AceEditor 
       @init="handleInit"
       @firstInit="handleFirstInit"
       @change="handleChange"  
       ... />
    ...
    {
       handleInit(ace) {
          // 每次 init 都会触发一次.
          // ace实例会做为传参接收,你可以在这里引入自定义的拓展
          // do something...
       },
       handleFirstInit(ace) {
          // 这里只有组件第一初始化才会运行.
          // ace实例会做为传参接收.
          // you can do something ...
       },
       handleChange(ace) {
           // 每一次输入都会触发change 事件.
           // ace实例会做为传参接收.
           // you can do something ...
       }
    }
   ```


## Config Options
```javascript
    const defaultConfig = {
        // Language
        lang: 'javascript',
        // Theme
        theme: 'monokai',
        // only read.
        readOnly: false,
        // enable Autocompletion
        autoCompletion: false,
        showPrintMargin: false,
        useWrapMode: true,
        useSoftTabs: true,
        tabSize: 4,
        // enable vim keyboard
        useVim: false,
        // enable emmet.
        useEmmet: false,
        // enable beautify code.
        useBeautifyCode: false,
        // set cursor position.
        cursorPosition: {row: 0, column: 0},
        // set page position (scroll).
        pagePosition: 0
    };
```


## Methods
下面出现的 ace 均为 `let ace = this.$refs['myAce'];` 

##### reload
组件不会主动重新加载.即使你修改了config.  
你需要主动运行 `reload` 方法,让Ace 重新加载.
```javascript
ace.reload();
```

##### setCursorPosition
修改当前编辑器的页面位置和光标位置.  
cursorPosition 为光标位置.  
pagePosition 为页面位置.
```javascript
let cfg = {
    cursorPosition : { row: 0 , column : 0 },
    pagePosition : 0
}

ace.setCursorPosition(cfg);
```

##### getCursorPosition
获取当前编辑器的光标位置 与 页面位置.
```javascript
let result = ace.getCursorPosition();
// 返回数据格式为:
{
    cursorPosition : { row: number , column : number },
    pagePosition : number
}
``` 

##### addCommand
添加键盘快捷键命令.  
提示: 快捷键命令在safari上会失效.
```javascript
ace.addCommand({
    name: 'Save-file',
    bindKey: {
        win: 'Ctrl-S',
        mac: 'Command-S'
    },
    exec: (ace) => {
        // ace 为当前编辑器实例
        // do something...
    },
    readOnly: true // false if this command should not apply in readOnly mode
});
```
##### removeCommand
移除已存在的 快捷键命令.
```javascript
ace.removeCommand('Save-file');
```
#### beautifyCode
整理当前 `编辑器的代码格式`.  
前提: `useBeautifyCode true` 和 `必须是ace支持的language.` 
```javascript
ace.beautifyCode();
```
