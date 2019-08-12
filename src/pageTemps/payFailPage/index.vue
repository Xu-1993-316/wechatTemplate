<template>
  <div class="page">
    <div class="img-container">
      <img src="../../assets/image/payfail.png" alt="" class="icon">
    </div>
    <div class="result">支付失败</div>
    <div class="desc">
  <p>由于不知名的原因，您的订单支付失败</p> 
  <p>您可以在微信公众号“<span style="color:#ff8b13">民生健康95596</span>”中的“保单查</p>
  <p>询”里面查询您的保单并完成支付</p>
    </div>
    <div class="btn defBtn" @click="toQuery">去详情页支付</div>
    <div class="btn backWechatBtn" @click="backWechat">返回公众号</div>
  </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>