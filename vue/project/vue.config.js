const CompressionPlugin = require('compression-webpack-plugin')
const IS_PROD = process.env.NODE_ENV === 'production'
const cdnDomian = 'http://dev.biubiupiu.cn'

console.log(process.env.VUE_APP_TESTURL)

module.exports = {
    publicPath: IS_PROD ? cdnDomian : '/',
    chainWebpack: config => {

        config.plugin('define').tap(args => {
            args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL)
            return args
        })

        var externals = {
            vue: 'Vue',
            axios: 'axios',
            'element-ui': 'ELEMENT',
            'vue-router': 'VueRouter',
            vuex: 'Vuex'
        }
        config.externals(externals)
        const cdn = {
            css: [
            ],
            js: [
                // vue
                '//cdn.staticfile.org/vue/2.5.22/vue.min.js',
                // vue-router
                '//cdn.staticfile.org/vue-router/3.0.2/vue-router.min.js',
                // vuex
                '//cdn.staticfile.org/vuex/3.1.0/vuex.min.js',
                // axios
                '//cdn.staticfile.org/axios/0.19.0-beta.1/axios.min.js',
            ]
        }
        config.plugin('html')
            .tap(args => {
                args[0].cdn = cdn
                return args
            })

        if (process.env.NODE_ENV === 'production') {
            // #region 启用GZip压缩
            config
                .plugin('compression')
                .use(CompressionPlugin, {
                    asset: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8,
                    cache: true
                })
                .tap(args => { })

            // #endregion
        }
    }
}