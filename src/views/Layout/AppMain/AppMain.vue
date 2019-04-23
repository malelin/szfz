<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 内容主视图
 * @Date: 2019-03-27 10:03:14
 * @LastEditTime: 2019-04-23 13:56:00
 -->
<template>
  <div class="app-main">
    <div class="app-content">
      <Back />
      <div class="scroller-wrapper">
        <el-scrollbar class="c-el-scrollbar">
          <router-view class="app-main__router-view" />
        </el-scrollbar>
      </div>
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
<style>
/* 屏蔽el-scroller横向滚动条 */
.app-main .c-el-scrollbar {
  overflow-x: hidden;
  height: 100%;
}
.app-main .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>

<style lang="stylus" scoped>
.app-main
  box-sizing border-box
  height calc(100% - 60px)
  background-color #F0F2F5
  line-height 1

  .app-content
    display flex
    flex-direction column
    box-sizing border-box
    padding 0 20px
    height 100%

    .scroller-wrapper
      flex 1
      overflow hidden
</style>
