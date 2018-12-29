# vue-editor-ace

## install
use npm or yarn install package.
```
npm install vue-editor-ace --save
```

## How to use
1. import and sign it in components.
    ```javascript  
    ...
    import AceEditor from 'vue-editor-ace';
    ...
    
    components: {
        AceEditor,
    }
    ...
    ```
2. use component.
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
    prop `v-model` and `config` is required. [other `config` option check this](#config-options)    
    tips: `AceEditor` default is `height: 100%` `width:100%`.you can add `wrapper` limit component size.  
   
    
    ```vue
    <div style="height:100px;width: 100px;">
        <AceEditor v-model="context" :config="config" />
    </div>
    ```
3. get ACE instance or use methods.  
    ```vue
    // add ref to tag attribute.
    <AceEditor ref="myAce" ... />
    
    // component
    let component = this.$refs.myAce;
    // ace instance
    let ace = this.$refs.myAce.$ace;
    ```
    [methods list](#methods)


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
        // set cursor position.
        cursorPosition: {row: 0, column: 0},
        // set page position (scroll).
        pagePosition: 0
    };
```

## Methods
Prompt : `let ace = this.$refs['myAce'];`

##### reload
for safety. component does not actively reset the editor.  
you can use reload method .
```javascript
ace.reload();
```

##### setCursorPosition
change current cursor and page position.
```javascript
let cfg = {
    cursorPosition : { row: 0 , col : 0 },
    pagePosition : 0
}

ace.setCursorPosition(cfg);
```

##### getCursorPosition
get current cursor and page Position. 
```javascript
let result = ace.getCursorPosition();
``` 

##### addCommand
add command.  
tip: command in safari is not working
```javascript
ace.addCommand({
    name: 'Save-file',
    bindKey: {
        win: 'Ctrl-S',
        mac: 'Command-S'
    },
    exec: (editor) => {
        // do something...
    },
    readOnly: true // false if this command should not apply in readOnly mode
});
```
##### addCommand
remove exists command
```javascript
ace.removeCommand('Save-file');
```
