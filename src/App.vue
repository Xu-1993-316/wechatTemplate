<template>
  <div id="app">
    <transition :name="animation">
      <router-view class="page_container"
                   comp-type="page"></router-view>
    </transition>
    <!-- 两个固定埋点 -->
    <input type="hidden"
           input-tag="main_source"
           value="wechat">
    <input type="hidden"
           input-tag="project_name"
           value="test" />
  </div>
</template>
<script>
export default {
  name: "app",
  data: function () {
    return {
      animation: "fade"
    };
  }
};
</script>
<style></style>
