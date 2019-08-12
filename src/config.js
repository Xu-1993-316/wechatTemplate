import shareIcon from '@/assets/image/shareicon.jpg'
import { getShareSource } from '@/common/helpers/utils.js'

var apiDomain = ''; // 默认接口是不带前缀的

// 如果环境是在activitytest，要带有前缀
// var apiDomain = '';
var apiDomain = (/activity.minshenglife/.test(location.origin)) ? '/ins' : '/ins';

// 通过process.env.NODE_ENV 来区分环境
if (process.env.NODE_ENV == 'test') {
    location.pathname.split("/").forEach(item => {
        if (/stargate_/.test(item)) {
            apiDomain = `/${item}`
        }
    })
}

var source = getShareSource();
var config = {
    projectTitle: '微信项目模板',
    storageScope: 'test',
    defaultShareOption: {
        title: '分享标题',
        desc: '这里是分享的描述',
        imgUrl: shareIcon,
        link: `${location.origin}${location.pathname}?source=${source}`
    },
    apiDomain: apiDomain,
    isLogin: false,
    testAuthApi: 'http://test.msjk95596.com/act/wechat/base/access_token/?state=',
    prodAuthApi: 'http://www.msjk95596.com/act/wechat/base/access_token/?state=',
    test_yingshe: "",
    // test_yingshe:"/insb2",
}

export default config;