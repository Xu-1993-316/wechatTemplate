var install = function(Vue) {
    Vue.directive('copy-target', function(el, binding) {
        console.log(binding.value.substr(1))
        var pattr = /^#\w+/;
        if (!pattr.test(binding.value)) return;

        var selection = window.getSelection();
        var copyValue = '';

        el.onclick = function() {

            var target = document.getElementById(binding.value.substr(1));

            if (target.nodeName == 'INPUT' || target.nodeName == 'TEXTAREA') {
                target.focus();
                target.setSelectionRange(0, -1);
                copyValue = target.value;

                document.execCommand('copy');
                target.setSelectionRange(0, 0);
                target.blur();
            } else {
                var range = document.createRange();
                range.selectNodeContents(target);
                selection.removeAllRanges();
                selection.addRange(range);

                copyValue = target.innerText;

                document.execCommand('copy');
                selection.removeAllRanges();
            }

            
        }

        // document.addEventListener('copy', function copy(e) {
        //     e.clipboardData.setData('text/plain', copyValue + '\n\nauthor: logan');
        //     e.preventDefault();
        //     console.log('copy')
        // })
        
    })
}

export default {
    install: install
}