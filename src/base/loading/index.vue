<template>
  <div class="loading">
    <img width="50" height="50" src="./loading.svg">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../common/styles/variable";
  .loading{
    width: 100%;
    text-align: center;
    .desc{
      line-height: 20px;
      font-size: $font-size-small;
      color: $white-l;
    }
  }
</style>
