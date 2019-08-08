<template>
  <h2>
    <slot></slot>
  </h2>
</template>
<script>
  export default {
    name: 'x-cate'
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../common/styles/variable";
h2 {
  font-size: 16px;
  border-left: 3px solid $red;
  margin:15px auto;
}
</style>
