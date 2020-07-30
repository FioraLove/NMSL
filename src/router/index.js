import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

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
    path: '/about',
    name: 'About',
    // 路由懒加载模式
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/page',
    name: 'Page',
    component: () => import(/* webpackChunkName: "about" */ '../views/Page.vue')
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import(/* webpackChunkName: "about" */ '../views/User.vue')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import(/* webpackChunkName: "about" */ '../views/List.vue')
  },
  {
    //将 path 的前缀或后缀带*号，将会捕获特定的路由，类似于正则表达式； 
    path:'/user-*',
    component: ()=> import('../views/About.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history', // history表示去掉锚点，默认mode : 'hash' 
})

export default router
