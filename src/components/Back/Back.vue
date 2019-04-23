<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 返回组件
 * @Date: 2019-04-15 11:20:25
 * @LastEditTime: 2019-04-23 15:47:50
 -->

<template>
  <div class="back" @click="routerTo">
    <el-button
      class="c-el-button"
      type="text"
      size="medium"
      icon="el-icon-arrow-left"
      >返回上一级</el-button
    >
  </div>
</template>

<script>
export default {
  name: "Back",
  components: {
    /* 按需加载组件 */
    // demo: () => import('@/pages/')
  },
  props: {
    target: {
      require: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    /**
     * @description 路由跳转到
     */
    routerTo() {
      this.$router.push(this.target);
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang="stylus" scoped>
.back
  position absolute
  top 0
  left 3px
  z-index 99
  padding-right 3px
  border-bottom 1px solid #efefef
  border-radius 5px
  background-color #fff
  box-shadow 1px 0 10px #ccc
  line-height 25px

  .c-el-button
    font-size 16px

    >>>i
      color rgba(42, 130, 228, 1)

  >>>.el-button--medium
    padding 2px 0

    >>>span
      color rgba(42, 130, 228, 1)

      &:hover
        color #245286

.blank
  height 40px
</style>
