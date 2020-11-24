**家人们~~~🤕🤕🤕，抽象圣经，最简单的嘴臭，最极致的享受**

## nmsl

### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

---

### 开发日志:

   - 2020-09-02 初始化提交
   - 2020-09-03 隐私加密视频/图片页面初步构建以及前后交互
   - 2020-09-07 隐私加密图片页面进行懒加载以及设置Django后台IP地址[baseUrl变量](http://127.0.0.1:8001)
   - 2020-09-08 RSA加密的Django后端解密一直不成功，很生气，故采用Base64编码
   - 2020-09-09 创建隐私加密资源收集分享页面
   - 2020-09-10 全局增加禁止F12调试，无限debugger，右键菜单关闭功能，并将其js混淆化
   - 2020-09-20 调整页面布局与采用 <u>pornhub</u> 配色
   - 2020-09-23 DPlayer新增**支持m3u8格式视频播放**以及皮皮虾，AcFun等APP视频解析接口
   - 2020-09-25 增加带旋转图片验证码的留言板模块，实现post写入，get分页读取
   - 2020-10-05 界面较大改变，将【动漫】模块变为【资讯】模块
   - 2020-10-20 隐私视频界面新增 `搜索` 功能，删除低质量视频
   - 2020-11-10 主模块新增 `Pixiv` 模块（P站搜索与排行榜）
   - 2020-11-23 修复 `资讯` 与 `音乐` 模块的开发与生产环境的CORS跨域问题

---
<br>

> 主页：


  - ![](https://cdn.jsdelivr.net/gh/FioraLove/Images/home.gif)


> 视频解析

  - ![](https://cdn.jsdelivr.net/gh/FioraLove/Images/parse.png)


### 生产部署

生产环境部署时，请将以下文件参数重新调整

- facturl.js里的baseUrl
- vue.config.js里的publicPath
- index.js里的router的base: process.env.BASE_URL