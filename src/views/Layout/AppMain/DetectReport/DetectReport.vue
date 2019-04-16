<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 检测报告
 * @Date: 2019-04-16 10:07:40
 * @LastEditTime: 2019-04-16 18:23:02
 -->
<template>
  <div class="detect-report">
    <div class="report-steps-wrapper"></div>
    <div class="report-content"></div>
  </div>
</template>

<script>
export default {
  name: "DetectReport",
  components: {
    /* 按需加载组件 */
    // demo: () => import('@/pages/')
  },
  props: {
    rid: {
      type: Number
    }
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
.detect-report
  display flex
  padding 20px
  border 1px solid #000
  background-color #fff

  .report-steps-wrapper
    padding 100px 100px 0 0
    height 400px

  .report-content
    flex 1
    overflow hidden
</style>
