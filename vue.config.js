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

const getRequestPath = (context , request) => {
    context = context.replace(__dirname , '.');

    return context + request.replace('./' , '/');
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
                        return callback(null, 'commonjs ' + getRequestPath(context , request));
                    }

                    return callback();
                },
            ]
        }
    }
}
