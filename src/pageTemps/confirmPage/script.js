export default {
    name: 'Confirm',
    isPage: true,
    title: "投保确认",
    Data: {
        policyInfo: null,
        relationOpt: {
            'SELF': '本人',
            'PARENTS': '父母',
            'SPOUSE': '配偶',
            'CHILD': '子女'
        },
        app: 888,
    },
    willEnterPage() {
        this.policyInfo = this.$localStorage.getItem('orderinfo'); //下单接口的
    },
    methods: {
        //确认支付
        confirmOrder() {
            console.log("confirmOrder");
            this.$replace('/paysuccess');
        }
    }
}