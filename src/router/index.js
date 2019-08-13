import Vue from 'vue'
import Router from 'vue-router'
const Index = () =>
  import('@/page/indexPage/index.vue')
Vue.use(Router);

var routes = [{
  path: '/',
  name: 'Index',
  component: Index
}]

export default new VueRouter({
  routes: routes
});
