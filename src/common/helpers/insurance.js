import moment from 'moment'

//获取被保人年龄--计算方式
function getAge(date) {
    var birthDate = moment(date).add(0, 'days');;
    var nowDate = moment(Date.now() + (1000 * 60 * 60 * 24));
    var nowTime = new Date(nowDate).getTime();
    var age = 0;
    var ageDate = 0;

    if (birthDate.year() > nowDate.year()) {
        return null;
    } else if ((birthDate.month() < nowDate.month()) || (birthDate.month() === nowDate.month() && birthDate.date() <= nowDate.date())) {
        age = nowDate.year() - birthDate.year();
        ageDate = Math.floor((nowTime - new Date(`${nowDate.year()}/${birthDate.month() + 1}/${birthDate.date()}`)) / (1000 * 60 * 60 * 24));
    } else {
        age = nowDate.year() - birthDate.year() - 1;
        ageDate = Math.floor((nowTime - new Date(`${nowDate.year() - 1}/${birthDate.month() + 1}/${birthDate.date()}`)) / (1000 * 60 * 60 * 24));
    }

    return {
        age,
        ageDate
    };
}

//获取投保人年龄--计算方式
function getAgeHolder(date) {
    var birthDate = moment(date).add(1, 'days'); ///生日加1天的原因 投保人今天生日可以投，次日生日不能投
    var nowDate = moment(Date.now() + (1000 * 60 * 60 * 24));
    var nowTime = new Date(nowDate).getTime();
    var age = 0;
    var ageDate = 0;

    if (birthDate.year() > nowDate.year()) {
        return null;
    } else if ((birthDate.month() < nowDate.month()) || (birthDate.month() === nowDate.month() && birthDate.date() <= nowDate.date())) {
        age = nowDate.year() - birthDate.year();
        ageDate = Math.floor((nowTime - new Date(`${nowDate.year()}/${birthDate.month() + 1}/${birthDate.date()}`)) / (1000 * 60 * 60 * 24));
    } else {
        age = nowDate.year() - birthDate.year() - 1;
        ageDate = Math.floor((nowTime - new Date(`${nowDate.year() - 1}/${birthDate.month() + 1}/${birthDate.date()}`)) / (1000 * 60 * 60 * 24));
    }

    return {
        age,
        ageDate
    };
}

export {
    getAge,
    getAgeHolder,
}
