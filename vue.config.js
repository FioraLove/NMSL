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
            '/bilibili':{
                target: 'https://api.bilibili.com/',
                ws: true,
                changeOrigin: true, 
                pathRewrite: {
                    '^/bilibili': ''
                },
                headers:{
                    'origin': 'https://space.bilibili.com',
                    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36"
                }
            },
        }
    }
}