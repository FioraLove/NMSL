import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyLoad from 'vue-lazyload'; // 懒加载



Vue.use(VueLazyLoad,{
	error:'http://www.zkk7.com/upload/vod/20200217-4/edc3dd6077bd402154a175209e9648c5.jpg', // 加载错误的图片
	loading: require('./assets/images/loading.gif') // 加载时的图片
});
Vue.config.productionTip = false
Vue.use(ElementUI);

let app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
