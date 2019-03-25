<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 封装echart通用组件
 * @Date: 2019-03-25 10:55:42
 * @LastEditTime: 2019-03-25 11:41:10
 -->

<template>
  <div :id="id" class="chart"></div>
</template>

<script>
export default {
  name: "Chart",
  components: {},
  props: {
    // 图表数据
    chartData: { type: Object, required: true }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {
    /**
     * @description 检测父级传递的数据,如果数据有改变,就重新渲染
     * @param {any} newValue
     */
    originData: function(newValue) {
      this.render(newValue);
    }
  },
  methods: {
    /**
     * @description 渲染echart
     * @param {any} chartData
     */
    render(chartData) {
      this.chart = this.$echarts.init(document.getElementById(this.id));
      this.chart.setOption(chartData);
    }
  },
  created() {
    /* 为组件生成唯一的id */
    this.id = "chart-" + this.$nanoid();
  },
  mounted() {}
};
</script>

<style lang="stylus" scoped>
.chart
  line-height 1
</style>
