export default {
  isPage: true,
  name: 'indexPage',
  title: '模板',
  Data: {
    message: 'Hello World!'
  },
  willEnterPage: function (data) {},
  didEnterPage(data) {},
  methods: {
    toSub(params, openClick) {
      setTimeout(() => {
        openClick()
      }, 2000)
    },
    toThird() {}
  },
  components: {}
}
