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
            // this.$trackEvent('failure','home')
            // _hmt.push(['_trackEvent', 'button', 'click', 'fail_ywshyl_home']);
            wx && wx.closeWindow();
        },
        toQuery() {
            // _hmt.push(['_trackEvent', 'button', 'click', 'fail_ywshyl_order']);
            // this.$trackEvent('failure','detail')
            location.href = config.queryUrl;
        }
    }
}