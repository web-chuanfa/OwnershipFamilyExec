<template>
  <div class="container" id="app">
      <router-view></router-view>
    </div>
</template>
<script>
import './assets/js/fontSize.js';
export default {
  name:"app"
}
</script>
<style scoped>
  .container{width:100%;height:100%;}
</style>