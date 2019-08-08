<!-- 进度条组件 -->
<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
      @touchstart.prevent="progressTouchStart"
      @touchmove.prevent="progressTouchMove"
      @touchend.prevent="progressTouchEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.touch = {}
  },
  methods: {
    progressTouchStart(e) {
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX // 表示第一个手指的位置
      this.touch.left = this.$refs.progress.clientWidth
    },
    progressTouchMove(e) {
      if (!this.touch.initiated) return
      const deltaX = e.touches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(Math.max(0, this.touch.left + deltaX), this.$refs.progressBar.clientWidth - 16)
      this._offset(offsetWidth)
    },
    progressTouchEnd(e) {
      this.touch.initiated = false
      this._triggerPercent()
    },
    progressClick(e) {
      const rect = this.$refs.progressBar.getBoundingClientRect()
      const offsetWidth = e.pageX - rect.left
      this._offset(offsetWidth)
      this._triggerPercent()
    },
    _triggerPercent() {
      const barWidth = this.$refs.progressBar.clientWidth - 16
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit('percentChangeEnd', percent)
    },
    _offset(width) {
      this.$refs.progress.style.width = `${width}px`
      this.$refs.progressBtn.style['transform'] = `translate3d(${width}px,0,0)`
    }
  },
  watch: {
    percent(newPercent) {
      if (newPercent >= 0 && !this.touch.initiated) {
        const barWidth = this.$refs.progressBar.clientWidth - 16
        const offsetWidth = barWidth * newPercent
        this._offset(offsetWidth)
      }
    }
  }
}

</script>
<style rel='stylesheet/scss' lang='scss' scoped>
.progress-bar{
  height:30px;
  .bar-inner{
    position: relative;
    height:4px;
    top:13px;
    background:rgba(0,0,0,.3);
    box-shadow: 0 0 4px inset rgba(0,0,0,.8);
    .progress{
      position: absolute;
      height:100%;
      background:#d43c33;
    }
    .progress-btn-wrapper{
      position: absolute;
      left:-8px;
      top:-13px;
      width:30px;
      height:30px;
      .progress-btn{
        position: relative;
        top:7px;
        left:7px;
        width:16px;
        height:16px;
        border-radius: 50%;
        border:5px solid rgb(241,241,241);
        background:#d43c33;
      }
    }
  }
}
</style>
