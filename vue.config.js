var webpack = require('webpack');

// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development';
// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
    /**
     *  生产环境打包设置
     */
    // publicPath: process.env.NODE_ENV === 'production' ? '/test/' : '/',
    // outputDir: 'dist/test',
    // assetsDir: 'static',
    // productionSourceMap: false,     // 关闭map文件

    /**
     * 开发环境路由设置
     */
    publicPath: '/',

    devServer: {
        // the proxy setting: to solve CORS
        "disableHostCheck":true,
        proxy: {
            '/migus':{
                target: 'https://m.music.migu.cn/',  // target host
                ws: true,  // proxy websockets 
                changeOrigin: true,  // needed for virtual hosted sites
                pathRewrite: {
                    '^/migus': ''  // rewrite path
                },
                headers: {
                    referer: 'https://m.music.migu.cn/',
                }
            },
            '/tophub':{
                target: 'https://api.tophub.fun/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/tophub': ''
                }
            }
        }
    },

    // gzip压缩
    configureWebpack: config => {
        // 生产环境相关配置
        if (isProduction) {
            //gzip压缩
            const productionGzipExtensions = ['html', 'js', 'css']
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: new RegExp(
                        '\\.(' + productionGzipExtensions.join('|') + ')$'
                    ),
                    threshold: 10240, // 只有大小大于该值的资源会被处理 10240
                    minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
                    deleteOriginalAssets: false // 删除原文件
                })
            )
        }
    },
    chainWebpack: config => {
        config.plugin('provide').use(webpack.ProvidePlugin, [{
            $: 'jquery',
            jquery: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }])

        // ============压缩图片 start============
        // config.module
        //     .rule('images')
        //     .use('image-webpack-loader')
        //     .loader('image-webpack-loader')
        //     .options({ bypassOnDebug: true })
        //     .end()
        // ============压缩图片 end============
    },
    configureWebpack:{
        externals: {
            'vue': 'Vue',
            'element-ui': 'ELEMENT',
            'axios': 'axios',
        }
    }
}