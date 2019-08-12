// 深拷贝
function deepAssign(to, from) {  
    for (let key in from) {
        if (!from[key] || typeof from[key] !== 'object') {
            to[key] = from[key];
        } else {
            to[key] = {};
            deepAssign(to[key], from[key]);
        }
    }
}

// 生产随机id
function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
 
    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;
 
      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
 
      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
 
    return uuid.join('');
}

// 解析获取url参数
function parseUrl(queryKey) {
    var search = location.search;

    if (search.length > 0 && search.indexOf('?') > -1) {
        search = search.substring(1);
        var cArr = search.split('&');

        for (var i = 0, len = cArr.length; i < len; i++) {
            var item = cArr[i],
                key = cArr[i].split('=')[0],
                val = cArr[i].split('=')[1];

            if (key === queryKey) {
                return val;
            }
        }
    }

    return null;
}

// 删除url上的某个参数
function deleteUrlQuery(queryKey) {
    var search = location.search;
    var resSearch = '';
    var queryArr = [].concat(queryKey);

    if (search.length > 0 && search.indexOf('?') > -1) {
        search = search.substring(1);
        var cArr = search.split('&');

        for (var i = 0, len = cArr.length; i < len; i++) {
            var item = cArr[i],
                key = cArr[i].split('=')[0],
                val = cArr[i].split('=')[1];

            if (queryArr.indexOf(key) === -1) {
                if (resSearch.length == 0) {
                    resSearch += '?' + key + '=' + val;
                } else {
                    resSearch += '&' + key + '=' + val;
                }
            }
        }
    }

    return location.origin + location.pathname + resSearch;
}

// 获取url中的source，返回对应的shareSource
function getShareSource() {
    var source = parseUrl('source');

    if (source && /^share(\d)+$/.test(source)) {
        source = 'share' + (Number(source.slice(5)) + 1);
    } else {
        source = 'share0';
    }

    return source;
}

// 是否是IOS
function isIOS() {
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

    return isiOS;
}

// 是否是Android
function isAndroid() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端

    return isAndroid;
}

// 是否是微信环境
function isWechat() {
    //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    var ua = window.navigator.userAgent.toLowerCase();
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}


export {
    uuid,
    deepAssign,
    parseUrl,
    getShareSource,
    isWechat,
    isAndroid,
    isIOS,
    deleteUrlQuery
}