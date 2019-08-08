<!--  -->
<template>
  <scroll
  class="listview"
  ref="listview"
  @scroll="scroll"
  :listen-scroll="listenScroll"
  :data="data"
  :probe-type="probeType"
  >
    <ul>
      <li v-for="(item,index) in data" :key="index" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{item.title}}</h2>
        <ul>
          <li class="list-group-item" v-for="(i,d) in item.items" :key="d" @click="selectItem(i)">
            <img class="avatar" v-lazy="i.img1v1Url" alt="">
            <span class="name">{{i.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li class="item" :class="{'active':currentIndex === index}" v-for="(item,index) in shortcutList" :key="index" :data-index="index">{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}} </div>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>
<script>
  import Scroll from '@/base/scroll'
  import { getData } from '@/common/js/dom'
  import Loading from '@/base/loading'
  export default {
    components: {
      Scroll,
      Loading
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        scrollY: -1,
        currentIndex: 0,
        diff: -1
      }
    },
    computed: {
      shortcutList() {
        return this.data.map((item) => {
          return item.title.substr(0, 1)
        })
      },
      fixedTitle() {
        if (this.scrollY > 0) return ''
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
      this.touch = {}
      this.listHeight = []
    },
    methods: {
      selectItem(item) {
        this.$emit('select', item)
      },
      onShortcutTouchStart(e) {
        const achorIndex = getData(e.target, 'index')
        const firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = achorIndex
        this._scrollTo(achorIndex)
      },
      onShortcutTouchMove(e) {
        const firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        const delta = (this.touch.y2 - this.touch.y1) / 20 | 0
        const anchorIndex = parseInt(this.touch.anchorIndex) + delta
        console.log(anchorIndex)
        this._scrollTo(anchorIndex)
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      _calculateHeight() {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          const item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      _scrollTo(index) {
        if (!index && index !== 0) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        this.scrollY = -this.listHeight[index]
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      scrollY(newY) {
        const listHeight = this.listHeight
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        for (let i = 0; i < listHeight.length - 1; i++) {
          const height1 = listHeight[i]
          const height2 = listHeight[i + 1]
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            this.diff = height2 + newY
            return
          }
        }
        this.currentIndex = listHeight - 2
      },
      diff(newVal) {
        const fixedTop = (newVal > 0 && newVal < 14) ? newVal - 14 : 0
        if (this.fixedTop === fixedTop) return
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../common/styles/variable";
  .listview {
    height: 100%;
    position: relative;
    overflow: hidden;
    background: $color-background;
    .list-fixed{
      position: absolute;
      top:0;
      left:0;
      width:100%;
      .fixed-title{
        height: 24px;
        line-height: 24px;
        text-indent: 12px;
        font-size: 12px;
        background: #bbb;
        color: #fff;
      }
    }
    .list-group {
      .list-group-title {
        height: 24px;
        line-height: 24px;
        text-indent: 12px;
        font-size: 12px;
        background: #bbb;
        color: #fff;
        margin-bottom: 10px;
      }
      .list-group-item {
        display: flex;
        align-items: center;
        padding: 5px 0;
        margin: 0 5px;
        border-bottom: 1px solid rgb(228, 228, 228);
        &:last-child {
          margin-bottom: 10px;
          border: none;
        }
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 5px;
        }
        .name {
          font-size: $font-size-normal;
          margin-left: 24px;
          color: $text-color
        }
      }
    }
    .list-shortcut {
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
      width:20px;
      text-align: center;
      z-index: 0;
      font-family: Helvetica;
      .item{
        padding:3px 5px;
        line-height: 1;
        font-size:$font-size-small;
        color:$text-color;
        opacity: .9;
      }
      .active{
        color:$red;
        text-shadow: 0 1px 0 rgba(0, 0, 0, .3);
      }
    }
  }
</style>
