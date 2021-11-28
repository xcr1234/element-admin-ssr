<template>
  <div class="navbar">
    <div id="hamburger-container" class="hamburger-container" @click="toggleSideBar">
      <hamburger/>
    </div>
    <div class="el-breadcrumb app-breadcrumb breadcrumb-container" id="breadcrumb-container">
      <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item v-for="item in breadcrumb" :key="item.path">
            <nuxt-link v-if="hasLength(item.path)" :to="item.path">{{item.meta.title}}</nuxt-link>
            <span v-else class="no-redirect">{{item.meta.title}}</span>
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>
    <div class="right-menu">

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click" @command="handleCommand">
        <div class="avatar-wrapper">
          <img src="/nuxt.png" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="home">首页</el-dropdown-item>
          <el-dropdown-item command="project">项目地址</el-dropdown-item>
          <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import Hamburger from './Hamburger'
import { mapState,mapMutations } from 'vuex'
export default {
  name: 'NavBar',
  components:{Hamburger},
  computed:{
    ...mapState('app',['breadcrumb'])
  },
  methods:{
    ...mapMutations('app',['toggleSideBar','clearTag']),
    ...mapMutations('user',['logOut']),
    hasLength(obj){
      return obj && obj.length
    },
    doLogOut(){
      this.$axios.$get('/api/user/logout')
      this.logOut()
      this.clearTag()
      this.$router.push('/login')
    },
    handleCommand(command) {
      if(command === 'logout'){
        this.doLogOut()
      }
      if(command === 'home'){
        this.$router.push('/')
      }
      if(command === 'project'){
        window.open('https://gitee.com/ironV/element-express')
      }
    }
  }
}
</script>


<style lang="less" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }


  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>


<style lang="less" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>

