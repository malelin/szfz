<template>
  <div id="app">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="stylus">
#app
  overflow hidden
  min-width 1366px
  width 100%
  height 100%
  color #2c3e50
  font-family 'Microsoft YaHei', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
</style>
