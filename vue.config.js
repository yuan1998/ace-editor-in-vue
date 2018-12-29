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
const dev = {

};
module.exports = process.env.NODE_ENV === 'development' ? dev : lib;
