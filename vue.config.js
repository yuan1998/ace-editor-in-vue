const lib = {
    css             : { extract: false },
    configureWebpack: () => {
        return {
            entry    : './src/components/AceEditor.vue',
            output   : {
                filename: 'dist/vueAceEditor.common.js',
                library : 'vueAceEditor',
            },
            externals: [
                (context, request, callback) => {
                    return callback(null, 'commonjs ' + request);
                },
            ]
        }
    }
};

module.exports = {
    pages: {
        index: {
            entry: 'examples/main.ts',
            template: 'examples/index.html',
            filename: 'index.html'
        }
    }
}
