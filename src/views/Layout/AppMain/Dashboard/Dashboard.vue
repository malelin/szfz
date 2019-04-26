<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 控制面板组件
 * @Date: 2019-03-29 10:14:42
 * @LastEditTime: 2019-04-26 16:16:34
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
          <li class="engine-item">
            <el-upload
              class="upload-sensi"
              drag
              @dragenter.native="onDragenterSensi"
              @dragleave.native="onDragleaveSensi"
              @mouseenter.native="onEnterEngineSensi"
              @mouseleave.native="onLeaveEngineSensi"
              @drop.native="onDropEngineSensi"
              :show-file-list="false"
              :name="config.engines.engineSensi.name"
              :action="config.engines.engineSensi.action"
              :headers="config.engines.engineSensi.headers"
              :on-error="onSensiUploadErr"
              :on-success="onSensiUploadSuccess"
              :before-upload="SensiFileBeforeUpload"
              :on-progress="onSensiUploadProgress"
            >
              <!-- 引擎内容说明 -->
              <div class="upload-inner">
                <div class="engine-item-header">
                  <svg-icon icon-class="mgxxfx"></svg-icon>
                  <span class="engine-name">敏感信息分析</span>
                </div>
                <div class="engine-item-body">
                  <p class="engine-desc"></p>
                </div>
              </div>
              <!-- 引擎停留阴影 -->
              <div
                class="upload-text-wrapper"
                v-show="config.engines.engineSensi.showUploadHoverShadow"
              >
                <svg-icon icon-class="dashboard_add"></svg-icon>
              </div>
            </el-upload>
            <!-- 上传任务遮罩 -->
            <div
              class="overlay"
              v-show="config.engines.engineSensi.isUploading"
            >
              <el-progress
                type="circle"
                v-if="config.engines.engineSensi.showProgress"
                :percentage="config.engines.engineSensi.progress.percentage"
              ></el-progress>
            </div>
            <!-- 创建任务遮罩 -->
            <div
              class="loading clearfix"
              v-show="config.engines.engineSensi.isLoading"
            >
              <div class="loading-inner">
                <div class="loading-item"></div>
                <div class="loading-item"></div>
                <div class="loading-item"></div>
                <div class="loading-item"></div>
                <div class="loading-item"></div>
              </div>
              <p class="loading-text">正在创建任务</p>
            </div>
          </li>
          <li></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { createTask } from "@/api/task";
