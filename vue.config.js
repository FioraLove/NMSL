module.exports = {
    // publicPath: './'   // 编译时使用
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
                }
            },
            'QQmusic':{
                target: 'https://baidu.com/',
                ws: true,
                changeOrigin: true, 
                pathRewrite: {
                    '^/migu': ''
                }
            }
        }
    }
}