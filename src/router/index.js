const Index = () =>
  import('@/page/indexPage/index.vue')

var routes = [{
  path: '/',
  name: 'Index',
  component: Index
}]

export default new VueRouter({
  routes: routes
});
