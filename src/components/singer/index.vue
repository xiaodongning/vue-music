<template>
  <div class="singer">
    <listview :data="singers" @select="selectItem"></listview>
    <router-view></router-view>
  </div>
</template>
<script>
import { getSinger } from '@/api/singer'
import Listview from '@/base/listview'
import { mapMutations } from 'vuex'
const pinyin = require('pinyin')
export default {
  name: 'rank',
  components: {
    Listview
  },
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSinger()
  },
  methods: {
    selectItem(item) {
      this.$router.push({
        name: 'detail',
        params: { id: item.id }
      })
      this.setSinger(item)
    },
    _getSinger() {
      getSinger({ limit: 100 }).then((res) => {
        const list = res.artists
        list.map((item) => {
          const indexCase = pinyin(item.name[0], {
            style: pinyin.STYLE_FIRST_LETTER
          })
          item.index = indexCase[0][0].toUpperCase()
        })
        this.singers = this._nomalizeSinger(list)
      })
    },
    _nomalizeSinger(list) {
      const map = {
        hot: {
          title: '热门',
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < 7) {
          map.hot.items.push(item)
        } else {
          const key = item.index
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(item)
        }
      })
      const hot = []
      const ret = []
      for (const key in map) {
        const val = map[key]
        if (val.title.match(/[A-Z]/)) {
          ret.push(val)
        } else {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../common/styles/variable";
.singer{
  width:100%;
  position: absolute;
  top:88px;
  bottom:0;
}
</style>
