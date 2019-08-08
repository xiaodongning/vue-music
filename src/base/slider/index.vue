<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index}"  v-for="(item,index) in dots" :key="index" ></span>
    </div>
  </div>
</template>
<script>
import { addClass } from '@/common/js/dom'
import BetterScroll from 'better-scroll'
export default {
  name: 'slider',
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  data() {
    return {
      currentPageIndex: 0,
      dots: []
    }
  },
  mounted() {
    setTimeout(() => {
      this._setWidth()
      this._initDots()
      this._initSlider()
      this._onScrollEnd()
    }, 20)
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return true
      }
      this._setWidth(true)
      this.slider.refresh()
    })
  },
  methods: {
    _setWidth(isResize) {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      const sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _onScrollEnd() {
      const pageIndex = this.slider.getCurrentPage().pageX
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        this._play()
      }
    },
    _initSlider() {
      this.slider = new BetterScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        },
        snapThreshold: 0.3,
        snapSpeed: 400
      })
      this.slider.on('scrollEnd', this._onScrollEnd)
    },
    _play() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval)
    }
  }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
@import "../../common/styles/variable";
.slider{
  min-height:1px;
  overflow: hidden;
  position: relative;
  .slider-group{
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-item{
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      a{
        display: block;
        width:100%;
        overflow: hidden;
      }
      img{
        width: 100%;
        display: block;
      }
    }
  }
  .dots{
    text-align:center;
    position: absolute;
    left:0;
    right:0;
    bottom:5px;
    .dot{
      display: inline-block;
      border-radius: 50%;
      width:8px;
      height:8px;
      margin:0 4px;
      background:$white;
    }
    .active{
        width:20px;
        border-radius: 5px;
        background:$red;
    }
  }
}
</style>
