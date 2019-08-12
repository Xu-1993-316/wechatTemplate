import inputGroup from '@/components/input/input-group.vue'
import smsGroup from '@/components/sms/sms-group.vue'
import selectGroup from '@/components/select/select-group.vue'
import captcha from '@/components/captcha/captcha.vue'
import agreeGroup from '@/components/agree/agree-group.vue'
import datePickerGroup from '@/components/datepicker/date-picker-group.vue'

import config from '@/config.js'
// import { mapState } from Vuex;
const { mapState } = Vuex
import {
    validate
} from "~helpers/validate.js";
import {
    getAge,
    getAgeHolder
} from "~helpers/insurance.js";

export default {
    name: 'InsurePage',
    isPage: true,
    title: "投保信息",
    Data: {
        validate,
        agree: false,
        allDirty: false,
        allRight: false,
        insureds: { // 被保险人信息
            name: '',
            idNum: '',
            idCutoffDate: '2100-01-01T23:59:59.000+0800',
            relation: '',
            phone: '',
            address: '空',
            job: '',
            jobType: '1',
            jobCode: ''
        },
        policyHolder: { // 投保人信息
            name: '',
            idNum: '',
            idCutoffDate: '2100-01-01T23:59:59.000+0800',
            city: '',
            job: '',
            jobType: '1',
            jobCode: '',
            phone: '',
            address: '空'
        },
        dateOpt: {
            startDate: new Date(),
            endYear: 20
        },
        smsCode: '',
        captchaImg: '', // 图形验证码图片
        captchaVisiable: false,
        limitAge: 16,
        limitAgeDate: 27, //28天
        storeInfos: null,
    },
    created() {
        this.policyHolder.city = "上海市"
        this.loadStoreInfos()
    },
    methods: {
        //获取存储的保单信息
        loadStoreInfos() {
            this.storeInfos = this.$localStorage.getItem('storeInfos')
        },
        //填入保单参数
        fillInsureParameters(obj, parameters) {
            parameters.forEach(p => {
                obj[p] = this.storeInfos[p] || ""
            })
        },
        //信息清空
        removeFields(type, fields) {
            fields.forEach(field => {
                if (field == 'idCutoffDate') {
                    this[type][field] = '长期';
                } else if (field == 'address') {
                    this[type][field] = 'null-上海市-null-null';
                } else {
                    this[type][field] = '';
                }
            })
        },
        //被保人是本人,信息处理
        //传入数组,被保人信息等于投保人信息
        syncInsuredsInfo(infos) {
            infos.forEach(info => {
                this.insureds[info] = this.policyHolder[info]
            })
        },
        //被保人不是本人,信息处理
        //传入数组,被保人信息已等于投保人信息，清空
        insuredsNotSelf(infos) {
            infos.forEach(info => {
                this.insureds[info] = this.insureds[info] !== this.policyHolder[info] ? this.insureds[info] : '';
            })
        },
        //点击发送验证码
        onSendSms: function(countDown) {
            if (!this.validate.phone(this.policyHolder.phone)) return

            // 弹出图形验证码弹框
            this.showCaptchaModal()

            this.sendSmsSuccess = function() {
                countDown();
            }

            this.sendSmsFail = function(err) {
                this.$message.toast(err);
                this.clearCaptchCode()
                this.createCaptcha();
            }
        },
        //显示图形验证码弹框
        showCaptchaModal: function() {
            this.captchaVisiable = true;
            this.createCaptcha();
            this.clearCaptchCode()
        },
        //清空图形验证码
        clearCaptchCode() {
            this.$refs.captcha.clearCaptchCode();
        },
        // 生成图形验证码
        createCaptcha() {
            v.$http.get(config.test_yingshe + '/api/facade/auth/createImage').then(res => {
                if (res.data.code == '0000') {
                    this.captchaImg = 'data:image/jpeg;base64,' + res.data.attachment;
                }
            })
        },
        //发送短信
        sendSmsCode: function(params, open, captchaCode) {
            if (!captchaCode) {
                this.$message.toast('请输入图形验证码');
                open()
                return;
            };
            this.$http.get(`${config.test_yingshe}/api/facade/auth/sendCaptcha/${this.policyHolder.phone}/${captchaCode}`).then(res => {
                open()
                if (res.data.code == '0000') {
                    this.captchaVisiable = false;
                    this.sendSmsSuccess && this.sendSmsSuccess();
                } else {
                    this.sendSmsFail && this.sendSmsFail(res.data.message);
                }
            }).catch(err => {
                open()
                this.captchaVisiable = false;
                this.$message.toast(err.response.data.ErrorMsg);
            })
        },
        verifySms() {
            if (!this.smsCode) {
                this.$message.toast('验证码不能为空')
                return
            }
            return new Promise((resolve, reject) => {
                this.$http.get(`${config.test_yingshe}/api/facade/auth/verifyCaptcha/${this.policyHolder.phone}/${this.smsCode}`).then(res => {

                    if (res.data.code === '0000') {
                        resolve()
                    } else if (res.data.code == '0001') {
                        reject('验证码有误')
                    } else {
                        reject(res.data.message);
                    }
                }).catch(err => {
                    // this.smsCode = ''
                    reject(err)
                })
            })
        },
        //切换与被保人关系 -回调
        onChangeRelation() {
            let value = this.insureds.relation;

            this.removeFields('insureds', ['name', 'idNum', 'idCutoffDate', 'phone', 'address', 'job', 'jobType', 'jobCode']);
            this.removeFields('policyHolder', ['idCutoffDate']);

            if (value === 'SELF') {
                this.isSelf = true;
                this.syncInsuredsInfo(['name', 'idNum', 'idCutoffDate', 'phone', 'job', 'jobType', 'jobCode'])

                this.insureds.address = this.policyHolder.city + this.policyHolder.address;
            } else {
                this.isSelf = false;
                this.insuredsNotSelf(['name', 'idNum', 'idCutoffDate', 'phone', 'job', 'jobType', 'jobCode'])

                this.insureds.address = this.insureds.address !== (this.policyHolder.city + this.policyHolder.address) ? this.insureds.address : '';
            }
        },
        //获取职业名称
        getJobLabel(code) {
            return code ? this.jobOptions.filter(item => item.value == code)[0].label : ""
        },
        //获取职业类别
        getJobType(code) {
            return code ? this.jobOptions.filter(item => item.value == code)[0].type : ""
        },
        //投保信息变更回调函数
        handleInfoChange() {
            var checkTimer = null;

            checkTimer && clearTimeout(checkTimer)

            checkTimer = setTimeout(() => {
                this.checkInfos().then(res => {
                    this.allRight = true
                }).catch(err => {
                    this.allRight = false
                })
            }, 200)
        },
        //校验信息
        checkInfos() {
            return Promise.resolve().then(() => {
                return new Promise((resolve, reject) => {
                    var hasEmpty = false

                    if (this.insureds.relation == 'SELF') {
                        this.insureds.phone = this.policyHolder.phone;
                    }

                    Object.keys(this.policyHolder).forEach(key => {
                        if (!this.policyHolder[key] && key != 'address') {
                            hasEmpty = true
                        }
                    })

                    Object.keys(this.insureds).forEach(key => {
                        if (!this.insureds[key] && key != 'address' && key != 'phone') {
                            if (key == 'idCutoffDate') {
                                if (validate.idcard(this.insureds.idNum)) {
                                    var idNumDate = this.insureds.idNum.substr(6, 4) + '-' + this.insureds.idNum.substr(10, 2) + '-' + this.insureds.idNum.substr(12, 2)
                                    var ageObj = getAge(idNumDate)

                                    if (ageObj.age >= this.limitAge) {
                                        hasEmpty = true
                                    }
                                }
                            } else {
                                hasEmpty = true
                            }
                        }
                    })

                    if (hasEmpty) {
                        reject('选项不能为空！')
                    }

                    if (!validate.name(this.policyHolder.name)) {
                        reject('投保人姓名填写有误')
                    }
                    if (this.insureds.relation != 'SELF' && !validate.name(this.insureds.name)) {
                        reject('被保人姓名填写有误')
                    }
                    if (!validate.idcard(this.policyHolder.idNum)) {
                        reject('投保人身份证格式有误')
                    }

                    if (!validate.phone(this.policyHolder.phone)) {
                        reject('投保人手机格式有误')
                    }

                    if (!validate.phone(this.insureds.phone)) {
                        reject('被保险人手机格式有误')
                    }

                    if (!validate.idcard(this.insureds.idNum)) {
                        reject('被保险人身份证格式有误')
                    } else if (this.insureds.relation != 'SELF' && this.insureds.idNum == this.policyHolder.idNum) {
                        reject('非本人时身份证不能一样')
                    }

                    if (this.policyHolder.jobType > 4 && this.insureds.relation == 'SELF') {
                        reject('投保人职业无法投保')
                    }

                    if (!this.smsCode) {
                        reject('验证码不能为空')
                    }

                    if (!this.agree) {
                        reject('请阅读条款')
                    }

                    resolve()
                })
            }).then(() => {
                return this.checkPolicyHolderAge();
            }).then(() => {
                return this.checkInsuredsAge();
            })

        },
        //被保人年龄限制
        checkInsuredsAge(idNumVal) {
            var idNum = !!idNumVal ? idNumVal : this.insureds.idNum;
            var birthDay = new Date(idNum.substr(6, 4) + '/' + idNum.substr(10, 2) + '/' + idNum.substr(12, 2))

            var ageObj = getAge(birthDay);
            return new Promise((resolve, reject) => {
                // 次日未满61周岁可以投保
                if (ageObj.age < 0 || ageObj.age > 60 || (ageObj.age == 0 && ageObj.ageDate < this.limitAgeDate)) {
                    reject('被保险人年龄不适用');
                } else {
                    resolve();
                }
            });
        },
        //投保人投保年龄限制(未满18)
        checkPolicyHolderAge() {
            var idNum = this.policyHolder.idNum
            var birthDay = new Date(idNum.substr(6, 4) + '/' + idNum.substr(10, 2) + '/' + idNum.substr(12, 2))

            var ageObj = getAgeHolder(birthDay)

            return new Promise((resolve, reject) => {
                if (ageObj.age < 18) {
                    reject('未满18')
                } else {
                    resolve()
                }
            })
        },
        // 投保身份证年龄 失焦回调
        handleCheckPolicyAge() {
            var lock = false;

            if (!validate.idcard(this.policyHolder.idNum)) return;

            if (lock) return;
            lock = true;
            this.checkPolicyHolderAge().then(() => {
                lock = false;
            }).catch(err => {
                this.$trackEvent('insure', 'popAge1')
                this.$message.alert('', '由于作为投保人，您未能年满18岁，\n根据国家法律，您无法参与投保。\n为您对我们的信任我们深表感激。', () => {
                    this.policyHolder.idNum = ""
                    lock = false;
                });
            });
        },
        // 被保身份证年龄 失焦回调
        handleCheckInsuredsAge() {
            var lock = false;

            if (!validate.idcard(this.insureds.idNum)) return;

            if (lock) return;
            lock = true;

            this.checkInsuredsAge().then(() => {
                lock = false;
            }).catch(err => {
                this.$message.alert('', '被保人年龄不适用', () => {
                    this.insureds.idNum = ""
                    lock = false;
                });
            });

        },
        //立即投保
        createPolicy(params, open) {
            this.allDirty = true
            if (!this.allRight) {
                open()
                return
            }
            Promise.resolve().then(() => {
                return this.checkInfos()
            }).then(() => {
                return this.checkPolicyHolderAge()
            }).then(() => {
                // return this.verifySms()
            }).then(() => {
                this.startCreate()
                console.log("投保开始");
            }).catch(err => {
                open()
                this.$message.toast(err)
                this.$hideLoading()
            })
        },
        //开始投保吧
        startCreate() {
            //将数据填入，发起请求
            //模拟数据结构为随e保
            let reqOpt = {
                // 被保人
                "beInsuredCustomers": [{
                    "address": "", //this.policyHolder.city,
                    "customerName": this.insureds.name,
                    "idNumber": this.insureds.idNum,
                    "mobile": '',
                    "parameters": {
                        // "IDVALIDTIME":"2028-6-13",
                        // "JOBTYPE":parseInt(this.insureds.jobType)
                        "JOB": this.insureds.job,
                        "JOBTYPE": parseInt(this.insureds.jobType),
                        "JOBCODE": this.insureds.jobCode,
                        "SOCIALSECURITY": parseInt(this.storeInfos['SOCIALSECURITY']),
                    },
                    "relationWithHolder": this.insureds.relation
                }],
                // 客户信息？？
                "benneCustomers": [{
                    "address": "", //this.policyHolder.city,
                    "customerName": this.insureds.name,
                    "idNumber": this.insureds.idNum,
                    "mobile": this.insureds.phone,
                    "parameters": {
                        "JOB": this.insureds.job,
                        "JOBTYPE": parseInt(this.insureds.jobType),
                        "JOBCODE": this.insureds.jobCode,
                        "IDVALIDTIME": this.insureds.idCutoffDate,
                    },
                    "relationWithHolder": this.insureds.relation
                }],
                // 投保人
                "holderCustomer": {
                    "address": this.policyHolder.city,
                    "customerName": this.policyHolder.name,
                    "idNumber": this.policyHolder.idNum,
                    "mobile": this.policyHolder.phone,
                    "parameters": {
                        "JOB": this.policyHolder.job,
                        "JOBTYPE": parseInt(this.policyHolder.jobType),
                        "JOBCODE": this.policyHolder.jobCode,
                        "IDVALIDTIME": this.policyHolder.idCutoffDate,
                        "RESIDENTAREA": this.policyHolder.city
                    }
                },

                "informparameter": {
                    "INFORM_RESULT": "是"
                },
                // 保单参数
                "insureparameters": {
                    "project_name": 'suiebao',
                    "main_source": 'wechat',
                    "source": !!this.$url.parseUrl('source') ? this.$url.parseUrl('source') : "",
                },
                "productCode": config.productCode
            }
            this.fillInsureParameters(reqOpt.insureparameters, ["SOCIALSECURITY", "OPTION_COVERAGE", "BIRTHDAY", "DEDUCTIBLE", "CLAIMRATIO", "MAXCLAIMAMOUNT", "AGENTID"])
            console.log("reqOpt", reqOpt);
            this.$localStorage.setItem('orderinfo', reqOpt);

            this.$switchTo('/confirm')
        },
    },
    computed: {
        ...mapState([
            'jobOptions',
            'relaOptions',
        ])
    },
    watch: {
        'insureds.relation' (value, oldvalue) {
            if (value == 'SELF') {
                if (!validate.idcard(this.policyHolder.idNum)) return

                this.checkInsuredsAge(this.policyHolder.idNum).then(res => {
                    return this.onChangeRelation();
                }).catch(err => {
                    if (err == '被保险人年龄不适用') {
                        this.$message.toast('作为被保人年龄不适用')
                        this.insureds.relation = oldvalue
                    }
                })

            } else {
                this.onChangeRelation();
            }
            this.handleInfoChange()
        },
        'policyHolder': {
            handler(value, oldvalue) {
                let {
                    jobCode
                } = value;
                if (jobCode) {
                    this.policyHolder.job = this.getJobLabel(jobCode)
                    this.policyHolder.jobType = this.getJobType(jobCode)
                }
                if (this.insureds.relation == "SELF") {
                    this.syncInsuredsInfo(['name', 'idNum', 'idCutoffDate', 'phone', 'job', 'jobType', 'jobCode'])
                }

                this.handleInfoChange();
            },
            deep: true
        },
        'insureds': {
            handler(value, oldvalue) {
                let {
                    jobCode
                } = value;
                if (jobCode) {
                    this.insureds.job = this.getJobLabel(jobCode)
                    this.insureds.jobType = this.getJobType(jobCode)
                }
                this.syncInsuredsInfo(['idCutoffDate', 'phone'])
                this.handleInfoChange();
            },
            deep: true
        },
        'agree' () {
            this.handleInfoChange();
        },
        'smsCode' () {
            this.handleInfoChange();
        },
    },
    components: {
        inputGroup,
        smsGroup,
        captcha,
        selectGroup,
        agreeGroup,
        datePickerGroup,
    }
}
