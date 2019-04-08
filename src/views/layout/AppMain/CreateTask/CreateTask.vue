<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 新建任务组件
 * @Date: 2019-04-02 09:23:23
 * @LastEditTime: 2019-04-08 16:37:53
 -->

<template>
  <div class="create-task">
    <el-scrollbar class="c-el-scrollbar">
      <div class="content"></div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: "CreateTask",
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
.create-task .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>

<style lang="stylus" scoped>
.create-task
  height 100%

  .c-el-scrollbar
    height 300px

  .content
    height 1000px
    background-color pink
</style>
