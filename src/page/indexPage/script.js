export default {
  isPage: true,
  name: 'indexPage',
  title: '首页',
  Data: {
    message: 'Hello World!'
  },
  willEnterPage: function(data) {},
  didEnterPage(data) {},
  methods: {
    toSub() {
      // 搭配Data的写法，switchTo可以直接传值到第二个页面
      this.$switchTo('/sub', { name: 'Logan' })
    },
    toThird() {
      // 搭配Data的写法，switchTo可以直接传值到第二个页面
      this.$switchTo('/third', { name: 'Logan' })
    }
  },
  components: {}
}
