<template>
  <div id="app">
    <x-header></x-header>
    <tab></tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <player></player>
  </div>
</template>
<script>
  import XHeader from '@/components/x-header'
  import Tab from '@/components/tab'
  import Player from '@/components/Player'
  export default {
    name: 'App',
    components: {
      Player,
      XHeader,
      Tab
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
@import "./common/styles/variable";

  .scroll-container {
    background: #fff;
  }
</style>
