<template>
  <div class="siderbar">
    <el-scrollbar class="c-scrollbar"></el-scrollbar>
  </div>
</template>

<script>
export default {
  name: "SiderBar",
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
.siderbar
  height 100%
  line-height 1

  .c-scrollbar
    height 100%
</style>
