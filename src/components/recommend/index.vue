<template>
  <div class="recommend">
    <scroll class="recommend-content" ref="scroll" :data="album">
      <div class="scroll-container">
        <div v-if="banner.length" class="slider-wrapper" ref="sliderWrapper">
          <slider class="banner">
            <div v-for="(item,index) in banner" :key="index">
              <a href="">
                <img @load="loadImage" :src="item.picUrl" alt=""> </a>
            </div>
          </slider>
        </div>
        <div class="wrapper-recommend">
          <x-cate>最新音乐</x-cate>
          <div class="remd_songs">
            <div class="remd_ul">
              <router-link v-for="(item,index) in album" :key="index" class="remd_li" :to="{name:'playList',params:{id:item.id}}">
                <div class="remd_img">
                  <img class="lazy-img-fadein" v-lazy="item.picUrl" :alt="item.name">
                  <span class="u-earp remd_num">
                    <svg-icon icon-class="music" class="icon" />{{item.trackCount}}万</span>
                </div>
                <p class="remd_text">{{item.name}}</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="loading-container" v-show="!album.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>
<script>
  import { getBanner, getRecommend } from '@/api/recommend'
  import Slider from '@/base/slider'
  import XCate from '@/base/x-cate'
  import Scroll from '@/base/scroll'
  import Loading from '@/base/loading'
  export default {
    name: 'recommend',
    components: {
      Slider,
      XCate,
      Scroll,
      Loading
    },
    data() {
      return {
        banner: [],
        album: []
      }
    },
    created() {
      this._getBanner()
      this._getRecommend()
    },
    methods: {
      _getBanner() {
        getBanner().then(res => {
          this.banner = res.banners.slice(0, 6)
        })
      },
      _getRecommend() {
        getRecommend().then(res => {
          this.album = res.result
          console.log(res)
        })
      },
      loadImage() {
        if (!this.cache) {
          this.$refs.scroll.refresh()
          this.cache = true
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../common/styles/variable";
  .recommend{
    position: fixed;
    width:100%;
    top:88px;
    bottom:0;
    .recommend-content{
      height:100%;
      overflow: hidden;
      background: linear-gradient(to bottom, $red 36%, #ffffff 36%);
    }
  }
  .slider-wrapper {
    padding-top: 10px;
    background: linear-gradient(to bottom, $red 82%, #ffffff 80%);
    overflow: hidden;
  }

  .banner {
    overflow: hidden;
    margin: 0 10px;
    a {
      border-radius: 5px;
    }
    img {
      width: 100%;
    }
  }

  .wrapper-recommend {
    padding: 10px;
  }

  .album-name {
    font-size: 13px;
    line-height: 1.2;
    padding: 6px 2px 0 6px;
    &:first-of-type {
      color: #222;
    }
  }

  .remd_ul {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    padding: 0;
  }

  .remd_li {
    width: 33.3%;
    padding-right: 2px;
    margin-bottom: 15px;
  }

  .remd_img {
    position: relative;
    &::before{
      content: '';
      display: block;
      top:0;
      width:100%;
      padding-top:100%;
    }
  }

  .remd_img img {
    position: absolute;
    top:0;
    left: 0;
    display: block;
    width: 100%;
    height:100%;
    border-radius: 3px;
  }

  .remd_num {
    position: absolute;
    right: 5px;
    top: 2px;
    font-size: 12px;
    color: #fff;
    text-shadow: 1px 0 0 rgba(0, 0, 0, .15);
    z-index: 2;
    padding-left: 15px;
    background-size: 11px 10px;
    background-repeat: no-repeat;
    background-position: 0 4px;
  }

  .remd_img:after {
    content: ' ';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 20px;
    background-image: linear-gradient(180deg, rgba(0, 0, 0, .2), transparent);
  }

  .remd_text {
    display: -webkit-box;
    font-size: 13px;
    line-height: 1.2;
    padding: 6px 2px 0 6px;
    height:36px;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .icon {
    margin-right: 8px;
  }
  .loading-container{
    position: absolute;
    width:100%;
    top:50%;
    transform: translateY(-50%)
  }
</style>
