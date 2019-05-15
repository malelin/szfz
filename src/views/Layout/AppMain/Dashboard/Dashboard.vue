<!--
 * @Author: 旺苍扛把子
 * @LastEditors: Please set LastEditors
 * @Description: 控制面板组件
 * @Date: 2019-03-29 10:14:42
 * @LastEditTime: 2019-05-14 13:54:36
 -->
<template>
  <div class="dashboard">
    <div class="charts-container">
      <!-- 检测结果统计 -->
      <div class="jcjgtj">
        <div class="chart-header">
          <span class="title">检测结果统计</span>
          <el-tabs
            v-model="chartDetectRing.detectTimeRange"
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
              class="c-ve-ring"
              :data="chartDetectRingData.dataFailure"
              :legend-visible="false"
              :tooltip-visible="false"
              :judge-width="true"
              :colors="['rgba(212, 48, 48, 1)', '#F6F6F6']"
              :settings="chartDetectRing.settings"
            ></ve-ring
          ></el-col>
          <el-col :span="6">
            <ve-ring
              class="c-ve-ring"
              :data="chartDetectRingData.dataHighRisk"
              :legend-visible="false"
              :tooltip-visible="false"
              :judge-width="true"
              :colors="['#fb6d08', '#F6F6F6']"
              :settings="chartDetectRing.settings"
            ></ve-ring
          ></el-col>
          <el-col :span="6">
            <ve-ring
              class="c-ve-ring"
              :data="chartDetectRingData.dataMiddleRisk"
              :legend-visible="false"
              :tooltip-visible="false"
              :judge-width="true"
              :colors="['rgba(255, 195, 0, 1)', '#F6F6F6']"
              :settings="chartDetectRing.settings"
            ></ve-ring
          ></el-col>
          <el-col :span="6">
            <ve-ring
              class="c-ve-ring"
              :data="chartDetectRingData.dataSafety"
              :legend-visible="false"
              :tooltip-visible="false"
              :judge-width="true"
              :colors="['#2ae445', '#F6F6F6']"
              :settings="chartDetectRing.settings"
            ></ve-ring
          ></el-col>
        </div>
        <div class="chart-footer">
          <div class="res-info">
            <div class="amount-container">
              <span class="title">总计&nbsp;:</span>
              <span class="amount"
                >{{ chartDetectRingData.total }}&nbsp;个</span
              >
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
            v-model="chartThreatRing.threatTimeRange"
            @tab-click="handleThreatTabClick"
          >
            <el-tab-pane label="今日" name="day"></el-tab-pane>
            <el-tab-pane label="本周" name="week"></el-tab-pane>
            <el-tab-pane label="本月" name="month"></el-tab-pane>
            <el-tab-pane label="全年" name="year"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="chart-body">
          <ve-ring
            class="c-ve-ring"
            width="100%"
            height="240px"
            :judge-width="true"
            :tooltip="chartThreatRingData.tooltip"
            :legend="chartThreatRingData.legend"
            :series="chartThreatRingData.series"
            :colors="['#59A0F8', '#76C77D', '#F5D464', '#E46F7D', '#8F65DD']"
          ></ve-ring>
        </div>
      </div>
    </div>
    <div class="engine-container">
      <div class="engine-container-header">
        <span class="title">应用列表</span>
      </div>
      <div class="engine-container-body">
        <ul class="engine-list">
          <Engine v-bind="engines.sensi" />
          <Engine v-bind="engines.anti" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getDetectRes, getThreatRes } from "@/api/indexManage";
