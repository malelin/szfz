<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 检测报告
 * @Date: 2019-04-16 10:07:40
 * @LastEditTime: 2019-04-17 16:29:51
 -->
<template>
  <div class="detect-report">
    <div class="report-steps-wrapper">
      <!-- 步骤条 -->
      <el-steps direction="vertical" :active="steps.active">
        <el-step
          :title="step.title"
          v-for="(step, index) in steps.list"
          :key="step.title"
          @click.native="handleStepClick(index)"
        ></el-step>
      </el-steps>
    </div>
    <div class="report-content">
      <!-- 报告元数据 -->
      <div class="report-meta clearfix">
        <div class="meta-info fl">
          <div class="meta-obj-name">
            <span class="meta-title">文件名称</span>
            <span class="meta-content">{{ report.meta.objName }}</span>
          </div>
          <div class="meta-md5">
            <span class="meta-title">MD5</span>
            <span class="meta-content">{{ report.meta.md5 }}</span>
          </div>
          <div class="meta-finish-time">
            <span class="meta-title">检测完成时间</span>
            <span class="meta-content">{{ report.meta.finishTime }}</span>
          </div>
          <div class="meta-detect-content">
            <span class="meta-title">检测内容</span>
            <el-tag
              style="margin-right:5px;"
              v-for="item in report.meta.detectContent"
              :key="item.id"
              >{{ item }}</el-tag
            >
          </div>
          <div class="meta-level">
            <span class="meta-title">危险等级</span>
            <span class="meta-content">{{ report.meta.level }}</span>
          </div>
          <div class="meta-tags" v-if="report.meta.tags.length">
            <span class="meta-title">标签</span>
            <el-tag
              style="margin-right:5px;"
              type="warning"
              v-for="tag in report.meta.tags"
              :key="tag.id"
              >{{ tag }}</el-tag
            >
          </div>
        </div>
        <div class="meta-manipulate-wrapper fr">
          <svg-icon icon-class="manipulate" class="manipulate-icon"></svg-icon>
          <div class="manipulate">
            <svg-icon icon-class="download" class="manipulate-item"></svg-icon>
            <svg-icon icon-class="save" class="manipulate-item"></svg-icon>
            <svg-icon icon-class="refresh" class="manipulate-item"></svg-icon>
          </div>
        </div>
      </div>
      <!-- 报告基本信息 -->
      <div class="report-basic">
        <div class="basic-header">
          <svg-icon icon-class="basic"></svg-icon>
          <span class="basic-title">基本信息</span>
        </div>
        <div class="basic-body">
          <ul class="basic-list">
            <li>
              <span class="field">文件名称</span>
              <span class="description">{{ report.basic.objName }}</span>
            </li>
            <li>
              <span class="field">文件类型</span>
              <span class="description">{{ report.basic.objType }}</span>
            </li>
            <li>
              <span class="field">文件大小</span>
              <span class="description">{{ report.basic.size }}</span>
            </li>
            <li>
              <span class="field">上传时间</span>
              <span class="description">{{ report.basic.uploadTime }}</span>
            </li>
            <li>
              <span class="field">MD5</span>
              <span class="description">{{ report.basic.md5 }}</span>
            </li>
            <li>
              <span class="field">SHA1</span>
              <span class="description">{{ report.basic.sha1 }}</span>
            </li>
            <li>
              <span class="field">SHA256</span>
              <span class="description">{{ report.basic.sha256 }}</span>
            </li>
            <li>
              <span class="field">SSDEEP</span>
              <span class="description">{{ report.basic.ssdeep }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 报告敏感信息 -->
      <div class="report-sensi">
        <div class="sensi-header">
          <svg-icon icon-class="sensi"></svg-icon>
          <span class="sensi-title">敏感信息</span>
        </div>
        <div class="sensi-body">
          <!-- 语言信息 -->
          <div class="sensi-type language-info">
            <p class="title">语言信息</p>
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="中文字符串" name="1"> </el-collapse-item>
              <el-collapse-item title="资源特性信息" name="2">
              </el-collapse-item>
              <el-collapse-item title="敏感特征信息" name="3">
              </el-collapse-item>
            </el-collapse>
          </div>
          <!-- kf痕迹 -->
          <div class="sensi-type develop-trace">
            <p class="title">
              开发痕迹
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getReportMeta, getReportBasic, getReportSensi } from "@/api/report";
export default {
  name: "DetectReport",
  components: {
    /* 按需加载组件 */
    // demo: () => import('@/pages/')
  },
  props: {
    rid: {
      type: Number
    }
  },
  data() {
    return {
      // 步骤条
      steps: {
        list: [
          { title: "基本信息" },
          { title: "敏感信息分析结果" },
          { title: "同源分析结果" },
          { title: "网络仿真检测结果" },
          { title: "工具变形结果" },
          { title: "漏洞工具验证结果" }
        ],
        active: 0
      },
      // 报告信息
      report: {
        meta: {
          tags: []
        },
        basic: {},
        sensi: {}
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    /**
     * @description 步骤条点击,设置当前激活的步骤条
     */
    handleStepClick(index) {
      this.steps.active = index;
    }
  },
  created() {},
  mounted() {},
  beforeRouteEnter(to, from, next) {
    // 并发请求报告信息
    let rid = parseInt(to.params.rid);
    axios
      .all([getReportMeta(rid), getReportBasic(rid), getReportSensi(rid)])
      .then(
        axios.spread(function(resReportMeta, resReportBasic, resReportSensi) {
          let { data: reportMeta } = resReportMeta;
          let { data: reportBasic } = resReportBasic;
          let { data: ReportSensi } = resReportSensi;
          // 两个请求现在都执行完成
          next(vm => {
            vm.report.meta = reportMeta;
            vm.report.basic = reportBasic;
            vm.report.sensi = ReportSensi;
          });
        })
      );
  }
};
</script>
<style>
.detect-report .el-collapse-item__header {
  font-size: 16px;
}
</style>

<style lang="stylus" scoped>
.detect-report
  display flex
  padding 20px
  background-color #fff

  .report-steps-wrapper
    padding 100px 100px 0 0
    height 400px

  .report-content
    flex 1
    overflow hidden

    .report-meta
      margin 12px
      padding 20px
      border 1px solid rgb(235, 238, 245)
      border-radius 4px
      background-color #fff
      box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.1)
      font-size 14px

      .meta-info
        >div
          padding 10px 0

          .meta-title
            width 150px
            color #666
            text-align left

          .meta-content
            color #999

      .meta-manipulate-wrapper
        padding-top 20px

        .svg-icon
          display block
          font-size 25px

        .manipulate-icon
          fill #2A82E4

          &:hover
            border-radius 50%
            cursor pointer
            fill #44668c

        .manipulate
          margin-top 15px
          line-height 1

          .manipulate-item
            padding-top 15px
            cursor pointer
            fill #A6A6A6

            &:hover
              fill #4391E7

    .report-basic
      margin 12px
      border 1px solid #ebeef5
      box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.1)
      font-size 14px

      .basic-header
        padding 10px 20px
        border-bottom 1px solid #ebeef5
        font-size 0

        .svg-icon
          vertical-align middle
          font-size 30px

        .basic-title
          margin-left 15px
          vertical-align middle
          font-size 20px

      .basic-body
        padding 10px 20px

        .basic-list
          >li
            padding 10px 0
            color #666

            .field
              display inline-block
              width 150px

            .description
              color #999

    .report-sensi
      margin 12px
      border 1px solid #ebeef5
      box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.1)
      font-size 14px

      .sensi-header
        padding 10px 20px
        border-bottom 1px solid #ebeef5
        font-size 0

        .svg-icon
          vertical-align middle
          font-size 30px

        .sensi-title
          margin-left 15px
          vertical-align middle
          font-size 20px

      .sensi-body
        padding 10px 20px

        .sensi-type
          padding 10px 0

          .title
            vertical-align middle
            font-weight 600
            font-size 16px
            line-height 25px

            &::before
              display inline-block
              margin-right 8px
              width 3px
              height 25px
              background-color #73ADED
              content ''
              vertical-align middle
</style>
