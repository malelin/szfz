<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 布局组件,包含SiderBar,NavBar,TagsView,AppMain
 * @Date: 2019-03-27 09:45:34
 * @LastEditTime: 2019-05-05 15:30:53
 -->
<template>
  <div class="layout">
    <!-- 侧边栏 -->
    <div class="siderbar-container">
      <SiderBar class="c-siderbar animated bounceInLeft" />
    </div>
    <!-- 右侧内容 -->
    <div class="main-container">
      <NavBar class="c-nav-bar animated bounceInRight" />
      <app-main />
    </div>
  </div>
</template>

<script>
export default {
  name: "Layout",
  components: {
    NavBar: () => import("./NavBar/NavBar"),
    AppMain: () => import("./AppMain/AppMain"),
    SiderBar: () => import("./SiderBar/SiderBar")
  },
  props: {
    /*  <WelcomeMessage greeting-text="hi"/> */
    //   'greetingText': {
    //     type: [String,Number],
    //     required: true
    //  }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style lang="stylus" scoped>
.layout
  overflow hidden
  width 100%
  height 100%
  line-height 1

  .siderbar-container
    float left
    height 100%
    background-color rgb(0, 21, 41)

    .c-siderbar
      height 100%

  .main-container
    overflow hidden
    height 100%
</style>
