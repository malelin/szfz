<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="stylus">
html, body
  width 100%
  height 100%

#app
  color #2c3e50
  text-align center
  font-family 'Microsoft YaHei', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
</style>
