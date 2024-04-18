<template>
  <div id="app">
    <router-view></router-view>
   
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      show:false,
      dialogVisible: false,
        // navopen:false,
        phone: '',
      }
  },
  
}
</script>

<style  scoped lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

</style>
