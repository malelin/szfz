<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 展示打开的功能,可以关闭
 * @Date: 2019-03-27 10:02:21
 * @LastEditTime: 2019-03-29 10:04:36
 -->
<template>
  <div class="tags-view"></div>
</template>

<script>
export default {
  name: "TagsView",
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
.tags-view
  height 36px
  line-height 1
</style>
