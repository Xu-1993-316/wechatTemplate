<template>
  <div class="page">
    <div class="content_box">
      <div class="content">
        <h2>{{message}}</h2>
        <button v-safeClick="{fn: toSub, params: {name:message}}">第二页</button>
        <button @click="toThird">第三页</button>
      </div>
    </div>
    <div class="bottom_box"></div>
  </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>
