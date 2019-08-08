<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-link">排行</span>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'tab',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../common/styles/variable";
.tab{
  display: flex;
  background: $red;
  height: 44px;
  line-height: 44px;
  .tab-item{
    flex:1;
    text-align: center;
    font-size: $font-size-normal;
    color:$white-l;
    .tab-link{
      padding-bottom:4px;
    }
  }
  .router-link-active{
    .tab-link{
      border-bottom:2px solid #fff;
    }
  }
}
</style>
