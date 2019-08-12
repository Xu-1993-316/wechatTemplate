<template>
  <transition name="zoomIn">
    <div class="captcha-modal" v-show="captchaVisiable">
      <div class="overlay"></div>
      <div class="captcha-container">
        <div class="captcha-title">请输入图形验证码</div>
        <div class="captcha-input-container">
          <input type="text" v-resetInput placeholder="" v-model="captchaCode" />
          <div class="pic-container">
            <img :src="captchaImg" alt="图形验证码失效了">
          </div>
        </div>
        <div class="captcha-btn" v-safeClick="{fn:sendSmsCode}">确定</div>
        <img src="../../assets/image/close.png" alt="" class="captcha-close-btn" @click="closeCaptcha">
        <img src="../../assets/image/refresh.png" alt="" class="captcha-refresh-btn" @click="createCaptcha">
      </div>
    </div>
  </transition>
</template>
<script>
    import config from '@/config.js'
    export default {
        data() {
            return {
                captchaCode: ""
            }
        },
        props: ['captchaVisiable', 'captchaImg'],
        mounted() {
            this.createCaptcha();
        },
        methods: {
            // 生成图形验证码
            createCaptcha() {
                this.$emit("createCaptcha")
            },
            sendSmsCode(params, open) {
                this.$emit("sendSmsCode", params, open, this.captchaCode)
            },
            closeCaptcha() {
                this.$emit("closeCaptcha")
            },
            clearCaptchCode() {
                this.captchaCode = ""
            }
        }
    }
</script>
<style scoped>
    .captcha-modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    
    .captcha-modal .overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .6);
    }
    
    .captcha-container {
        position: absolute;
        width: 7.2rem;
        height: 4.533333rem;
        border-radius: .32rem;
        background-color: #fff;
        top: 33%;
        left: 50%;
        transform: translateX(-50%);
    }
    
    .captcha-title {
        font-size: .426667rem;
        color: #030303;
        text-align: center;
        margin: .266667rem auto .72rem;
    }
    
    .captcha-input-container {
        position: relative;
        width: 5.573333rem;
        height: 1.2rem;
        border: 1px solid #E5E5E5;
        margin-left: .506667rem;
        margin-bottom: .48rem;
    }
    
    .captcha-input-container input {
        position: absolute;
        top: 0;
        left: 0;
        border: none;
        outline: none;
        height: 100%;
        width: 100%;
        padding: .346667rem .586667rem;
        font-size: .426667rem;
        -webkit-user-select: auto;
    }
    
    .captcha-input-container .pic-container {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 2.266667rem;
        border-left: 1px solid #E5E5E5;
    }
    
    .captcha-input-container .pic-container img {
        width: 100%;
        height: 100%;
    }
    
    .captcha-btn {
        margin: 0 auto;
        width: 3.226667rem;
        height: 1.066667rem;
        line-height: 1.066667rem;
        color: #fff;
        background-color: #FF963A;
        font-size: .48rem;
        text-align: center;
        border-radius: .533333rem;
    }
    
    img.captcha-close-btn {
        position: absolute;
        top: .346667rem;
        width: .346667rem;
        right: .346667rem;
    }
    
    img.captcha-refresh-btn {
        position: absolute;
        top: 1.893333rem;
        width: .4rem;
        right: .346667rem;
    }
</style>