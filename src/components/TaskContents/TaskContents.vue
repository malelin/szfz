<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 任务内容
 * @Date: 2019-04-12 11:50:54
 * @LastEditTime: 2019-05-05 14:53:50
 -->
<template>
  <div class="task-contents">
    <span class="task-item" v-if="taskHomo === 1">同源分析</span>
    <span class="task-item" v-if="taskAnti === 1">安全仿真分析</span>
    <span class="task-item" v-if="taskMorph === 1">工具变形与验证</span>
    <span class="task-item" v-if="taskSensi === 1">敏感信息分析</span>
    <span class="task-item" v-if="taskVeri === 1">漏洞工具验证</span>
  </div>
</template>

<script>
export default {
  name: "TaskContents",
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
.task-contents
  line-height 1
</style>
