<!--  -->
<template>
  <div class="music-list">
    <div class="header" ref="header">
      <div class="back" @click="back">
        <svg-icon icon-class="back" class="icon" />
      </div>
      <h1>{{title}}</h1>
    </div>
    <scroll
    :data="data"
    @scroll="scroll"
    :probe-type="probeType"
    :listenScroll="listenScroll"
    class="scroll"
    ref="list">
      <div>
        <div class="bg-image" ref="bgImage" :style="bgStyle"> </div>
        <div class="song-wrapper">
          <div class="play-all"><svg-icon icon-class="play" class="icon" />播放全部 <span> (共50首)</span></div>
          <div class="song-list">
            <div class="song-item" v-for="(item,index) in data" :key="index" @click="selectItem(item,index)">
              <div class="count">{{index+1}}</div>
              <div class="box">
                <div class="song">
                  <div class="song-title f-single">{{item.name}}</div>
                  <div class="song-singer f-single">
                    {{item.singer}}
                  </div>
                </div>
                <div class="play"><svg-icon icon-class="play" class="icon" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
import Scroll from '@/base/scroll'
export default {
  components: {
    Scroll
  },
  props: {
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    },
    bg: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      scrollY: 0
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bg})`
    }
  },
  created() {
    this.listenScroll = true
    this.probeType = 3
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight
    // this.minTranslateY = this.imageHeight + 44
    console.log(this.$refs.bgImage)
    console.log(this.$refs.list.$el) // 因为此处list是scroll组件是一个vue components组件所以要用$el获取dom
  },
  filters: {
    stringFilter(val) {
      let singers = ''
      for (const v of val) {
        singers += v.name + '/'
      }
      return singers.substr(0, singers.length - 1)
    }
  },
  methods: {
    selectItem(item, index) {
      this.$emit('select', item, index)
    },
    back() {
      this.$router.back()
    },
    scroll(pos) {
      this.scrollY = pos.y
    }
  },
  watch: {
    scrollY(newY) {
      const percent = Math.abs(newY / this.imageHeight)
      let scale = 1
      if (newY > 0) {
        scale = 1 + percent
        // this.$refs.fixed.style.position = 'fixed'
      }
      if (newY < 0) {
        this.$refs.header.style.background = `rgba(212,60,51,${percent})`
      } else {
        this.$refs.header.style.background = `rgba(212,60,51,0)`
      }
      this.$refs.bgImage.style.transform = `scale(${scale})`
    }
  }
}
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
.scroll{
  position: fixed;
  top:0;
  bottom:0;
  width:100%;
}
.music-list {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 3;
  background: #f8f8f8;
  .header {
    z-index: 9999;
    position: absolute;
    display: flex;
    width: 100%;
    line-height: 44px;
    color: #fff;
    .back {
      position: absolute;
      padding: 0 12px;
      .icon {
        font-size: 22px;
        vertical-align: -0.25em;
      }
    }
    h1 {
      // position: absolute;
      left: 38px;
      flex: 1;
      text-align: center;
    }
  }
  .bg-image {
    position: relative;
    padding-top: 70%;
    background-size: cover;
    transform-origin: center;
    transform-style: preserve-3d;
    &::after{
      content:'';
      position: absolute;
      top:0;
      bottom:0;
      left:0;
      right:0;
      background:rgba(0,0,0,.3);
    }
  }
}
.song-wrapper {
  background: #f8f8f8;
  border-radius: 12px;
  position: relative;
  top: -20px;
  .icon {
    font-size: 26px;
    vertical-align: -0.25em;
  }
  .play-all {
    padding: 12px;
    border-bottom: 1px solid rgb(228, 228, 228);
    span {
      font-size: 14px;
      color: #999;
    }
  }
  .box{
    display: flex;
    flex: 1 1 auto;
    border-bottom: 1px solid rgb(228, 228, 228);
    padding-left: 6px;
    .play{
      display: flex;
      align-items: center;
      margin-right:12px;
      .icon {
        color: #999;
      }
    }
  }
  .song-list {
    .song-item {
      display: flex;
      align-items: center;
      &:active{
        background: #666;
      }
    }
    .count {
      font-size: 16px;
      width: 38px;
      text-align: center;
      color: #999;
    }
    .song {
      width: 0;
      flex: 1 1 auto;

      // flex-direction: column;
      // justify-content: center;
      line-height: 1.5;
      padding: 6px 0;
      .song-title {
        width: 100%;
        font-size: 16px;
      }
      .song-singer {
        font-size: 12px;
        color: #999;
        width: 100%;
      }
    }
  }
}
</style>
