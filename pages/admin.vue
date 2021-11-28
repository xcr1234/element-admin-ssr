<template>
  <div>
    <h1 style="padding: 32px">这个页面只有管理员能看到</h1>
    <!--以下为表格查询示例-->
    <el-table :data="list">
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="姓名" prop="cnName"></el-table-column>
      <el-table-column label="手机号" prop="mobile"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import role from "~/middleware/role";

export default {
  middleware: role('admin'),
  layout: 'layout',
  async asyncData({$axios}){
    const list = await $axios.$get('/api/user/list')
    return {
      list
    }
  },
  data(){
    return {
      list: []
    }
  }
}
</script>
