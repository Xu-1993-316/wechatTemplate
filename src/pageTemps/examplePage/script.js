import ScrollView from '@/components/scroll-view/index.vue'
import Jigsaw from '@/common/tools/Jigsaw.js'
import InfiniteBox from '@/components/infinite-box/index.vue'
// import pdfjsLib from '@/lib/js/pdf.js'
// import pdfUrl from '~static/jiankanggaozhi.pdf'

export default {
    name: 'Index',
    isPage: true, // 必填项
    Data: {
        list: [],
        swiperOption: {
            pagination: {
                el: '.swiper-pagination'
            },
            direction: 'vertical'
        },
        dataURL: '',
        dataList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        noData: false
    },
    willEnterPage: function(data) {

    },
    mounted() {

    },
    didEnterPage(data) {

        var myImgUrl = require('../../assets/image/bg.png');
        var iconUrl = require('../../assets/image/shareicon.jpg');

        jigsaw.drawImage(myImgUrl);

        jigsaw.drawImage(iconUrl, {
            center: true,
            y: 300,
            width: 200,
            height: 200
        })

        jigsaw.fillText('你好啊', {
            center: true,
            y: 500,
            fontSize: '30px',
            color: '#fff'
        })

        jigsaw.fillText('你好啊', {
            center: false,
            x: 200,
            y: 600,
            fontSize: '30px',
            color: 'blue'
        })

        jigsaw.imgOnload = function(dataURL) {
            this.dataURL = dataURL;
        }.bind(this);
    },
    didEnterPage(data) {

    },
    methods: {
        refresh(resolve) { // 不论成功失败都要调用resolve()方法，否则会显示一直加载中
            setTimeout(() => {
                if (this.dataList.length >= 20) {
                    this.noData = true;
                    resolve('end'); //'end'代表到底了
                } else {
                    this.dataList.push(this.dataList[this.dataList.length - 1] + 1);
                    resolve('success'); //'success'表示成功，其他的表示失败
                }
            }, 600);
        },
        bottomReachedMethod() {
            console.log('滚动到底了');
        }
    },
    components: {
        ScrollView,
        InfiniteBox
    }
}