export default {
  name: "Dashboard",
  components: {
    /* 引擎组件 */
    // Engine
    Engine: () => import("./Engine/Engine.vue")
  },
  props: {},
  data() {
    return {
      //  检测结果统计换图配置
      chartDetectRing: {
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
                color: "#999",
                fontSize: 12
              },
              b: {
                fontSize: 18,
                lineHeight: 20,
                color: "#333"
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
      //威胁类型分布换图配置
      chartThreatRing: {
        threatTimeRange: "day"
      },
      // 所有接口返回值
      res: {
        detectRes: {
          day: {},
          year: {},
          month: {},
          week: {}
        },
        threatRes: { day: {}, week: {}, month: {}, year: [] }
      },
      engines: {
        sensi: {
          engineName: "敏感信息分析引擎",
          engineId: "sensi",
          engineIcon: "mgxxfx",
          engineDescription: "这是引擎描述",
          engineAction: process.env.VUE_APP_BASE_API + "/v1/filemanage/object",
          engineHeaders: {
            "Digark-Access-Header": sessionStorage.getItem("token")
          },
          engineUploadName: "object"
        },
        anti: {
          engineDescription: "这是引擎描述",
          engineName: "安全仿真",
          engineIcon: "aqfz",
          engineId: "anti",
          engineAction: process.env.VUE_APP_BASE_API + "/v1/filemanage/object",
          engineHeaders: {
            "Digark-Access-Header": sessionStorage.getItem("token")
          },
          engineUploadName: "object"
        }
      }
    };
  },
  computed: {
    // 检测结果统计数据
    chartDetectRingData() {
      let dataTimeRange = this.res.detectRes[
        this.chartDetectRing.detectTimeRange
      ];
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
              数量: dataTimeRange.failure
            },
            {
              类型: "其它",
              数量: dataTimeRange.total - dataTimeRange.failure
            }
          ]
        },
        // 高危环形图数据
        dataHighRisk: {
          columns: ["类型", "数量"],
          rows: [
            {
              类型: "高危",
              数量: dataTimeRange.highRisk
            },
            {
              类型: "其它",
              数量: dataTimeRange.total - dataTimeRange.highRisk
            }
          ]
        },
        // 中危环形图数据
        dataMiddleRisk: {
          columns: ["类型", "数量"],
          rows: [
            {
              类型: "中危",
              数量: dataTimeRange.middleRisk
            },
            {
              类型: "其它",
              数量: dataTimeRange.total - dataTimeRange.middleRisk
            }
          ]
        },
        // 安全环形图数据
        dataSafety: {
          columns: ["类型", "数量"],
          rows: [
            {
              类型: "安全",
              数量: dataTimeRange.safety
            },
            {
              类型: "其它",
              数量: dataTimeRange.total - dataTimeRange.safety
            }
          ]
        },
        total: dataTimeRange.total
      };
    },
    // 威胁类型分布数据
    chartThreatRingData() {
      //  今日||本周||本月||全年的总计
      let total = this.res.threatRes[this.chartThreatRing.threatTimeRange]
        .total;
      //  今日||本周||本月||全年的数据
      let dataTimeRange = this.res.threatRes[
        this.chartThreatRing.threatTimeRange
      ];
      return {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },

        legend: {
          orient: "vertical",
          right: "15%",
          top: 20,
          bottom: 20,
          textStyle: {
            rich: {
              a: {
                lineHeight: 20,
                color: "rgba(0,0,0,.45)"
              },
              b: {
                fontSize: 13,
                lineHeight: 20,
                color: "#333"
              }
            }
          },
          formatter(name) {
            let typeMap = {
              涉我信息: "relateType",
              开发痕迹: "developType",
              同源信息: "homoType",
              仿真分析: "antiType",
              IOC风险: "iocType",
              其他: "otherType"
            };
            let type = typeMap[name];
            let value = dataTimeRange[type];
            let percent = parseInt((value / total) * 10000) / 100;
            return isNaN(percent)
              ? [
                  name,
                  "{a|" + "   |   " + 0 + "}",
                  "{b|" + "    " + total + "}"
                ].join("")
              : [
                  name,
                  "{a|" +
                    "   |   " +
                    parseInt((value / total) * 10000) / 100 +
                    "%}",
                  "{b|" + "    " + value + "}"
                ].join("");
          },
          data: [
            "涉我信息",
            "开发痕迹",
            "同源信息",
            "仿真分析",
            "IOC风险",
            "其他"
          ]
        },
        series: [
          {
            center: ["26%", "110"], //调整饼图位置
            name: "威胁类型分布",
            type: "pie",
            radius: ["90", "65"],
            label: {
              show: true,
              position: "center",
              formatter() {
                return ["{a|" + "总计" + "}", "{b|" + total + "}"].join("\n");
              },
              rich: {
                a: {
                  lineHeight: 50,
                  fontSize: 14,
                  fontWeight: "normal",
                  color: "#999"
                },
                b: {
                  fontSize: 25,
                  lineHeight: 20,
                  color: "#333"
                }
              }
            },
            data: [
              {
                name: "涉我信息",
                value: dataTimeRange.relateType
              },
              {
                name: "开发痕迹",
                value: dataTimeRange.developType
              },
              {
                name: "同源信息",
                value: dataTimeRange.homoType
              },
              {
                name: "仿真分析",
                value: dataTimeRange.antiType
              },
              {
                name: "IOC风险",
                value: dataTimeRange.iocType
              },
              {
                name: "其他",
                value: dataTimeRange.otherType
              }
            ]
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
      this.chartThreatRing.threatTimeRange = tab.name;
    },
    /**
     * @description 检测结果统计tab点击
     * @param {object} 被选中的标签 tab 实例
     */
    handleDetectResTabClick(tab) {
      this.chartDetectRing.detectTimeRange = tab.name;
    }
  },
  created() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      getDetectRes()
        .then(({ status, data }) => {
          if (status === 200) {
            vm.res.detectRes = data;
          }
        })
        .catch(err => {
          console.log(err);
        });
      getThreatRes()
        .then(({ status, data }) => {
          if (status === 200) {
            vm.res.threatRes = data;
          }
        })
        .catch(err => {
          console.log(err);
        });
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
  font-size: 18px;
}
</style>

