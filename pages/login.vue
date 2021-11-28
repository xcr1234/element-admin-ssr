<template>
  <div class="login-container">
    <el-form :model="ruleForm2" :rules="rules2"
             @submit.native.prevent
             status-icon
             ref="ruleForm2"
             label-position="left"
             label-width="0px"
             class="demo-ruleForm login-page">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text"
                  v-model="ruleForm2.username"
                  placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  v-model="ruleForm2.password"
                  placeholder="密码"
        ></el-input>
      </el-form-item>
      <!--      <el-checkbox-->
      <!--        v-model="checked"-->
      <!--        class="rememberme"-->
      <!--      >记住密码</el-checkbox>-->
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" native-type="submit" @click="handleSubmit" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  data(){
    return {
      logining: false,
      ruleForm2: {
        username: '',
        password: '',
      },
      rules2: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
      },
      checked: false
    }
  },
  mounted() {
    if(this.$route.query.fail === 'role'){
      this.$message.error('你没有权限访问此页面！')
    }
  },
  methods: {
    ...mapMutations('user',['setUser','setRoles']),
    ...mapMutations('app',['calcUserMenus']),
    handleSubmit(){
      this.$refs.ruleForm2.validate(async (valid) => {
        if (valid) {
          const data = await this.$axios.$post('/api/user/login',{
            username: this.ruleForm2.username,
            password: this.ruleForm2.password
          })
          if(data.ok){
            const roles = data.data.roles || []
            this.calcUserMenus(
              {
                menus:this.$rootConfig.menus,
                roles
              })
            this.setUser(data.data)
            this.setRoles(roles)
            this.$router.push('/')
          }else{
            this.$message.error('登录失败：' + data.msg);
          }
        }
      })
    }
  }
};
</script>

<style>
.login-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>
