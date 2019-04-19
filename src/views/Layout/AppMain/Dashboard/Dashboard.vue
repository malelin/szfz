<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 控制面板组件
 * @Date: 2019-03-29 10:14:42
 * @LastEditTime: 2019-04-19 16:09:40
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
      </div>
      <div class="engine-container-body">
        <ul class="engine-list">
          <li class="engine-item">
            <el-upload
              class="upload-sensi"
              drag
              :show-file-list="false"
              :name="config.engines.engineSensi.name"
              :action="config.engines.engineSensi.action"
              :headers="config.engines.engineSensi.headers"
              :on-error="onSensiUploadErr"
              :on-success="onSensiUploadSuccess"
              :before-upload="SensiFileBeforeUpload"
            >
              <div class="engine-item-header">
                <svg-icon icon-class="mgxxfx"></svg-icon>
                <span class="engine-name">敏感信息分析</span>
              </div>
              <div class="engine-item-body">
                <p class="engine-desc">
                  我们这个引擎可牛逼了,我们这个引擎可牛逼了,我们这个引擎可牛逼了,
                </p>
              </div>
              <!-- <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                只能上传jpg/png文件，且不超过500kb
              </div> -->
            </el-upload>
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
import { createTask } from "@/api/task";
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
      threatRes: { day: {}, week: {}, month: {}, year: [] },
      config: {
        engines: {
          // 敏感引擎
          engineSensi: {
            name: "object",
            action: process.env.VUE_APP_BASE_API + "/v1/filemanage/object",
            headers: {
              "Digark-Access-Header": sessionStorage.getItem("token")
            }
          }
        }
      }
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
    },
    /**
     * @description 敏感信息引擎上传文件成功
     */
    async onSensiUploadSuccess({ status, data: object }) {
      if (status === 200) {
        let obj = this._formatFile2SensiObject(object);
        let taskData = {
          model: 2,
          objects: [obj]
        };
        try {
          let { status } = await createTask(taskData);
          if (status === 200) {
            this.$message({
              type: "success",
              message: "敏感信息风行引擎任务创建成功"
            });
            this.$router.push("/taskOverview");
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
     * @description 敏感信息引擎上传文件出错
     */
    onSensiUploadErr(err, file, fileList) {
      console.log(fileList);
    },
    /**
     * @description 敏感信息引擎上传文件之前
     */
    SensiFileBeforeUpload() {},
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
  font-size: 18px;
}
.dashboard .el-upload {
  width: 100%;
}
.dashboard .el-upload-dragger {
  width: 100%;
  border-color: #fff;
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
      flex 0 0 54%
      overflow hidden
      margin 12px 0
      background-color #fff
      box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.1)

      &:hover
        box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.2)

    .wxlxfb
      flex 0 0 45%
      margin 12px 0
      background-color #fff
      box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.1)

      &:hover
        box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.2)

  .engine-container
    box-sizing border-box
    margin 0 12px
    margin-bottom 20px
    background-color #fff
    box-shadow 0 2px 12px 3px rgba(0, 0, 0, 0.1)

    &:hover
      box-shadow 0 2px 12px 3px rgba(0, 0, 0, 0.2)

    &-header
      display flex
      justify-content space-between
      padding 20px
      border-bottom 1px solid #ebeef5

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
          flex 0 0 33.33%
          box-sizing border-box
          padding 20px
          border 1px solid #ebeef5

          &-header
            display flex
            align-items center
            padding 0 0 10px 10px

            >>>.svg-icon
              font-size 40px

            .engine-name
              padding-left 20px
              color #333
              font-weight 700
              font-size 20px

          &-body
            .engine-desc
              color #999
</style>
