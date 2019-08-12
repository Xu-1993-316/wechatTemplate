<template>
  <div class="page">
    <div class="notice" input-tag="提示">
      <img src="../../assets/image/warning1.png" class="laba" />
      请确认您填写的信息正确，以免对您的保障权益造成影响。
    </div>
    <!-- 投保人信息 -->
    <div class="info-container">
      <div class="info-item-content">
        <div class="info-item">
          <div class="key">投保人</div>
          <div class="val" input-tag="投保人-姓名">{{ policyInfo && policyInfo.holderCustomer.customerName }}</div>
        </div>
        <div class="info-item">
          <div class="key">身份证</div>
          <div class="val" input-tag="投保人-证件编号">{{ policyInfo && policyInfo.holderCustomer.idNumber }}</div>
        </div>
        <div class="info-item">
          <div class="key">职业类别</div>
          <div class="val">{{ policyInfo && policyInfo.holderCustomer.parameters.JOB }}</div>
        </div>
        <div class="info-item">
          <div class="key">手机号码</div>
          <div class="val" input-tag="投保人-手机号码">{{ policyInfo && policyInfo.holderCustomer.mobile }}</div>
        </div>
        <div class="info-item">
          <div class="key">被保人</div>
          <div class="val" input-tag="被保险人-姓名">{{ policyInfo && policyInfo.beInsuredCustomers[0].customerName }}</div>
        </div>
        <div class="info-item">
          <div class="key">与投保人关系</div>
          <div class="val" input-tag="被保险人-与投保人关系">{{ policyInfo &&
            relationOpt[policyInfo.beInsuredCustomers[0].relationWithHolder] }}</div>
        </div>
        <div class="info-item" v-if="policyInfo && policyInfo.beInsuredCustomers[0].idNumber!= policyInfo.holderCustomer.idNumber">
          <div class="key">身份证</div>
          <div class="val" input-tag="被保险人-证件编号">{{ policyInfo && policyInfo.beInsuredCustomers[0].idNumber }}</div>
        </div>
        <div class="info-item">
          <div class="key">职业类别</div>
          <div class="val">{{ policyInfo && policyInfo.beInsuredCustomers[0].parameters.JOB }}</div>
        </div>
        <div class="info-item">
          <div class="key">有无社保</div>
          <div class="val" input-tag="保险信息-有无社保">{{ policyInfo &&
            policyInfo.beInsuredCustomers[0].parameters.SOCIALSECURITY == '1' ? '有' : '无'}}</div>
        </div>
      </div>
    </div>

    <div class="footer-btn" @click="confirmOrder" click-tag="确认支付">确认支付 ¥ {{app}}</div>
  </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>