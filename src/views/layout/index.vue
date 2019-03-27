<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 布局组件,包含SiderBar,NavBar,TagsView,AppMain
 * @Date: 2019-03-27 09:45:34
 * @LastEditTime: 2019-03-27 10:20:53
 -->
<template>
  <div class="layout">
    <SiderBar></SiderBar>
    <NavBar></NavBar>
    <TagsView></TagsView>
  </div>
</template>

<script>
export default {
  name: "Layout",
  components: {
    TagsView: () => import("./TagsView"),
    NavBar: () => import("./NavBar"),
    SiderBar: () => import("./SiderBar")
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
  width 100%
  height 100%
  line-height 1
</style>
