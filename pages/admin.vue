<template>
  <h1 style="padding: 32px">这个页面只有管理员能看到</h1>
</template>

<script>
import role from "~/middleware/role";

export default {
  middleware: role('admin'),
  layout: 'layout'
}
</script>
