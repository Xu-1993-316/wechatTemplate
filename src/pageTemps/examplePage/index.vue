<template>
  <div id="page" class="page">
    <infinite-box :downRefresh="refresh"
                  :upLoading="refresh"
                  :bottomReachedMethod='bottomReachedMethod'
                  :noData='noData'>
      <ul slot='content'>
        <li style="height:80px;"
            v-for="item in dataList"
            :key="item">{{ item }}</li>
      </ul>
    </infinite-box>
    <main>
      <ul @click="switchTo('sub')">
        <li v-for="item in dataList" :key="item">{{ item }}</li>
      </ul>
    </main>
  </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>
<style>
    .imgbox {
        width: 100%;
        height: 100%;
        margin-bottom: 300px;
    }
    
    img {
        display: block;
    }
    
    .bgtest {
        height: 300px;
        width: 300px;
    }
</style>