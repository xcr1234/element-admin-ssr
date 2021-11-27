<template>
  <h1 style="padding: 32px">hello {{user? user.cnName : ''}}</h1>
</template>

<script>
import {mapState} from "vuex";

export default {
  layout: 'layout',
  middleware: 'auth',
  computed:{
    ...mapState('user',['user'])
  },
  mounted() {
    console.log('mount index')
  }
}
</script>
