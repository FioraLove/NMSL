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
     * 
     */
    publicPath: '/',       // 这个是在测试路由为‘history’时，动态参数匹配params模式时才会使用



    devServer: {
        // port: 8000,      // 配置开发环境运行端口号       
        // //配置代理，解决跨域请求后台数据的问题
        proxy: {
            '/migu':{
                target: 'https://m.music.migu.cn/',  // target host
                ws: true,  // proxy websockets 
                changeOrigin: true,  // needed for virtual hosted sites
                pathRewrite: {
                    '^/migu': ''  // rewrite path
                },
                //重点在这里，添加配置项 headers 就可以了
                headers:{
                    "Host":"m.music.migu.cn",
                    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36"
                }
            },
            'QQmusic':{
                target: 'https://baidu.com/',
                ws: true,
                changeOrigin: true, 
                pathRewrite: {
                    '^/migu': ''
                }
            },
            '/bili':{
                target: 'https://api.bilibili.com/x/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/bili': ''  // rewrite path
                }
            },

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
        config.module
            .rule('images')
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({ bypassOnDebug: true })
            .end()
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