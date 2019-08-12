// import Vue from 'vue'
// import Router from 'vue-router'


const Index = () =>
    import ('@/page/indexPage/index.vue');
const Sub = () =>
    import ('@/page/subPage/index.vue');
const Third = () =>
    import ('@/page/thirdPage/index.vue');
// Vue.use(Router);

var routes = [{
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: '/sub',
        name: 'Sub',
        component: Sub
    },
    {
        path: '/third',
        name: 'Third',
        component: Third
    }
];

export default new VueRouter({
    routes: routes
});
