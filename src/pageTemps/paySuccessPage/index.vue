<template>
  <div class="page">
    <div class="img-container">
      <img src="../../assets/image/paysuccess.png" alt="" class="icon">
    </div>
    <div class="result">支付成功</div>
    <div class="desc">
      <!-- 我们会尽快完成您的投保信息审核，您可以在订单查询页面查询您的订单状态。 -->
      <!-- <p>我们会尽快完成您的投保信息审核</p> -->
      <p>您可以在微信公众号“<span style="color:#ff8b13;text-decoration: none;">民生健康95596</span>”中的“保单查询”里面查询您的保单详情</p>

    </div>
    <div class="btn defBtn" @click="toQuery">获取电子保单</div>
    <div class="btn backWechatBtn" @click="backWechat">返回公众号</div>
  </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>