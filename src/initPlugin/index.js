import wxsdk from '@/plugins/wxsdk.js' //微信配置项
import pageDelegate from '@/plugins/pageDelegate.js' // 页面生命周期,页面间切换的封装，支持页面传值
import safeClick from '@/plugins/safeClick.js' //放连点
import http from '@/plugins/http.js' //封装axios请求
import storage from '@/plugins/storage.js' //浏览器的缓存设置
import actionMonitor from '@/plugins/action-monitor.js' //埋点
import config from '@/config.js'

var init = function () {
  Vue.use(wxsdk, {
    defaultShareVisiable: true
  }) // 微信sdk封装
  Vue.use(pageDelegate)
  Vue.use(safeClick); // 防连点
  Vue.use(storage, {
    scope: config.storageScope
  })
  Vue.use(http, {
    apiGroups: [{
      domain: 'kangebao',
      path: '/kangebao'
    }]
  })
  Vue.use(actionMonitor, {
    paramsArray: ['openid', 'source', 'oid'],
    reqUrl: '/track/action',
    scope: config.storageScope
  })
}

export default init;
