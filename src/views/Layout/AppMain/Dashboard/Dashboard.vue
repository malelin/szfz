<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 控制面板组件
 * @Date: 2019-03-29 10:14:42
 * @LastEditTime: 2019-04-15 19:51:09
 -->
<template>
  <div class="dashboard">
    <div class="charts-container">
      <!-- 检测结果统计 -->
      <div class="jcjgtj">
        <div class="chart-header">
          <span class="title">检测结果统计</span>
          <el-tabs
            v-model="chartRing.detectTimeRange"
            @tab-click="handleDetectResTabClick"
          >
            <el-tab-pane label="今日" name="day"></el-tab-pane>
            <el-tab-pane label="本周" name="week"></el-tab-pane>
            <el-tab-pane label="本月" name="month"></el-tab-pane>
            <el-tab-pane label="全年" name="year"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="chart-body">
          <el-col :span="6">
            <ve-ring
              :data="chartRingData.dataFailure"
              :legend-visible="false"
              :tooltip-visible="false"
              :judge-width="true"
              :colors="['rgba(212, 48, 48, 1)', '#F6F6F6']"
              :settings="chartRing.settings"
            ></ve-ring
          ></el-col>
          <el-col :span="6">
            <ve-ring
              :data="chartRingData.dataHighRisk"
              :legend-visible="false"
              :tooltip-visible="false"
              :judge-width="true"
              :colors="['#fb6d08', '#F6F6F6']"
              :settings="chartRing.settings"
            ></ve-ring
          ></el-col>
          <el-col :span="6">
            <ve-ring
              :data="chartRingData.dataMiddleRisk"
              :legend-visible="false"
              :tooltip-visible="false"
              :judge-width="true"
              :colors="['rgba(255, 195, 0, 1)', '#F6F6F6']"
              :settings="chartRing.settings"
            ></ve-ring
          ></el-col>
          <el-col :span="6">
            <ve-ring
              :data="chartRingData.dataSafety"
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
              <span class="amount">{{ chartRingData.total }}&nbsp;个</span>
            </div>
            <div class="res-type">
              <div class="type fail">失败</div>
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
          ><el-tabs
            v-model="chartPie.threatTimeRange"
            @tab-click="handleThreatTabClick"
          >
            <el-tab-pane label="今日" name="day"></el-tab-pane>
            <el-tab-pane label="本周" name="week"></el-tab-pane>
            <el-tab-pane label="本月" name="month"></el-tab-pane>
            <el-tab-pane label="全年" name="year"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="chart-body">
          <ve-pie
            :data="chartPieData"
            width="100%"
            :judge-width="true"
            :legend="chartPie.legend"
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
import { getDetectRes, getThreatRes } from "@/api/indexManage";
export default {
  name: "Dashboard",
  components: {},
  props: {},
  data() {
    return {
      //  检测结果统计配置
      chartRing: {
        // 环形图设置
        settings: {
          label: {
            show: true,
            position: "center",
            formatter({ data, percent }) {
              let flag = ["高危", "中危", "安全", "失败"];
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
        //默认tab激活
        detectTimeRange: "day"
      },
      detectRes: {
        day: {},
        year: {},
        month: {},
        week: {}
      },
      //威胁类型分布配置
      chartPie: {
        settings: {
          radius: 60,
          offsetY: 130
        },
        legend: { orient: "vertical", right: 30, top: 50, bottom: 20 },
        threatTimeRange: "day"
      },
      threatRes: { day: {}, week: {}, month: {}, year: [] }
    };
  },
  computed: {
    // 检测结果统计数据
    chartRingData() {
      return {
        // failure: 34
        // highRisk: 26
        // middleRisk: 5
        // safety: 0
        // total: 34
        // 安全环形图数据
        dataFailure: {
          columns: ["类型", "数量"],
          rows: [
            {
              类型: "失败",
              数量: this.detectRes[this.chartRing.detectTimeRange].failure
            },
            {
              类型: "其它",
              数量:
                this.detectRes[this.chartRing.detectTimeRange].total -
                this.detectRes[this.chartRing.detectTimeRange].failure
            }
          ]
        },
        // 高危环形图数据
        dataHighRisk: {
          columns: ["类型", "数量"],
          rows: [
            {
              类型: "高危",
              数量: this.detectRes[this.chartRing.detectTimeRange].highRisk
            },
            {
              类型: "其它",
              数量:
                this.detectRes[this.chartRing.detectTimeRange].total -
                this.detectRes[this.chartRing.detectTimeRange].highRisk
            }
          ]
        },
        // 中危环形图数据
        dataMiddleRisk: {
          columns: ["类型", "数量"],
          rows: [
            {
              类型: "中危",
              数量: this.detectRes[this.chartRing.detectTimeRange].middleRisk
            },
            {
              类型: "其它",
              数量:
                this.detectRes[this.chartRing.detectTimeRange].total -
                this.detectRes[this.chartRing.detectTimeRange].middleRisk
            }
          ]
        },
        // 安全环形图数据
        dataSafety: {
          columns: ["类型", "数量"],
          rows: [
            {
              类型: "安全",
              数量: this.detectRes[this.chartRing.detectTimeRange].safety
            },
            {
              类型: "其它",
              数量:
                this.detectRes[this.chartRing.detectTimeRange].total -
                this.detectRes[this.chartRing.detectTimeRange].safety
            }
          ]
        },
        total: this.detectRes[this.chartRing.detectTimeRange].total
      };
    },
    // 威胁类型分布数据
    chartPieData() {
      return {
        columns: ["类型", "数量"],
        rows: [
          {
            类型: "涉我信息",
            数量: this.threatRes[this.chartPie.threatTimeRange].relateType
          },
          {
            类型: "开发痕迹",
            数量: this.threatRes[this.chartPie.threatTimeRange].developType
          },
          {
            类型: "同源信息",
            数量: this.threatRes[this.chartPie.threatTimeRange].homoType
          },
          {
            类型: "仿真分析",
            数量: this.threatRes[this.chartPie.threatTimeRange].antiType
          },
          {
            类型: "IOC风险",
            数量: this.threatRes[this.chartPie.threatTimeRange].iocType
          },
          {
            类型: "其他",
            数量: this.threatRes[this.chartPie.threatTimeRange].otherType
          }
        ]
      };
    }
  },
  watch: {},
  methods: {
    /**
     * @description 威胁类型分布tab点击
     * @param {object} 被选中的标签 tab 实例
     */
    handleThreatTabClick(tab) {
      this.chartPie.threatTimeRange = tab.name;
    },
    /**
     * @description 检测结果统计tab点击
     * @param {object} 被选中的标签 tab 实例
     */
    handleDetectResTabClick(tab) {
      this.chartRing.detectTimeRange = tab.name;
    }
  },
  created() {
    getDetectRes()
      .then(({ status, data }) => {
        if (status === 200) {
          this.detectRes = data;
        }
      })
      .catch(err => {
        console.log(err);
      });
    getThreatRes()
      .then(({ status, data }) => {
        if (status === 200) {
          this.threatRes = data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
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
            margin-right 10px
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
                background-color #fb6d08

            &.fail
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
          height 200px
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
