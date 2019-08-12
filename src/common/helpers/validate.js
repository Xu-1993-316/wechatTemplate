//手机号验证
function isPhoneNo(tel) {
    var pattern = /^1[23456789]\d{9}$/;
    return pattern.test(tel);
}

// 身份证号码验证
function isCardNo(val) {
    var powers = new Array("7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2");
    var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");

    if (!val) return false
    var _id = val.toUpperCase();
    if (_id.length != 18) {
        return false;
    }
    _id = _id + "";
    var _num = _id.substr(0, 17);
    var _parityBit = _id.substr(17);
    var _power = 0;
    for (var i = 0; i < 17; i++) {
        //校验每一位的合法性
        if (_num.charAt(i) < '0' || _num.charAt(i) > '9') {
            return false;
            break;
        } else {
            //加权
            _power += parseInt(_num.charAt(i)) * parseInt(powers[i]);
        }
    }
    //取模
    var mod = parseInt(_power) % 11;
    if (parityBit[mod] == _parityBit) {
        return true;
    }
    return false;
}

//姓名验证
//最少两个汉字，最多32个允许存在 .·最为分隔符
function isName(str) {
    let pattern1 = /^[\u4e00-\u9fa5][\u4e00-\u9fa5(\.|·)]{0,30}[\u4e00-\u9fa5]+$/
    let pattern2 = /(\.|·){2}/
    return pattern1.test(str) && !pattern2.test(str)
}

//邮箱验证
function validateMail(val) {
    var mailVali = /^[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)+$/
    return mailVali.test(val)
}

//社会信用代码校验,只能是18位
function validateSocial(val) {
    const pattern = /^[0-9a-zA-Z]{18}$/
    return pattern.test(val)
}

//纳税人识别号校验，纳税人识别号只能是字母或者数字并且是15、18、20位
function validateTaxpayer(val) {
    const pattern = /^[0-9a-zA-Z]+$/
    const valLen = val.length == 15 || val.length == 18 || val.length == 20
    return pattern.test(val) && valLen
}

let validate = {
    phone: isPhoneNo,
    idcard: isCardNo,
    name: isName,
    mail: validateMail,
    social: validateSocial,
    taxpayer: validateTaxpayer,
}

export {
    validate
}