import switchGroup from '@/components/switch/switch-group.vue';
import birtydaySelector from '@/components/birthday/birtyday-selector.vue';

export default {
    name: "indexPage",
    title: "首页",
    Data: {
        totalPayment: 500,
        storeInfos: null,
        labelarr: {
            shebao: ["有", "无"],
        },
        // 被保人信息
        userCheckInfo: {
            birthDate: new Date("1985/01/01"), // 被保人出生日期
            hasShebao: true // 有无社保
        },
        phone: (function() {
            var phone = '1';

            while (phone.length < 11) {
                var rdm = parseInt(Math.random() * 10);

                phone = phone + rdm;
            }

            return phone;
        })()
    },
    willEnterPage: function(data) {},
    didEnterPage(data) {},
    methods: {
        //跳转健康告知页面
        toInform() {
            this.storePolicyInfo();
            this.$router.push('/inform')
        },
        //跳转投保须知
        toXuzhi() {
            this.$router.push('/xuzhi')
        },
        //跳转保险条款
        toProvision() {
            this.$router.push('/sub')
        },
        triggerSwitch() {
            console.log("triggerSwitch", this.userCheckInfo);
        },
        //存储保单参数
        storePolicyInfo() {
            //此处作为首页传入的保单参数,以随e保为模板
            this.storeInfos = {
                "BIRTHDAY": "1985-01-01", //被保人生日
                "CLAIMRATIO": 1, //比例
                "DEDUCTIBLE": 10000, //免赔
                "MAXCLAIMAMOUNT": 1000000, //保额
                "OPTION_COVERAGE": 1, //额外保障
                "SOCIALSECURITY": 1, //有无社保,1有0无
                "TYPE": "new", //作为判断是否是新随e宝
            };
            v.$localStorage.setItem('storeInfos', this.storeInfos)
        },
        //唤起客服
        televent() {

        },
        copy() {
            // this.$message.toast('复制成功');
        }
    },
    components: {
        switchGroup,
        birtydaySelector,
    }
}