import shareIcon from '@/assets/image/shareicon.jpg'
import {
  getShareSource
} from '@/common/helpers/utils.js'

var apiDomain = (/activity.minshenglife/.test(location.origin)) ? '/ins' : '/ins';

if (process.env.NODE_ENV == 'test') { // 通过process.env.NODE_ENV 来区分环境
  location.pathname.split("/").forEach(item => {
    if (/stargate_/.test(item)) {
      apiDomain = `/${item}`
    }
  })
}

var source = getShareSource(),
  config = {
    projectTitle: '',
    storageScope: 'template',
    defaultShareOption: {
      title: '分享标题',
      desc: '这里是分享的描述',
      imgUrl: shareIcon,
      link: `${location.origin}${location.pathname}?source=${source}`
    },
    apiDomain: apiDomain,
    isLogin: false,
    testAuthApi: 'http://test.msjk95596.com/act/wechat/base/access_token/?state=',
    prodAuthApi: 'http://www.msjk95596.com/act/wechat/base/access_token/?state='
  };

export default config;
