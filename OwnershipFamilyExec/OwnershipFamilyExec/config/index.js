// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        // assetsPublicPath: '/',
        assetsPublicPath: '/familyTree/',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: require('./dev.env'),
        port: 8080,
        autoOpenBrowser: true, //自动打开浏览器
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            // '/basicInfo': {
            //     target: 'http://10.76.54.91:8080',
            //     changeOrigin: true,
            //     pathRewrite: {
            //         "^/basicInfo": "/basicInfo"
            //     }
            // }
        },
        cssSourceMap: false
    }
}
