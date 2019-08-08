<!--  -->
<template>
  <transition name="slide">
    <music-list :data="songs" :title="title" :bg="picUrl" @select="selectItem"></music-list>
  </transition>
</template>
<script>
  // import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import MusicList from '@/components/music-list'
  import { getSingerSong } from '@/api/singer'
  import { createSong } from '@/common/js/song'
  export default {
    components: {
      MusicList
    },
    data() {
      return {
        songs: [],
        singer: null,
        title: '',
        picUrl: ''
      }
    },
    // computed: {
    //    ...mapGetters(['singer'])
    // },
    created() {
      this._getSingerSong()
    },
    methods: {
      selectItem(item, index) {
        console.log('item', item)
        this.selectPlay({
          list: this.songs, // 此处传入了整个列表
          index
        })
      },
      _getSingerSong() {
        getSingerSong({ id: this.$route.params.id }).then((res) => {
          this.singer = res.artist
          this.title = this.singer.name
          this.picUrl = this.singer.picUrl
          this.songs = this._normalizeSongs(res.hotSongs)
        })
      },
      _normalizeSongs(arr) {
        const ret = []
        arr.forEach(element => {
          ret.push(createSong(element))
        })
        return ret
      },
      ...mapActions([
        'selectPlay'
      ])
    }
  }
</script>
<style rel='stylesheet/scss' lang='scss' scoped>


  .slide-enter-active,
  .slide-leave-active {
    transition: all .3s;
  }

  .slide-enter,
  .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
