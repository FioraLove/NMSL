import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyLoad from 'vue-lazyload'; // 懒加载
import facturl from './store/facturl.js';
import RVerify from "rverify";
import "rverify/dist/RVerify.min.css";

Vue.prototype.FACTURL = facturl;


Vue.use(VueLazyLoad,{
	error: require('./assets/images/failed.jpg'), // 加载错误的图片
	loading: require('./assets/images/loading.gif') // 加载时的图片
});
Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.use(RVerify);
RVerify.configure({
  tolerance: 10,
  duration: 500,
  mask: 0.5,
  title: "身份验证",
  text: "拖动滑块，使图片角度为正",
  extra: "View on Github",
  extraLink: 'https://github.com/FioraLove',
  album: [
    "https://s.nmsl8.club/uploads/20190704/thumb/5d1d74769f2e1.png",
    "http://att3.citysbs.com/200x200/hangzhou/2020/04/15/11/dd6719bd4287d9efd49434c43563a032_v2_.jpg",
    "https://c-ssl.duitang.com/uploads/item/201707/10/20170710210234_y3Kf5.thumb.1000_0.jpeg",
    "http://pic2.zhimg.com/50/v2-be54dda1c19aaeab4f90bcb699057d03_hd.jpg",
    "http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20181226/97d5877e0ac1445980e755225514efc5.jpeg"
  ]
});


let app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
