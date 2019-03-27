<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 头部栏,包含搜索,注销,消息
 * @Date: 2019-03-27 10:03:36
 * @LastEditTime: 2019-03-27 10:34:00
 -->
<template>
  <div class="navbar"></div>
</template>

<script>
export default {
  name: "NavBar",
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
.navbar
  line-height 1
</style>
