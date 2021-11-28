<template>
  <div class="sidebar-container has-logo" :class="{'collapse':!sideBarOpen}" >
    <div class="sidebar-logo-container">
      <a href="javascript:void(0);" class="sidebar-logo-link router-link-active">
        <img src="/nuxt.png" class="sidebar-logo" style="margin-right: 0">
        <h1 class="sidebar-title" v-if="sideBarOpen || mobile">Vue Element Admin </h1>
      </a>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="!sideBarOpen && !mobile"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <side-bar-item v-for="route in menus" :key="route.path" :item="route" :base-path="route.path"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import variables from '@/styles/variables.less'
import SideBarItem from './sidebar/SideBarItem'
import {mapState} from "vuex";

export default {
  name: "SideBar",
  components:{SideBarItem},
  props:{
    mobile:Boolean
  },
  computed:{
    ...mapState('app',['sideBarOpen','menus']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
  },
  data(){
    return {
      variables
    }
  }
}
</script>

<style>
.el-menu--collapse .el-submenu>.el-submenu__title>span {
  visibility: hidden;
}
</style>

<style lang="less" scoped>

.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}

</style>
