<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 审计日志组件
 * @Date: 2019-04-02 13:38:05
 * @LastEditTime: 2019-04-02 13:38:14
 -->
<template>
  <div class="audit-log"></div>
</template>

<script>
export default {
  name: "AuditLog",
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
.audit-log
  line-height 1
</style>