<style lang="stylus" scoped>
.dashboard
  .charts-container
    display flex
    justify-content space-between
    margin 0 12px

    .chart-header
      display flex
      justify-content space-between
      align-items center
      padding 0 15px 0 20px
      border-bottom 1px solid #ebeef5
      line-height 46px

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
      flex 0 0 54%
      overflow hidden
      margin 8px 0
      border-radius 6px
      background-color #fff
      box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.1)

      &:hover
        box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.2)

    .wxlxfb
      flex 0 0 45%
      margin 8px 0
      border-radius 6px
      background-color #fff
      box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.1)

      &:hover
        box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.2)

  .engine-container
    box-sizing border-box
    margin 8px 12px
    border-radius 6px
    background-color #fff
    box-shadow 0 2px 12px 3px rgba(0, 0, 0, 0.1)

    &:hover
      box-shadow 0 2px 12px 3px rgba(0, 0, 0, 0.2)

    &-header
      display flex
      justify-content space-between
      box-sizing border-box
      padding-left 20px
      height 47px
      border-bottom 1px solid #ebeef5
      line-height 47px

      .title
        font-weight 700
        font-size 16px

    &-body
      height calc(100% - 61px)

      .engine-list
        display flex
        flex-wrap wrap
        height 100%

.loading
  position absolute
  top 0
  left 0
  display flex
  flex-direction column
  justify-content center
  align-items center
  width 100%
  height 100%

  .loading-text
    padding-top 30px
    color rgb(32, 160, 255)
    text-align center

  .loading-item
    float left
    margin 0 8px
    width 8px
    height 8px
    border-radius 50%
    background rgb(32, 160, 255)
    animation loading-item linear 1s infinite
    -webkit-animation loading-item linear 1s infinite

  .loading-item:nth-child(1)
    animation-delay 0s

  .loading-item:nth-child(2)
    animation-delay 0.15s

  .loading-item:nth-child(3)
    animation-delay 0.3s

  .loading-item:nth-child(4)
    animation-delay 0.45s

  .loading-item:nth-child(5)
    animation-delay 0.6s

  @keyframes loading-item
    0%, 60%, 100%
      transform scale(1)

    30%
      transform scale(2.5)

  @keyframes loading-item
    0%, 60%, 100%
      transform scale(1)

    30%
      transform scale(2.5)
</style>
