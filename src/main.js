// 引入必要的
import 'babel-polyfill' // 支持es6的primise等api
import App from './App'
import Vue from 'vue'
import router from './router'
import store from './vuex/index.js'
import config from '@/config.js'
//引入需要的js
import {
  parseUrl,
  deleteUrlQuery,
  isWechat
} from './common/helpers/utils.js'
import initPlugin from './initPlugin/index.js'
initPlugin()
import './lib/js/anfe-flexible.js' //淘宝布局的js
// 引入css
import './lib/css/transition.css'
import './lib/css/common.css'

// 引入组件
// 引入swiper
// import 'swiper/dist/css/swiper.css'
// import {
//   swiper,
//   swiperSlide
// } from 'vue-awesome-swiper'
// Vue.component(swiper.name, swiper);
// Vue.component(swiperSlide.name, swiperSlide);
//引入mintUI
// import {
//   DatetimePicker
// } from "mint-ui";
// Vue.component(DatetimePicker.name, DatetimePicker);
// import 'mint-ui/lib/style.css'

// 全局的变量
console.log(Vue)
window.env = process.env.NODE_ENV
window.Vue = Vue
window.v = Vue.prototype
Vue.config.productionTip = false
v.$wxsdk.apiTicket('/act/wechat/shares/sign'); // 微信签名
v.$wxsdk.setDefaultShare(config.defaultShareOption); // 配置默认的分享
v.$http.setDomain(config.apiDomain); // 配置请求接口的前缀

// 如果是生产环境取prodAuthApi（生产的授权地址），否则取testAuthApi测试的授权
var oauthURL = process.env.NODE_ENV === 'production' ? config.prodAuthApi : config.testAuthApi;

if (isWechat() && config.isLogin && !parseUrl('oid')) { // 如果是微信，并且在config中idLogin为true，同时是非登陆状态就重新登陆
  // 没有历史,底部的按钮会被遮挡 ios
  var source = parseUrl('source');
  if (source && source.includes('share')) {
    window.history.pushState({}, "title", "#");
  }
  location.href = oauthURL + location.origin + location.pathname + encodeURIComponent(location.search);
} else {
  // 由于分享后的地址在ios上Hash会丢失，因此通过redirect_path来跳转页面
  var redirectPath = parseUrl('redirect_path');
  if (redirectPath) {
    var url = deleteUrlQuery('redirect_path');
    window.location.href = url + '#/' + redirectPath;
  } else {
    initApp()
  }
}

function initApp() {
  return new Vue({
    el: '#app',
    data: {},
    router,
    store,
    template: '<App/>',
    components: {
      App
    }
  })
}
