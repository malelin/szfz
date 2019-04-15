<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 状态
 * @Date: 2019-04-12 11:27:52
 * @LastEditTime: 2019-04-12 14:38:56
 -->
<template>
  <div class="status">
    <i :style="styleObj"></i>
    <span>{{ text }}</span>
  </div>
</template>
<script>
export default {
  name: "Status",
  props: {
    // 状态
    status: {
      type: Number,
      required: true
    },
    // 配置状态数据
    statusConfig: {
      type: Array,
      default() {
        return [
          { color: "#aaaaaa", text: "待启动" },
          { color: "#409EFF", text: "进行中" },
          { color: "#67C23A", text: "完成" },
          { color: "#F56C6C", text: "失败" }
        ];
      }
    }
  },
  computed: {
    styleObj() {
      return {
        "background-color": this.statusConfig[this.status - 1].color
      };
    },
    text() {
      return this.statusConfig[this.status - 1].text;
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="stylus" scoped>
.status
  i
    display inline-block
    width 5px
    height 5px
    border-radius 50%
    vertical-align middle

  span
    margin-left 10px
    vertical-align middle
</style>