import { getDetectRes, getThreatRes } from "@/api/indexManage";
export default {
  name: "Dashboard",
  components: {},
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
      config: {
        // 引擎配置
        engines: {
          // 敏感引擎
          engineSensi: {
            name: "object",
            action: process.env.VUE_APP_BASE_API + "/v1/filemanage/object",
            headers: {
              "Digark-Access-Header": sessionStorage.getItem("token")
            },
            // 是否正在上传中
            isUploading: false,
            showUploadHoverShadow: false,
            isLoading: false,
            showProgress: false,
            // 最后一次拖动进入的目标
            lastDragenter: null,
            modal: {
              modalSensi: {
                classes: "modal-sensi"
              }
            },
            progress: {
              percentage: 0
            }
          }
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
    },
    /**
     * @description 敏感信息引擎上传文件成功
     */
    async onSensiUploadSuccess({ status, data: object }) {
      if (status === 200) {
        // 完成上传,切换上传状态
        this.config.engines.engineSensi.isUploading = false;
        // 打开创建任务中的动画的遮罩
        this.config.engines.engineSensi.overlay = true;
        let obj = this._formatFile2SensiObject(object);
        let taskData = {
          model: 2,
          objects: [obj]
        };
        try {
          let { status, msg } = await createTask(taskData);
          // 关闭创建任务中的动画的遮罩
          this.config.engines.engineSensi.isLoading = false;
          debugger;
          switch (status) {
            case 200:
              this.$message({
                type: "success",
                message: "敏感信息引擎任务创建成功"
              });
              this.$router.push("/taskOverview");
              break;
            case 201:
              this.$message({
                type: "warning",
                message: msg
              });
              break;
            default:
              break;
          }
        } catch (e) {
          this.$message({
            type: "error",
            message: e.toString()
          });
        }
      }
    },
    /**
     * @description 敏感信息引擎上传中
     */
    async onSensiUploadProgress(event) {
      this.config.engines.engineSensi.isUploading = true;
      this.config.engines.engineSensi.showProgress = true;
      let percentage = parseInt(event.percent);
      this.config.engines.engineSensi.progress.percentage = percentage;
      if (percentage === 100) {
        this.config.engines.engineSensi.progress.percentage = 0;
        this.config.engines.engineSensi.showProgress = false;
        this.config.engines.engineSensi.isLoading = true;
      }
    },
    /**
     * @description 敏感信息引擎上传文件出错
     */
    onSensiUploadErr(err, file, fileList) {
      console.log(fileList);
    },
    /**
     * @description 敏感信息引擎上传文件之前
     */
    SensiFileBeforeUpload(file) {
      let fileSize = file.size / 1024 / 1024;
      if (fileSize > 30) {
        this.$message({
          type: "error",
          message: "文件大小不能大于30MB"
        });
        return false;
      }
      this.config.engines.engineSensi.showProgress = true;
      this.config.engines.engineSensi.showUploadHoverShadow = false;
    },
    /**
     * @description 鼠标移入敏感引擎
     */
    onEnterEngineSensi() {
      // 是否正在上传中
      if (!this.config.engines.engineSensi.isUploading) {
        this.config.engines.engineSensi.showUploadHoverShadow = true;
      }
    },
    /**
     * @description 鼠标移出敏感引擎
     */
    onLeaveEngineSensi() {
      // 是否正在上传中
      if (!this.config.engines.engineSensi.isUploading) {
        this.config.engines.engineSensi.showUploadHoverShadow = false;
      }
    },
    /**
     * @description 鼠标拖文件进入敏感引擎
     */
    onDragenterSensi(event) {
      this.config.engines.engineSensi.lastDragenter = event.target;
      // 是否正在上传中
      if (!this.config.engines.engineSensi.isUploading) {
        this.config.engines.engineSensi.showUploadHoverShadow = true;
      }
    },
    /**
     * @description  鼠标拖文件离开敏感引擎
     */
    onDragleaveSensi(event) {
      // 是否正在上传中
      if (!this.config.engines.engineSensi.isUploading) {
        debugger;
        if (this.config.engines.engineSensi.lastDragenter === event.target) {
          this.config.engines.engineSensi.showUploadHoverShadow = false;
        }
      }
    },
    /**
     * @description 文件放入目标对象触发的事件
     */
    onDropEngineSensi() {
      if (!this.config.engines.engineSensi.isUploading) {
        this.config.engines.engineSensi.showUploadHoverShadow = false;
      }
    },
    /**
     * @description 把上传接受到的file类型格式的数据转化成object类型的敏感信息引擎创建任务的格式
     */
    _formatFile2SensiObject({
      uploadId,
      fileSHA1: sha1,
      fileSHA256: sha256,
      fileSSDEEP: ssdeep,
      suffix,
      saveUrl: url,
      fileMD5: md5,
      fileType: type,
      fileSize: size,
      fileName: objectName
    }) {
      return {
        uploadId,
        sha1,
        sha256,
        ssdeep,
        suffix,
        url,
        md5,
        type,
        size,
        objectName,
        openSensitivity: 1,
        openMorph: 2
      };
    }
  },
  created() {
    window.hasSum = false;
  },
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
.dashboard .el-upload {
  width: 100%;
  height: 100%;
}
.dashboard .el-upload-dragger {
  width: 100%;
  border-color: #fff;
}

.modal-sensi {
  background-color: transparent;
  text-align: center;
}
.engine-item .upload-sensi {
  height: 100%;
}
.engine-item .el-upload-dragger {
  height: 100%;
  border: none;
}
.engine-item .el-upload-dragger:hover {
  border: #fff;
}
.engine-item .el-upload-dragger .upload-text-wrapper {
  background-color: rgba(0, 0, 0, 0.2);
  height: 180px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: #2a82e4;
  display: flex;
  align-items: center;
  justify-content: center;
}
.engine-item .upload-text-wrapper .svg-icon {
  font-size: 70px;
}
.engine-item .el-upload-dragger .upload-text {
  color: #2a82e4;
  margin-top: 20px;
}
.dashboard .el-upload:focus .el-upload-dragger {
  border: none;
  color: #333;
}
.el-upload-dragger.is-dragover {
  border: none !important;
}
.el-progress--circle .el-progress__text {
  color: #2a82e4;
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

        .engine-item
          position relative
          flex 0 0 33.33%
          box-sizing border-box
          height 280px
          border 1px solid #ebeef5
          color #333

          .upload-inner
            width 100%

            .engine-item-header
              display flex
              align-items center
              padding 10px 0 10px 20px

              >>>.svg-icon
                font-size 40px

              .engine-name
                padding-left 20px
                color #333
                font-weight 700
                font-size 20px

            .engine-item-body
              box-sizing border-box

              .engine-desc
                padding 0 50px
                color #999
                font-size 18px
                line-height 26px

        .overlay
          position absolute
          top 0
          left 0
          display flex
          justify-content center
          align-items center
          width 100%
          height 100%

          .svg-icon
            font-size 50px
            line-height 1

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
