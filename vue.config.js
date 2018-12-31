const lib = {
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
    pages           : {
        index: {
            entry   : 'examples/main.ts',
            template: 'examples/index.html',
            filename: 'index.html'
        }
    },
    css             : { extract: false },
    configureWebpack: () => {
        return {
            externals: [
                (context, request, callback) => {

                    if (/(brace)/m.test(request)) {
                        return callback(null, 'commonjs ' + request);
                    }
                    if (/\/(brace|ace)/m.test(context)) {
                        return callback(null, 'commonjs ' + request);
                    }

                    return callback();
                },
            ]
        }
    }
}
