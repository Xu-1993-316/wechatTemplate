// import Vue from 'vue';
// import Vuex from 'vuex';
import config from '@/config.js';
// Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        'config': config,
        'jobOptions': [{
            value: "9000001",
            type: 1,
            label: "事业单位负责人"
        }, {
            value: "9000002",
            type: 1,
            label: "专业技术人员"
        }, {
            value: "9000003",
            type: 1,
            label: "商业工作人员"
        }, {
            value: "9000004",
            type: 1,
            label: "服务性工作人员"
        }, {
            value: "9000005",
            type: 2,
            label: "农林牧渔劳动者"
        }, {
            value: "9000006",
            type: 2,
            label: "生产、运输工作者"
        }, {
            value: "9000007",
            type: 1,
            label: "办事人员"
        }, {
            value: "9000008",
            type: 2,
            label: "其他劳动者"
        }],
        'relaOptions':[
            {value: 'SELF', label: '本人'},
         {value: 'PARENTS', label: '父母'},
          {value: 'SPOUSE', label: '配偶'},
          {value: 'CHILD', label: '子女'}],
    },
    getters: {

    },
    mutations: {

    }
});
