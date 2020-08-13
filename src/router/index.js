import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import axios from '../plugins/axios'

Vue.use(VueRouter,axios)

  const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        //将 path 设置为*号，将会捕获任何没有得到匹配的路由； 
        path: '*',
        name: 'error',
        component: () => import(/* webpackChunkName: "about" */ '../views/Error.vue')
    },
    {
        path: '/media',
        name: 'Media',
        // 路由懒加载模式
        component: () => import(/* webpackChunkName: "about" */ '../views/Media.vue')
    },
    {
        path: '/page',
        name: 'Page',
        component: () => import(/* webpackChunkName: "about" */ '../views/Page.vue')
    },
    {
        path: '/video',
        name: 'Video',
        // 创建子路由/user/:id/profile 与 /user/:id/post
        component: () => import(/* webpackChunkName: "about" */ '../views/Video.vue'),
        children : [{ 
            path : 'profile', 
            component:()=> import('../views/subUser/profile.vue') 
        },{ 
            path : 'posts', 
            component:()=> import('../views/subUser/posts.vue') 
        },{
            // 如果父路由，遇到没有可渲染的子路由，可以设置一个空路由；
            path : '*', 
            component: () => import('../views/Page.vue')
        }] 
    },
    {   // 音频MP3模块
        path: '/audio',     // query模式
        // path: '/list/:id/post/:name', // params模式
        name: 'Audio',
        component: () => import(/* webpackChunkName: "about" */ '../views/Audio.vue')
    },{
        //将 path 的前缀或后缀带*号，将会捕获特定的路由，类似于正则表达式； 
        path:'/user-*',
        component: ()=> import('../views/Media.vue')
    },{
        path: '/loveword',
        name: 'Loveword',
        component: () => import(/* webpackChunkName: "about" */ '../views/Loveword.vue')
    },{
        path: '/ndsl',
        name: 'Ndsl',
        component: () => import(/* webpackChunkName: "about" */ '../views/Ndsl.vue')
    }
]

const router = new VueRouter({
  routes,
  mode: 'history', // history表示去掉锚点，默认mode : 'hash' 
})

export default router
