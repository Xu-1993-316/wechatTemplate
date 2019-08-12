import axios from 'axios';

var Http = function () {
  this.defaultHeaders = {};
  this.apiGroups = {
    default: ''
  };

};
//     //添加请求拦截器
// axios.interceptors.request.use(config => {
//     //在发送请求之前做某事，比如说 设置loading动画显示
//     return config
// }, error => {
//     //请求错误时做些事
//     return Promise.reject(error)
// })

// //添加响应拦截器
// axios.interceptors.response.use(response => {
//     //对响应数据做些事，比如说把loading动画关掉
//     return response
// }, error => {
//     //请求错误时做些事
//     return Promise.reject(error)
// })

axios.interceptors.response.use(res => {
  // console.log(Object.keys(res));
  return res;
}, error => {
  console.log(Object.keys(error))
  console.log(error.response);
})
Http.prototype.get = function (path, domain, opt) {

  if (typeof domain !== 'string') {
    opt = domain;
    domain = 'default';
  }

  var dmStr = this.apiGroups[domain] || this.domain ? this.domain : '';
  return axios.get(`${dmStr + path}`, opt);
};

Http.prototype.post = function (path, domain, opt) {
  if ((typeof domain) !== 'string') {
    opt = domain;
    domain = 'default';
  }

  var dmStr = this.apiGroups[domain] || this.domain ? this.domain : '';
  return axios.post(`${dmStr + path}`, opt);
}

Http.reqPromises = {};

// 接口节流请求 同名同参数的接口在上一个接口请求返回前不会重复请求  新发出的请求直接返回老的请求的promise对象
Http.prototype.spost = function (reqPath, opt) {
  var path = reqPath + JSON.stringify(opt);
  if (Http.reqPromises[path]) {
    return Http.reqPromises[path].promise;
  } else {
    var p = new Promise((resolve, reject) => {
      this.post(`${reqPath}`, opt).then(res => {
        Http.reqPromises[path] = null;
        resolve(res);
      }).catch(err => {
        Http.reqPromises[path] = null;
        reject(err);
      });
    });

    Http.reqPromises[path] = {
      opt: opt,
      promise: p
    };

    return p;
  }
};

Http.prototype.setDomain = function (domain) {
  this.domain = domain;
}

Http.prototype.setAppKey = function (appkey) {
  axios.defaults.headers.common.appkey = appkey;
}

Http.prototype.setDefaultHeaders = function (opt) {
  Object.keys(opt).forEach(key => {
    axios.defaults.headers.common[key] = opt[key]
  })
}


Http.prototype.setApiGroups = function (groupParams) {

  for (let i = 0, len = groupParams.length; i < len; i++) {
    var params = groupParams[i];
    this.apiGroups[params.domain] = params.path;
  }
}

// 给axios包了一层，加了domain字段 后台不同服务器的部署会导致domain不一样 比如/rest/v0/getUserInfo /hc/v0/getUserInfo
var install = function (Vue, options) {
  var http = new Http();
  var apiGroups = options.apiGroups;
  Vue.prototype.$http = http;
  options.appkey && http.setAppKey(options.appkey);
  options.apiGroups && http.setApiGroups(apiGroups);
};

export default {
  install: install
}
