import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from '../plugins/axios'

Vue.use(VueRouter,axios)
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const routes = [{
        path: '/',
        name: 'APP',
        redirect: '/home',
        component: () => import('../App.vue'),
        meta: {
            keepAlive: true
        }
    },{
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
            keepAlive: true
        }
    },{
        //将 path 设置为*号，将会捕获任何没有得到匹配的路由； 
        path: '*',
        name: 'Error',
        component: () => import('../views/Error.vue')
    },{
        // 资讯模块
        path: '/news',
        name: 'News',
        component: () => import('../views/News.vue'),
        meta: {
            keepAlive: true
        }
    },{
        path: '/parse',
        name: 'Parse',
        component: () => import('../views/Parse.vue'),
        meta: {
            keepAlive: true
        }
    },{   
        // 音频MP3模块
        path: '/audio',     // query模式
        name: 'Audio',
        component: () => import('../views/Audio.vue'),
        meta: {
            keepAlive: true
        }
    },{
        //将 path 的前缀或后缀带*号，将会捕获特定的路由，类似于正则表达式； 
        path:'/user-*',
        component: ()=> import('../views/News.vue')
    },{
        // 嘴臭圣经模块
        path: '/ndsl',
        name: 'Ndsl',
        component: () => import('../views/Ndsl.vue'),
        meta: {
            keepAlive: true
        }
    },{
        // 漫画模块
        path: '/comic',
        name: 'Comic',
        component: () => import('../views/Comic.vue'),
        meta: {
            keepAlive: true
        }
    },{
        // 漫画章节目录模块
        path: '/comic/category',
        name: 'Category',
        // 路由懒加载模式
        component: () => import('../views/Tools/catalog.vue'),
        meta: {
            keepAlive: true
        }
    },{
        // 漫画模块：具体章节
        path:"/comic/chapter",
        name: "Chapters",
        component:()=> import('../views/Tools/chapter.vue'),
        meta: {
            keepAlive: true  
        }
    },{
        // 管理员主页，仅自己可见
        path: '/admin',
        name: 'Admin',
        component: () => import('../views/Admin.vue'),
        meta: {
            keepAlive: true
        }
    },{
        // 登陆后的视频网址
        path: '/hidden/video',
        name: "HiddenVideo",
        component: () => import('../views/HiddenVideo.vue')
    },{
        // 登陆后的视频播放网址
        path: '/hidden/play',
        name: "HiddenPlay",
        component: () => import('../views/HiddenPlay.vue'),
        meta: {
            keepAlive: true
        }
    },{
        // 登陆后的图片浏览网址
        path: '/hidden/picture',
        name: "HiddenPic",
        component: () => import('../views/HiddenPic.vue'),
        meta: {
            keepAlive: true
        }
    },{
        // 登陆后的隐私第三方资源分享
        path: '/hidden/source',
        name: "HiddenSource",
        component: () => import('../views/HiddenSource.vue')
    },{
        // 留言板
        path: '/comments',
        name: "Comments",
        component: () => import('../views/Comments.vue'),
        meta: {
            keepAlive: true
        }
    },{
        // 工具箱模块
        path: '/tools',
        name: "Tools",
        component: () => import('../views/Tool.vue'),
        meta: {
            keepAlive: true
        }
    },{
        // Pixiv插画模块
        path: '/pixiv',
        name: "Pixiv",
        component: () => import('../views/Pixiv.vue'),
        meta: {
            keepAlive: true
        }
    },{
        // Pixiv作者作品展示模块
        path: '/artist',
        name: "Artist",
        component: () => import('../views/Artist.vue'),
        meta: {
            keepAlive: true
        }
    },{
        // 在线工具模块：json数组
        path:"/tools/json",
        name: "Json",
        component:()=> import('../views/Tools/json.vue')
    },{
        // 在线工具模块：av与bv互换
        path:"/tools/av2bv",
        name: "Av2bv",
        component:()=> import('../views/Tools/av2bv.vue')
    },{
        // 在线工具模块：手机号相关信息查询
        path:"/tools/tel",
        name: "Tel",
        component:()=> import('../views/Tools/tel.vue')
    },{
        // 在线工具模块：垃圾分类查询查询
        path:"/tools/trash",
        name: "Trash",
        component:()=> import('../views/Tools/trash.vue')
    },{
        // 在线工具模块：精神语录
        path:"/tools/yulu",
        name: "Yulu",
        component:()=> import('../views/Tools/yulu.vue')
    },{
        // 在线工具模块：快递单号查询
        path:"/tools/express",
        name: "Express",
        component:()=> import('../views/Tools/express.vue')
    },{
        // 在线工具模块：每日得物鸡汤
        path:"/tools/dewu",
        name: "Dewu",
        component:()=> import('../views/Tools/dewu.vue')
    },{
        // 在线工具模块：随机输出cosplay或福利姬等美图
        path:"/tools/girl",
        name: "Girl",
        component:()=> import('../views/Tools/girl.vue')
    },{
        // 在线工具模块：淘宝买家秀
        path:"/tools/tao",
        name: "Tao",
        component:()=> import('../views/Tools/tao.vue')
    },{
        // 在线工具模块：身份证查询
        path:"/tools/card",
        name: "Card",
        component:()=> import('../views/Tools/card.vue')
    }
];

const router = new VueRouter({
    routes,
    mode: 'history', // history表示去掉锚点，默认mode : 'hash'
    // base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
});

export default router;