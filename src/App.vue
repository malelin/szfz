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
  width 100%
  height 100%
  color #2c3e50
  font-family 'Microsoft YaHei', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
</style>
