import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import axios from '../plugins/axios'

Vue.use(VueRouter,axios)

  const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            keepAlive: true, //此组件需要被缓存   
        }
    },
    {
        //将 path 设置为*号，将会捕获任何没有得到匹配的路由； 
        path: '*',
        name: 'error',
        component: () => import(/* webpackChunkName: "about" */ '../views/Error.vue')
    },
    {
        // 资讯模块
        path: '/news',
        name: 'News',
        // 路由懒加载模式
        component: () => import(/* webpackChunkName: "about" */ '../views/News.vue')
    },
    {
        path: '/video',
        name: 'Video',
        // 创建子路由/user/:id/profile 与 /user/:id/post
        component: () => import(/* webpackChunkName: "about" */ '../views/Video.vue')
    },
    {   // 音频MP3模块
        path: '/audio',     // query模式
        // path: '/list/:id/post/:name', // params模式
        name: 'Audio',
        component: () => import(/* webpackChunkName: "about" */ '../views/Audio.vue')
    },{
        //将 path 的前缀或后缀带*号，将会捕获特定的路由，类似于正则表达式； 
        path:'/user-*',
        component: ()=> import('../views/News.vue')
    },{
        path: '/loveword',
        name: 'Loveword',
        component: () => import(/* webpackChunkName: "about" */ '../views/Loveword.vue')
    },{
        path: '/ndsl',
        name: 'Ndsl',
        component: () => import(/* webpackChunkName: "about" */ '../views/Ndsl.vue')
    },{
        // 漫画模块
        path: '/comic',
        name: 'Comic',
        // 路由懒加载模式
        component: () => import(/* webpackChunkName: "about" */ '../views/Comic.vue'),
        meta: {
            keepAlive: true, //此组件需要被缓存
            
        }
    },{
        // 漫画章节目录模块
        path: '/comic/category',
        name: 'Category',
        // 路由懒加载模式
        component: () => import(/* webpackChunkName: "about" */ '../views/Tools/catalog.vue'),
        meta: {
            keepAlive: true, //此组件需要被缓存
        }
    },,{
        // 漫画模块：具体章节
        path:"/comic/chapter",
        name: "Chapters",
        component:()=> import('../views/Tools/chapter.vue'),
        meta: {
            keepAlive: true, //此组件需要被缓存
            
        }
    },{
        // 管理员主页，仅自己可见
        path: '/nmsl/admin/secret',
        name: 'Secret',
        component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue')
    },{
        // 登陆后的视频网址
        path: '/nmsl/hidden/video/secret',
        name: "HiddenVideo",
        component: () => import('../views/HiddenVideo.vue')
    },{
        // 登陆后的视频播放网址
        path: '/nmsl/hidden/video/play',
        name: "HiddenPlay",
        component: () => import('../views/HiddenPlay.vue'),
        meta: {
            keepAlive: true, //此组件需要被缓存   
        }
    },{
        // 登陆后的图片浏览网址
        path: '/nmsl/hidden/picture',
        name: "HiddenPic",
        component: () => import('../views/HiddenPic.vue'),
        meta: {
            keepAlive: true, //此组件需要被缓存   
        }
    },{
        // 登陆后的隐私第三方资源分享
        path: '/nmsl/hidden/source',
        name: "HiddenSource",
        component: () => import('../views/HiddenSource.vue')
    },{
        // 留言板
        path: '/comments',
        name: "Comments",
        component: () => import('../views/Comments.vue'),
        meta: {
            keepAlive: true, //此组件需要被缓存   
        }
    },{
        // 工具箱模块
        path: '/tools',
        name: "Tools",
        component: () => import('../views/Tool.vue'),
        meta: {
            keepAlive: true, //此组件需要被缓存
        }
    },{
        // 在线工具模块：json数组
        path:"/tools/json",
        name: "Json",
        component:()=> import('../views/Tools/json.vue')
    }

]

const router = new VueRouter({
    routes,
    mode: 'history', // history表示去掉锚点，默认mode : 'hash' 
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
})

export default router
