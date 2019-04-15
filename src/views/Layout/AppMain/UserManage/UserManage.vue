<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 用户管理组件
 * @Date: 2019-04-02 13:37:27
 * @LastEditTime: 2019-04-02 13:37:52
 -->
<template>
  <div class="user-mange"></div>
</template>

<script>
export default {
  name: "UserMange",
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
.user-mange
  line-height 1
</style>
