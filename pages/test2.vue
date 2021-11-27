<template>
  <h1 style="padding: 32px">测试页面2</h1>
</template>

<script>
export default {
  layout: 'layout',
  middleware: 'auth',
  mounted() {
    console.log('mount test2')
  }
}
</script>
