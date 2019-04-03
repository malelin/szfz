<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 内容主视图
 * @Date: 2019-03-27 10:03:14
 * @LastEditTime: 2019-04-02 17:15:38
 -->
<template>
  <div class="app-main">
    <div class="app-content">
      <router-view class="app-main__router-view" />
    </div>
    <div class="copyright-container">
      <Copyright class="c-copyright" />
    </div>
  </div>
</template>

<script>
export default {
  name: "AppMain",
  components: {
    /* 按需加载组件 */
    // demo: () => import('@/pages/')
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
.app-main
  height calc(100% - 96px)
  background-color #F0F2F5
  line-height 1

  .app-content
    box-sizing border-box
    padding 0 20px
    height calc(100% - 124px)

    .app-main__router-view
      box-sizing border-box
      margin-bottom 15px
      height calc(100% - 15px)

  .copyright-container
    text-align center

    .c-copyright
      display inline-block
</style>
