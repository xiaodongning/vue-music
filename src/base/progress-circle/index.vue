<!--  -->
<template>
  <div class="progress-circle">
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray"
              :stroke-dashoffset="dashOffset"/>
    </svg>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    radius: {
      type: Number,
      default: 100
    },
    percent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dashArray: Math.PI * 100
    }
  },
  computed: {
    dashOffset() {
      return (1 - this.percent) * this.dashArray
    }
  }
}

</script>
<style rel='stylesheet/scss' lang='scss' scoped>
  .progress-circle{
    position: relative;
    z-index: 99999;
    circle{
      stroke-width:10px;
      transform-origin: center;
      &.progress-background{
        transform: scale(.9);
        stroke:rgba(225,68,57,.2);
      }
      &.progress-bar{
        transform: scale(.9) rotate(-90deg);
        stroke:rgba(225,68,57,1);
      }
    }
  }
</style>
