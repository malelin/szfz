<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 内容主视图
 * @Date: 2019-03-27 10:03:14
 * @LastEditTime: 2019-03-27 17:26:22
 -->
<template>
  <div class="app-main"></div>
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
  line-height 1
</style>
