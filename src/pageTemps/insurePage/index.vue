<template>
  <div class="page">
    <div class="form-container">
      <div class="form-title">
        <p>投保人信息</p>
      </div>
      <div class="input-container">
        <input-group type="name" v-model="policyHolder.name" label="姓名：" placeholder="请输入" :dirty="allDirty" />
        <input-group type="idcard" v-model="policyHolder.idNum" label="身份证号：" placeholder="请输入" :dirty="allDirty" @blur="handleCheckPolicyAge" />
        <select-group v-model="policyHolder.jobCode" label="职业类别：" placeholder="请选择" :dirty="allDirty" :options="jobOptions" />
        <sms-group v-model="policyHolder.phone" label="手机号：" placeholder="请输入" @onSend="onSendSms" :dirty="allDirty" />
        <input-group v-model="smsCode" label="验证码：" placeholder="请输入" :dirty="allDirty" />
        <date-picker-group :option="dateOpt" v-model="policyHolder.idCutoffDate" :dirty="allDirty" label="有效期限："
          placeholder="请选择投保人身份证有效期限" :category="'policyHolder'" />
      </div>
    </div>
    <div class="form-container">
      <div class="form-title">
        <p>被保险人信息</p>
      </div>
      <div class="input-container">
        <select-group ref="relation" v-model="insureds.relation" label="关系：" placeholder="被保人是您的" :dirty="allDirty"
          :options="relaOptions" />

        <input-group type="name" v-model="insureds.name" label="姓名：" placeholder="请输入" :dirty="allDirty" />
        <input-group type="idcard" v-model="insureds.idNum" label="身份证号：" placeholder="请输入" :dirty="allDirty" @blur="handleCheckInsuredsAge" />
        <select-group v-model="insureds.jobCode" label="职业类别：" placeholder="请选择" :dirty="allDirty" :options="jobOptions" />
        <date-picker-group :option="dateOpt" v-model="insureds.idCutoffDate" label="有效期限：" placeholder="请选择被保险人身份证有效期"
          :dirty="allDirty" :category="'insureds'" />
      </div>
    </div>

    <agree-group v-model="agree" :type="storeInfos.TYPE" />

    <footer>
      <div class="footer-btn" :class="{ 'active': allRight}" v-safeClick="{fn: createPolicy}" click-tag="立即投保">立即投保</div>
    </footer>

    <captcha ref="captcha" :captchaVisiable="captchaVisiable" :captchaImg="captchaImg" @createCaptcha="createCaptcha"
      @sendSmsCode="sendSmsCode" @closeCaptcha="captchaVisiable = false"></captcha>
  </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>