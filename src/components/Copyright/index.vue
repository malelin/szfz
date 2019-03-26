<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: Copyright组件
 * @Date: 2019-03-26 16:50:07
 * @LastEditTime: 2019-03-26 17:08:21
 -->
<template>
  <div class="copyright">
    <div class="message">
      <span class="message-item">帮助</span>
      <span class="message-item">隐私</span>
      <span class="message-item">条款</span>
    </div>
    <div class="copyright-info">
      <p>Copyright © 兴华永恒（北京）科技有限责任公司.</p>
      <p>All rights reserved. 京ICP备10040895号.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Copyright",
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
.copyright
  width 500px
  color rgba(0, 0, 0, 0.45)

  .message
    padding-bottom 20px
    text-align center
    font-size 14px

    .message-item
      margin-right 20px
      cursor pointer

  .copyright-info
    font-size 12px
    line-height 20px

    p
      text-align center
</style>
