<template>
  <div id="app">
    <transition :name="animation">
      <router-view class="page-container" comp-type="page"></router-view>
    </transition>
    <!-- 两个固定埋点 -->
    <input type="hidden" input-tag="main_source" value="wechat">
    <input type="hidden" input-tag="project_name" value="test" />
  </div>
</template>
<script>
export default {
  name: "app",
  data: function() {
    return {
      animation: "fade"
    };
  }
};
</script>
<style>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  font-family: Arial;
}

html,
body {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
#app {
  position: relative;
  height: 100%;
  width: 100%;
  /* overflow: scroll;
  -webkit-overflow-scrolling: touch */
}

.page > main{
  height: 100%;
  overflow: scroll;
}
</style>
