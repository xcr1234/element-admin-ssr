<template>
  <div id="app" class="app-wrapper" :class="sideBarOpen ? '' : 'hideSidebar'">
    <side-bar class="sidebar-container" ref="sideBar" @click.native.stop :mobile="mobile" :style="{
      width: sideBarOpen ?
      mobile ? '' : ''
      :
      mobile ? '0px !important' : '54px !important',
   //   display : mobile && !sideBarOpen ? 'none': ''
}"/>
    <div class="main-container" :style="{
      marginLeft: mobile ? '0px' : (sideBarOpen ? '' : '54px'),
    }">
      <div>
        <nav-bar/>
        <tags-view @close="closeTag"/>
      </div>
      <section class="app-main">
        <transition name="fade-transform" mode="out-in">
          <nuxt keep-alive ref="nuxt" :keep-alive-props="{exclude: excludeCaches}"/>
        </transition>
      </section>
    </div>
  </div>
</template>

<script>
import SideBar from '../layout-components/SideBar'
import NavBar from '../layout-components/NavBar'
import TagsView from '../layout-components/TagsView'
import {destroyKeepalive, isMobile, matchPathMenu} from '~/layout-components/utils'
import {mapMutations, mapState} from 'vuex'


export default {
  name: "Layout",
  components: {
    SideBar,
    NavBar,
    TagsView
  },
  computed: {
    ...mapState('app', ['excludeCaches', 'tags', 'sideBarOpen']),
  },
  data() {
    return {
      mobile: process.client ? isMobile() : false
    }
  },
  mounted() {

  },
  methods: {
    ...mapMutations('app', ['updateBreadcrumb', 'addTag', 'setExcludeCache', 'removeTag','toggleSideBar']),
    closeTag({tag, index}) {
      if (tag.path === this.$rootConfig.dashBoardMenu.path) {
        //不允许关闭首页标签
        return
      }
      const path = tag.path
      const keepalive = this.$refs.nuxt.$children[0].$vnode.parent
      destroyKeepalive(keepalive, path)

      const activeTag = this.getIndexOfActiveTag()
      const left = this.tags[index - 1]
      this.removeTag(index)
      if (index === activeTag) {
        //删除正在活动的标签，左移一个
        this.$router.push(left.path)
      }
    },
    getIndexOfActiveTag() {
      for (let i = 0; i < this.tags.length; i++) {
        const tag = this.tags[i]
        if (this.$route.path === tag.path) {
          return i
        }
      }
      return -1
    },
  },
  created() {
    if (process.client) {

      if(this.mobile){
        this.toggleSideBar()
        document.body.addEventListener('click',(e) => {
          if(this.sideBarOpen && e.clientX > 210){
            this.toggleSideBar()
          }
        })
      }

      this.addTag({...this.$rootConfig.dashBoardMenu})
      this.setExcludeCache([...this.$rootConfig.notCacheMenus])

      this.$watch('$route', (val) => {
        const matched = matchPathMenu(this.$rootConfig.menus, val.path)

        if (matched[0].path !== this.$rootConfig.dashBoardMenu.path) {
          matched.unshift({...this.$rootConfig.dashBoardMenu})
        }

        const tag = matched[matched.length - 1]


        this.updateBreadcrumb(matched.filter(item => item.meta && item.meta.title))
        this.addTag(tag)


      }, {
        immediate: true
      })

    }
  },
}
</script>


<style lang="less">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
