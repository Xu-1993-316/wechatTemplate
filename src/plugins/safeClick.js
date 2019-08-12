/**
 * 防止连点
 * <button v-safeClick="{fn: safeClick, params: {name: 'logan'}}"></button>
 * export defaults {
 *     methods: {
 *         safeClick: function(params, open) {
 *             // 方法一旦调用会锁住，调用open解开,params是传入的参数
 *              setTimeout(() => {
                    open()
                }, 2000);
 *         }
 *     }
 * }
 */
var install = function (Vue, options) {
  Vue.directive('safeClick', {
    bind: function (el, binding, vnode) {
      var fn = binding.value.fn,
        lock = binding.value.lock,
        params = binding.value.params;
      // 解除防连点
      function openClick() {
        setTimeout(function () {
          lock = false;
        }, 300)
      }
      // 设置防连点
      el.onclick = function () {
        if (lock) return
        lock = true
        fn(params, openClick)
      }
    }
  })
}

export default {
  install: install
}
