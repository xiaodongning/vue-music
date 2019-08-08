<!-- palyer -->
<template>
  <div class="player" v-show="playlist.length>0">
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen">
        <div class="bg-wrapper">
          <div class="bg" :style="bgImage"></div>
        </div>
        <div class="top">
          <div class="back" @click="back">
            <svg-icon icon-class="back" class="icon" />
          </div>
          <h1 class="title">{{currentSong.name}}</h1>
          <h2 class="subtitle f-thide">{{currentSong.singer}}</h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper">
              <div class="cd" :class="playCls">
                <img :src="currentSong.image" class="image"> </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChangeEnd="onPercentChange"></progress-bar>
            </div>
            <span class="time time-r">{{format(duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left" @click="changeMode">
              <svg-icon :icon-class="iconMode"></svg-icon>
            </div>
            <div class="icon i-left" @click="prev">
              <svg-icon icon-class="btn-prev"></svg-icon>
            </div>
            <div class="icon i-center" @click.stop="togglePlay">
              <svg-icon :icon-class="playBtn"></svg-icon>
            </div>
            <div class="icon i-right" @click="next">
              <svg-icon icon-class="btn-next"></svg-icon>
            </div>
            <div class="icon i-right">
              <svg-icon icon-class="btn-fav"></svg-icon>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="al play" :class="playCls">
          <img :src="currentSong.image" width="40" height="40">
        </div>
        <div class="text">
          <h2 class="song-name">{{currentSong.name}}</h2>
          <div class="song-singer">{{currentSong.singer}}</div>
        </div>
        <div class="control play" @click.stop="togglePlay">
          <progress-circle :radius="radius" :percent="percent">
            <svg-icon :icon-class="playBtn" class="mini-play"></svg-icon>
          </progress-circle>
        </div>
        <div class="control menu">
          <svg-icon icon-class="btn-menu"></svg-icon>
        </div>
      </div>
    </transition>
    <audio ref="audio" autoplay @play="ready" @error="error" @timeupdate="updateTime"></audio>
  </div>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { getSong, getLyric } from '@/api/song'
  import { shuffle } from '@/common/js/util'
  import ProgressBar from '@/base/progress-bar'
  import ProgressCircle from '@/base/progress-circle'
  export default {
    components: {
      ProgressBar,
      ProgressCircle
    },
    data() {
      return {
        songReady: false,
        currentTime: 0,
        duration: 0,
        radius: 30,
        url: ''
      }
    },
    computed: {
      bgImage() {
        return `background-image:url(${this.currentSong.image})`
      },
      playBtn() {
        return this.playing ? 'btn-pause' : 'btn-play'
      },
      playCls() {
        return this.playing ? 'play' : 'play pause'
      },
      percent() {
        return this.currentTime / this.duration
      },
      iconMode() {
        return this.mode === 0 ? 'btn-circle' : this.mode === 1 ? 'btn-loop' : 'btn-random'
      },
      ...mapGetters([
        'currentIndex',
        'sequenceList',
        'fullScreen',
        'playing',
        'currentSong',
        'mode',
        'playlist'
      ])
    },
    methods: {
      changeMode() {
        const mode = (this.mode + 1) % 3
        this.setPlayMode(mode)
        let list = null
        if (mode === 2) {
          list = shuffle(this.sequenceList)
        } else {
          list = this.sequenceList
        }
        this.resetCurrentIndex(list)
        this.setPlaylist(list)
      },
      resetCurrentIndex(list) {
        const index = list.findIndex((item) => {
          return item.id === this.currentSong.id
        })
        this.setCurrentIndex(index)
      },
      onPercentChange(percent) {
        this.currentTime = this.duration * percent
        this.$refs.audio.currentTime = this.currentTime
      },
      back() {
        this.setFullScreen(false)
      },
      open() {
        this.setFullScreen(true)
      },
      prev() {
        if (!this.songReady) {
          return
        }
        let index = this.currentIndex - 1
        if (index < 0) {
          index = this.playlist.length - 1
        }
        this.setCurrentIndex(index)
        this.songReady = false
      },
      next() {
        if (!this.songReady) {
          return
        }
        let index = this.currentIndex + 1
        if (index > this.playlist.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        this.songReady = false
      },
      ready() { // audio de play事件
        this.songReady = true
      },
      error() {
        this.songReady = true
      },
      updateTime(e) {
        this.currentTime = e.target.currentTime
      },
      format(time) {
        time = time | 0
        const minute = time / 60 | 0
        const second = this._pad(time % 60)
        return `${minute}:${second}`
      },
      _pad(num, n = 2) {
        let len = num.toString().length
        while (len < 2) {
          num = '0' + num
          len++
        }
        return num
      },
      togglePlay() {
        this.setPlayingState(!this.playing)
      },
      _getSong(id) {
        getSong({ id: id }).then((res) => {
          this.url = res.data[0].url
        }).catch((err) => {
          console.log(err)
        })
      },
      _getLyric(id) {
        getLyric({ id: id }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlayingState: 'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setPlayMode: 'SET_PLAY_MODE',
        setPlaylist: 'SET_PLAYLIST'
      })
    },
    watch: {
      playing(newPlaying) {
        const audio = this.$refs.audio
        this.$nextTick(() => {
          newPlaying ? audio.play() : audio.pause()
        })
      },
      currentSong(newVal, oldVal) {
        if (!newVal.id) {
          return
        }
        if (newVal.id === oldVal.id) {
          return
        }
        this.$refs.audio.pause()
        this.$refs.audio.currentTime = 0
        this._getSong(newVal.id)
      },
      url(newUrl) {
        this._getLyric(this.currentSong.id)
        this.$refs.audio.src = newUrl
        const stop = setInterval(() => {
          this.duration = this.$refs.audio.duration
          if (this.duration) {
            clearInterval(stop)
          }
        }, 150)
      }
    }
  }
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
  .player {
    .normal-player {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 100;
      .bg-wrapper {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #f2f3f4;
        .bg {
          background-size: auto 100%;
          background-position: 50%;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          filter: blur(10px);
          transition: all 0.3s linear;
          transform: scale(1.5);
          transform-origin: center top;
          z-index: 1;
          &::after {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.5);
            content: " ";
          }
        }
      }
      .top {
        z-index: 9999;
        position: absolute;
        width: 100%;
        line-height: 44px;
        color: #fff;
        .back {
          position: absolute;
          padding: 0 12px;
          .icon {
            transform: rotate(-90deg);
            font-size: 22px;
            vertical-align: -0.25em;
          }
        }
        .title {
          font-size: 18px;
          width: 70%;
          line-height: 20px;
          padding-top: 10px;
          margin: 0 auto;
          text-align: center;
          font-weight: 700;
        }
        .subtitle {
          margin:2px 26px;
          height:28px;
          font-size: 12px;
          line-height: normal;
          text-align: center;
        }
      }
      .middle {
        position: fixed;
        z-index: 2;
        width: 100%;
        top: 80px;
        bottom: 170px;
        display: flex;
        align-items: center;
        .middle-l {
          display: inline-block;
          position: relative;
          width: 100%;
          padding-top: 80%;
          .cd-wrapper {
            position: absolute;
            left: 10%;
            top: 0;
            width: 80%;
            height: 100%;
            .cd {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              box-sizing: border-box;
              border: 15px solid rgba(255, 255, 255, 0.1);
              &.play{
                animation: circle 20s linear infinite alternate forwards;
              }
              &.pause{
                animation-play-state: paused;
              }
              .image {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
          }
        }
      }
      .bottom{
        position: absolute;
        z-index: 3;
        bottom: 50px;
        width: 100%;
        .progress-wrapper{
          display: flex;
          width:80%;
          margin:0 auto;
          padding:10px 0;
          .progress-bar-wrapper{
            flex:1;
          }
          .time{
            color:#fff;
            font-size:12px;
            flex:0 0 30px;
            line-height: 30px;
          }
          .time-r{
            text-align: right;
          }
        }
        .operators{
          display: flex;
          align-items: center;
          .icon{
            flex:1;
            color:#fff;
            font-size:26px;
            &.i-left {
              text-align: right;
            }
            &.i-center{
              padding:0 20px;
              text-align: center;
              font-size:38px;
            }
            &.i-right {
              text-align: left;
            }
          }

        }
      }
    }
    .mini-player{
      display: flex;
      align-items: center;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 180;
      width: 100%;
      height: 60px;
      background: rgba(255, 255, 255, 0.85);
      .al{
        flex:0 0 40px;
        width:40px;
        margin:0 10px 0 20px;
        &.play{
            animation: circle 20s linear infinite;
        }
        &.pause{
          animation-play-state: paused;
        }
        img{
          border-radius: 50%;
        }
      }
      .text{
        padding:6px 0;
        flex:1;
        .song-name{
          font-size:14px;
        }
        .song-singer{
          font-size:12px;
        }
      }
      .control{
        flex:0 0 30px;
        width:30px;
        margin:0 10px;
        &.menu{
          font-size:30px;
        }
        &.play{
          font-size:30px;

        }
        .mini-play{
          z-index: 0;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }
  }
  .normal-enter-active,.normal-leave-active{
    transition:all .4s;
    .top,.bottom{
      transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
    }
  }
  .normal-enter,.normal-leave-to{
    opacity: 0;
    .top{
      transform: translate3d(0,-100px,0);
    }
    .bottom{
      transform: translate3d(0,100px,0);
    }
  }
  .mini-enter-active,.mini-leave-active{
    transition: all .4s;
  }
  .mini-enter,.mini-leave-to{
    opacity:0;
  }
  @keyframes circle{
    from{
      transform: rotate(0deg)
    }
    to{
      transform: rotate(360deg)
    }
  }
</style>
