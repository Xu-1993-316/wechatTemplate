<template>
  <div class="page">
    <p class="moreDet">更多详情，请阅读
      <span @click="toXuzhi">《投保须知》</span> 和
      <span @click="toProvision">《保险条款》</span>
    </p>

    <div class="Insured">
      <p class="title">请选择被保人信息</p>
      <p class="t1">被保人有无社保
        <switch-group
          :labelarr="labelarr.shebao"
          v-model="userCheckInfo.hasShebao"
          @input="triggerSwitch"
        />
      </p>
      <p class="t2">被保人出生日期
        <birtyday-selector
          v-model="userCheckInfo.birthDate"
          ref="birthCheck"
          @input="triggerSwitch"
        ></birtyday-selector>
      </p>
    </div>

    <!-- <div id="copy-content">
      点击复制号码<span id="phone">{{phone}}</span>
    </div> -->
    <textarea id="phone" v-model="phone"></textarea>
    <!-- <input type="text" v-model="phone" id="phone"> -->
    <input type="button" value="复制" v-copy-target="'#phone'">
    <div id="name">Logan</div>
    <input type="button" value="复制" v-copy-target="'#name'">
    
    
    <footer>
      <div class="footer-left-content">
        <div class="footer-kefu" @click="televent">
          <a href="tel:95596">客服</a>
        </div>
        <div class="footer-amounts">
          <span>￥</span>
          {{totalPayment}}
          <span style="color: #117EFF;">起</span>
        </div>
      </div>
      <div class="footer-right-btn" @click="toInform">立即投保</div>
    </footer>
  </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>