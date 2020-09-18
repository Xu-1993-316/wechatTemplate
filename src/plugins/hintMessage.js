let hint = function (Vue) {
  let timer = null,
    setHint = function () {
      let page_container = document.getElementsByClassName('page_container')[0],
        hint_shadow = document.createElement('div'),
        hint_box = document.createElement('p');
      hint_shadow.className = 'hintMessage_shadow'
      hint_box.className = 'hintMessage_hintBox'

      let hint_shadow_style = {
        position: 'fixed',
        top: '0',
        left: '0',
        display: 'none',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: '14px',
        color: '#fff',
        textAlign: 'center'
      }
      Object.assign(hint_shadow.style, hint_shadow_style)

      let hint_box_style = {
        maxWidth: '210px',
        borderRadius: '4px',
        backgroundColor: 'rgba(0,0,0,0.6)',
        margin: '0 auto',
        marginTop: '50%',
        padding: '4px 8px'
      }
      Object.assign(hint_box.style, hint_box_style)

      page_container.appendChild(hint_shadow)
      // 阻止页面点击穿透
      document.getElementsByClassName('hintMessage_shadow')[0].addEventListener('touchstart', function (e) {
        e.preventDefault()
      })
      document.getElementsByClassName('hintMessage_shadow')[0].appendChild(hint_box)
    };

  Vue.prototype.$setHint = function (val, timer) {
    if (!document.getElementsByClassName('hintMessage_shadow')[0]) {
      setHint()
    }
    clearInterval(timer)
    document.getElementsByClassName('hintMessage_shadow')[0].style.display = 'block'
    document.getElementsByClassName('hintMessage_hintBox')[0].innerHTML = val

    timer = setTimeout(() => {
      if (document.getElementsByClassName('hintMessage_shadow')[0]) {
        document.getElementsByClassName('hintMessage_shadow')[0].style.display = 'none'
      }
    }, Number(timer))
  }
}

export default {
  install: hint
}
