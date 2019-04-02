<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 任务概览组件
 * @Date: 2019-04-01 18:17:27
 * @LastEditTime: 2019-04-01 18:18:21
 -->
<template>
  <div class="task-overview"></div>
</template>

<script>
export default {
  name: "TaskOverview",
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
.task-overview
  line-height 1
</style>
