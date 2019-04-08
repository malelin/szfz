<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 控制面板组件
 * @Date: 2019-03-29 10:14:42
 * @LastEditTime: 2019-04-08 15:03:18
 -->
<template>
  <div class="dashboard">
    <div class="charts-container">
      <!-- 检测结果统计 -->
      <div class="jcjgtj">
        <div class="chart-header">
          <span class="title">检测结果统计</span>
          <el-tabs v-model="activeResult" @tab-click="handleJcjgtjClick">
            <el-tab-pane label="今日" name="today"></el-tab-pane>
            <el-tab-pane label="本周" name="week"></el-tab-pane>
            <el-tab-pane label="本月" name="month"></el-tab-pane>
            <el-tab-pane label="全年" name="year"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="chart-body">
          <el-col :span="6">
            <ve-ring
              :data="chartRing.dataGW"
              :legend-visible="false"
              :tooltip-visible="false"
              :judge-width="true"
              :colors="['#DA4E4E', '#F6F6F6']"
              :settings="chartRing.settings"
            ></ve-ring
          ></el-col>
          <el-col :span="6">
            <ve-ring
              :data="chartRing.dataZW"
              :legend-visible="false"
              :tooltip-visible="false"
              :judge-width="true"
              :colors="['#ffc300', '#F6F6F6']"
              :settings="chartRing.settings"
            ></ve-ring
          ></el-col>
          <el-col :span="6">
            <ve-ring
              :data="chartRing.dataAQ"
              :legend-visible="false"
              :tooltip-visible="false"
              :judge-width="true"
              :colors="['#2ae445', '#F6F6F6']"
              :settings="chartRing.settings"
            ></ve-ring
          ></el-col>
          <el-col :span="6">
            <ve-ring
              :data="chartRing.dataAQ"
              :legend-visible="false"
              :tooltip-visible="false"
              :judge-width="true"
              :colors="['#2ae445', '#F6F6F6']"
              :settings="chartRing.settings"
            ></ve-ring
          ></el-col>
        </div>
        <div class="chart-footer">
          <div class="res-info">
            <div class="amount-container">
              <span class="title">总计&nbsp;:</span>
              <span class="amount">1000&nbsp;个</span>
            </div>
            <div class="res-type">
              <div class="type high">高危</div>
              <div class="type middle">中危</div>
              <div class="type safe">安全</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 威胁类型分布 -->
      <div class="wxlxfb">
        <div class="chart-header">
          <span class="title">威胁类型分布</span
          ><el-tabs v-model="activeResult" @tab-click="handleWxlxfbClick">
            <el-tab-pane label="今日" name="today"></el-tab-pane>
            <el-tab-pane label="本周" name="week"></el-tab-pane>
            <el-tab-pane label="本月" name="month"></el-tab-pane>
            <el-tab-pane label="全年" name="year"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="chart-body">
          <ve-pie
            :data="chartPie.data"
            width="100%"
            :judge-width="true"
            :legend="chartPie.legend"
            :grid="chartPie.grid"
            :settings="chartPie.settings"
          ></ve-pie>
        </div>
      </div>
    </div>
    <div class="engine-container">
      <div class="engine-container-header">
        <span class="title">应用列表</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            全部应用<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>敏感信息分析</el-dropdown-item>
            <el-dropdown-item>同源分析</el-dropdown-item>
            <el-dropdown-item>安全仿真</el-dropdown-item>
            <el-dropdown-item>漏洞工具验证</el-dropdown-item>
            <el-dropdown-item>辅助工具</el-dropdown-item>
            <el-dropdown-item>知识库</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="engine-container-body">
        <ul class="engine-list">
          <li class="engine-item">
            <div class="engine-item-header">
              <svg-icon icon-class="mgxxfx"></svg-icon>
              <span class="engine-name">敏感信息分析</span>
            </div>
            <div class="engine-item-body">
              <p class="engine-desc">
                我们这个引擎可牛逼了,我们这个引擎可牛逼了,我们这个引擎可牛逼了,
              </p>
            </div>
          </li>
          <li class="engine-item">
            <div class="engine-item-header">
              <svg-icon icon-class="mgxxfx"></svg-icon>
              <span class="engine-name">敏感信息分析</span>
            </div>
            <div class="engine-item-body">
              <p class="engine-desc">
                我们这个引擎可牛逼了,我们这个引擎可牛逼了,我们这个引擎可牛逼了,
              </p>
            </div>
          </li>
          <li class="engine-item">
            <div class="engine-item-header">
              <svg-icon icon-class="mgxxfx"></svg-icon>
              <span class="engine-name">敏感信息分析</span>
            </div>
            <div class="engine-item-body">
              <p class="engine-desc">
                我们这个引擎可牛逼了,我们这个引擎可牛逼了,我们这个引擎可牛逼了,
              </p>
            </div>
          </li>
          <li class="engine-item">
            <div class="engine-item-header">
              <svg-icon icon-class="mgxxfx"></svg-icon>
              <span class="engine-name">敏感信息分析</span>
            </div>
            <div class="engine-item-body">
              <p class="engine-desc">
                我们这个引擎可牛逼了,我们这个引擎可牛逼了,我们这个引擎可牛逼了,
              </p>
            </div>
          </li>
          <li class="engine-item">
            <div class="engine-item-header">
              <svg-icon icon-class="mgxxfx"></svg-icon>
              <span class="engine-name">敏感信息分析</span>
            </div>
            <div class="engine-item-body">
              <p class="engine-desc">
                我们这个引擎可牛逼了,我们这个引擎可牛逼了,我们这个引擎可牛逼了,
              </p>
            </div>
          </li>
          <li class="engine-item">
            <div class="engine-item-header">
              <svg-icon icon-class="mgxxfx"></svg-icon>
              <span class="engine-name">敏感信息分析</span>
            </div>
            <div class="engine-item-body">
              <p class="engine-desc">
                我们这个引擎可牛逼了,我们这个引擎可牛逼了,我们这个引擎可牛逼了,
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  components: {},
  props: {},
  data() {
    return {
      // 激活的检测结果统计:[全年,本月,本周,今日]
      activeResult: "today",
      // 三个环形图
      chartRing: {
        // 环形图设置
        settings: {
          label: {
            show: true,
            position: "center",
            formatter({ data, percent }) {
              let flag = ["高危", "中危", "安全"];
              return flag.indexOf(data.name) !== -1
                ? ["{a|" + data.name + "}", "{b|" + percent + "%}"].join("\n")
                : "";
            },
            rich: {
              a: {
                lineHeight: 30,
                color: "#666"
              },
              b: {
                fontSize: 13,
                lineHeight: 20,
                color: "#111"
              }
            }
          },
          radius: [45, 60],
          offsetY: 100,
          hoverAnimation: false
        },
        // 高危环形图数据
        dataGW: {
          columns: ["类型", "数量"],
          rows: [{ 类型: "高危", 数量: 1393 }, { 类型: "其它", 数量: 100 }]
        },
        // 中危环形图数据
        dataZW: {
          columns: ["类型", "数量"],
          rows: [{ 类型: "中危", 数量: 1393 }, { 类型: "其它", 数量: 100 }]
        },
        // 安全环形图数据
        dataAQ: {
          columns: ["类型", "数量"],
          rows: [{ 类型: "安全", 数量: 1393 }, { 类型: "其它", 数量: 100 }]
        }
      },
      // 威胁类型分布图表数据
      chartPie: {
        data: {
          columns: ["类型", "数量"],
          rows: [
            { 类型: "涉我信息", 数量: 1393 },
            { 类型: "开发痕迹", 数量: 3530 },
            { 类型: "同源信息", 数量: 2923 },
            { 类型: "仿真分析", 数量: 1723 },
            { 类型: "IOC风险", 数量: 3792 },
            { 类型: "其他", 数量: 4593 }
          ]
        },
        settings: {
          radius: 60,
          offsetY: 130
        },
        legend: { orient: "vertical", right: 30, top: 50, bottom: 20 }
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    /**
     * @description 威胁类型分布tab点击
     * @param {object} 被选中的标签 tab 实例
     */
    handleWxlxfbClick(tab) {
      console.log(tab);
    },
    /**
     * @description 检测结果统计tab点击
     * @param {object} 被选中的标签 tab 实例
     */
    handleJcjgtjClick(tab) {
      console.log(tab);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style>
/* 重写el-tab header样式 */
.dashboard .el-tabs__header {
  margin: 0 0 0 0 !important;
}
/* 去重el-tab下边框 */
.dashboard .el-tabs__nav-wrap::after {
  display: none;
}
/* 重写下拉菜单 */
.dashboard .el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  font-size: 20px;
}
</style>

<style lang="stylus" scoped>
.dashboard
  .charts-container
    display flex
    justify-content space-between
    padding-bottom 30px

    .chart-header
      display flex
      justify-content space-between
      align-items center
      padding 0 15px 0 20px
      box-shadow 0 0px 10px #ccc
      line-height 40px

      .title
        color rgba(56, 56, 56, 1)
        font-weight 700

    .chart-body
      display flex
      height 200px

    .chart-footer
      padding 0 20px 20px 20px

      .res-info
        display flex
        justify-content space-between
        align-items center
        line-height 20px

        .amount-container
          .title
            margin-right 10px
            color #666
            font-weight 700

          .amount
            color #999

        .res-type
          display flex
          align-items center

          .type
            display flex
            align-items center
            margin-right 8px
            color #666

            &::before
              display inline-block
              margin-right 8px
              width 10px
              height 10px
              border-radius 50%
              background-color red
              content ''

            &.high
              &::before
                background-color rgba(212, 48, 48, 1)

            &.middle
              &::before
                background-color rgba(255, 195, 0, 1)

            &.safe
              &::before
                background-color rgba(42, 228, 69, 1)

    .jcjgtj
      flex 0 0 58%
      overflow hidden
      background-color #fff
      box-shadow 0 1px 10px #ccc

    .wxlxfb
      flex 0 0 40%
      overflow hidden
      background-color #fff
      box-shadow 0 1px 10px #ccc

  .engine-container
    box-sizing border-box
    margin-bottom 20px
    height calc(100% - 330px)
    background-color #fff
    box-shadow 0 0px 10px #ccc

    &-header
      display flex
      justify-content space-between
      padding 20px 15px
      box-shadow 0 0px 10px #ccc

      .title
        font-weight 700
        font-size 20px

    &-body
      height calc(100% - 61px)

      .engine-list
        display flex
        flex-wrap wrap
        height 100%

        .engine-item
          flex 0 0 33.33%
          box-sizing border-box
          padding 20px
          height 50%
          border 1px solid #ccc
          border-bottom none
          border-left none

          &-header
            display flex
            align-items center
            padding-bottom 20px

            >>>.svg-icon
              font-size 40px

            .engine-name
              padding-left 20px
              color #333
              font-weight 700
              font-size 26px

          &-body
            .engine-desc
              color #999
</style>
