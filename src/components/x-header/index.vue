<template>
  <header>
    <h1><svg-icon icon-class="netease" class="icon" />网易云音乐 </h1>
  </header>
</template>
<script>
export default {
  name: 'x-header',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../common/styles/variable";
  header {
    background: $red;
    h1 {
      font-size: $font-size-huge;
      font-weight: 500;
      height: 44px;
      line-height: 44px;
      color: #fff;
      text-align: center;
    }
  }
</style>
