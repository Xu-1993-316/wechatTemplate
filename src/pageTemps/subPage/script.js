import provision from "@/components/provision/index.vue"
import json from "@/assets/doc/provisionJson2.js"
import json3 from "@/assets/doc/provisionJson3.js"

export default {
    name: 'SubPage',
    isPage: true,
    title: '保险条款',
    Data: {
        name: 'xuzhi',
        json: [{ "title": "标题", "titleid": 1, "expand": true, "children": [{ "title": "标题", "titleid": "1.1", "expand": true, "children": [], "content": [{ "text": "faaaaaad" }, { "text": "<br>" }, { "text": "aaaaaaaaaa" }], "nodeKey": 2 }], "content": [], "nodeKey": 1 }],

        tiaokuan: tiaokuan,
        firstPageInfo: {
            title: "税延所有条款",
            tip: "本阅读指引有助于您理解条款，对本合同内容的解释以条款为准。",
            remind: "条款是保险合同的重要内容，为充分保障您的权益，请您仔细阅读本条款。"
        }
    },
    components: {
        provision
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.$data.title = 'hahaha'
        })
    },
    willEnterPage: function(data) {},
    didEnterPage: function(data) {},
    methods: {}
}