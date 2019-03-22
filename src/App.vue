<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <div class="center-box">
      <div class="center-wrap">
        <div class="center-content">
          <!-- 任意内容 -->
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>
<style lang="stylus">
#app
  color #2c3e50
  text-align center
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale

#nav
  padding 30px

  a
    color #2c3e50
    font-weight bold

    &.router-link-exact-active
      color #42b983
</style>
