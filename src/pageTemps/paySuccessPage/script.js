import config from '@/config.js'
export default {
    name: 'SubPage',
    isPage: true,
    // shareVisiable:false,
    Data: {
        name: 'logan',
        age: '12'
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.$data.title = 'hahaha'
        })
    },
    willEnterPage: function(data) {},
    didEnterPage: function(data) {},
    methods: {
        backWechat() {
            // this.$trackEvent('success','home')
            wx && wx.closeWindow();
        },
        toQuery() {
            // this.$trackEvent('success','detail')
            location.href = config.queryUrl;
        },
    }
}