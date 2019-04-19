<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 检测报告
 * @Date: 2019-04-16 10:07:40
 * @LastEditTime: 2019-04-19 10:57:06
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
          href="#basic"
          @click.native="handleStepClick(index, step)"
        ></el-step>
      </el-steps>
    </div>
    <div class="report-content">
      <!-- 报告元数据 -->
      <div class="report-meta clearfix">
        <div class="meta-info fl">
          <div class="meta-obj-name">
            <span class="meta-title">• 文件名称</span>
            <span class="meta-content">{{ report.meta.objName }}</span>
          </div>
          <div class="meta-md5">
            <span class="meta-title">• MD5</span>
            <span class="meta-content">{{ report.meta.md5 }}</span>
          </div>
          <div class="meta-finish-time">
            <span class="meta-title">• 检测完成时间</span>
            <span class="meta-content">{{ report.meta.finishTime }}</span>
          </div>
          <div class="meta-detect-content">
            <span class="meta-title">• 检测内容</span>
            <el-tag
              style="margin-right:5px;"
              v-for="item in report.meta.detectContent"
              :key="item.id"
              >{{ item.detectContent }}</el-tag
            >
          </div>
          <div class="meta-level">
            <span class="meta-title">• 危险等级</span>
            <span class="meta-content">{{ report.meta.level }}</span>
          </div>
          <div class="meta-tags" v-if="report.meta.tags.length">
            <span class="meta-title">• 标签</span>
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
          <div class="manipulate" v-show="manipulate.visible">
            <svg-icon icon-class="download" class="manipulate-item"></svg-icon>
            <svg-icon icon-class="save" class="manipulate-item"></svg-icon>
            <svg-icon icon-class="refresh" class="manipulate-item"></svg-icon>
          </div>
        </div>
      </div>
      <!-- 报告基本信息 -->
      <div class="report-basic" ref="basic">
        <div class="basic-header">
          <svg-icon icon-class="basic"></svg-icon>
          <span class="basic-title">基本信息</span>
        </div>
        <div class="basic-body">
          <ul class="basic-list">
            <li>
              <span class="field">• 文件名称</span>
              <span class="description">{{ report.basic.objName }}</span>
            </li>
            <li>
              <span class="field">• 文件类型</span>
              <span class="description">{{ report.basic.objType }}</span>
            </li>
            <li>
              <span class="field">• 文件大小</span>
              <span class="description">{{ report.basic.size }}</span>
            </li>
            <li>
              <span class="field">• 上传时间</span>
              <span class="description">{{ report.basic.uploadTime }}</span>
            </li>
            <li>
              <span class="field">• MD5</span>
              <span class="description">{{ report.basic.md5 }}</span>
            </li>
            <li>
              <span class="field">• SHA1</span>
              <span class="description">{{ report.basic.sha1 }}</span>
            </li>
            <li>
              <span class="field">• SHA256</span>
              <span class="description">{{ report.basic.sha256 }}</span>
            </li>
            <li>
              <span class="field">• SSDEEP</span>
              <span class="description">{{ report.basic.ssdeep }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 报告敏感信息 -->
      <div class="report-sensi" ref="sensi">
        <div class="sensi-header">
          <svg-icon icon-class="sensi"></svg-icon>
          <span class="sensi-title">敏感信息</span>
        </div>
        <div class="sensi-body">
          <!-- 语言信息 -->
          <div class="sensi-type language-info">
            <p class="title">语言信息</p>
            <el-collapse
              v-model="report.sensi.chineseStringConfig.activeCollapseItems"
            >
              <el-collapse-item title="• 中文字符串" name="1">
                <el-table
                  :data="report.sensi.languageInfo.chineseStrings"
                  border
                >
                  <el-table-column prop="offset" label="偏移">
                  </el-table-column>
                  <el-table-column prop="value" label="内容"> </el-table-column>
                </el-table>
              </el-collapse-item>
              <el-collapse-item title="• 资源特性信息" name="2">
                <el-table
                  :data="report.sensi.languageInfo.sensitiveLanguage"
                  border
                >
                  <el-table-column prop="offset" label="偏移">
                  </el-table-column>
                  <el-table-column prop="language" label="语言">
                  </el-table-column>
                  <el-table-column prop="sublanguage" label="子语言">
                  </el-table-column>
                </el-table>
              </el-collapse-item>
              <el-collapse-item title="• 敏感特征信息" name="3">
                <el-card
                  class="box-card"
                  style="margin-top:20px;"
                  shadow="hover"
                >
                  <div slot="header" class="clearfix">
                    <span class="sensi-feature-title">• 清单文件</span>
                  </div>
                  <el-table
                    :data="report.sensi.languageInfo.sensiFeatures.mainfest"
                    border
                  >
                    <el-table-column prop="filename" label="文件名">
                    </el-table-column>
                    <el-table-column prop="offset" label="偏移">
                    </el-table-column>
                    <el-table-column prop="size" label="大小">
                    </el-table-column>
                  </el-table>
                </el-card>
                <el-card
                  class="box-card"
                  style="margin-top:20px;"
                  shadow="hover"
                >
                  <div slot="header" class="clearfix">
                    <span class="sensi-feature-title">• 敏感字符</span>
                  </div>
                  <el-table
                    :data="
                      report.sensi.languageInfo.sensiFeatures.sensitiveChars
                    "
                    border
                  >
                    <el-table-column prop="filename" label="文件名">
                    </el-table-column>
                    <el-table-column prop="offset" label="偏移">
                    </el-table-column>
                    <el-table-column prop="value" label="内容">
                    </el-table-column>
                  </el-table>
                </el-card>
                <el-card
                  class="box-card"
                  style="margin-top:20px;"
                  shadow="hover"
                >
                  <div slot="header" class="clearfix">
                    <span class="sensi-feature-title">• 拼音</span>
                  </div>
                  <el-table
                    :data="report.sensi.languageInfo.sensiFeatures.pinyins"
                    border
                  >
                    <el-table-column prop="filename" label="文件名">
                    </el-table-column>
                    <el-table-column prop="offset" label="偏移">
                    </el-table-column>
                    <el-table-column prop="value" label="内容">
                    </el-table-column>
                  </el-table>
                </el-card>
                <el-card
                  class="box-card"
                  style="margin-top:20px;"
                  shadow="hover"
                >
                  <div slot="header" class="clearfix">
                    <span class="sensi-feature-title"
                      >• version资源中存在中文</span
                    >
                  </div>
                  <el-table
                    :data="
                      report.sensi.languageInfo.sensiFeatures.versionChineses
                    "
                    border
                  >
                    <el-table-column prop="filename" label="文件名">
                    </el-table-column>
                    <el-table-column prop="offset" label="偏移">
                    </el-table-column>
                    <el-table-column prop="value" label="内容">
                    </el-table-column>
                  </el-table>
                </el-card>
              </el-collapse-item>
            </el-collapse>
          </div>
          <!-- kf痕迹 -->
          <div class="sensi-type develop-trace">
            <p class="title">
              开发痕迹
            </p>
            <el-card shadow="hover">
              <div class="development-trace-item">
                <span class="title">• PDB调试符号路径</span
                ><span class="content">
                  {{ report.sensi.developmentTrace.pdb || "---------" }}</span
                >
              </div>
              <div class="development-trace-item">
                <span class="title">• 编译时间</span
                ><span class="content">{{
                  report.sensi.developmentTrace.compileTime || "---------"
                }}</span>
              </div>
              <div class="development-trace-item">
                <span class="title">• CodePage</span
                ><span class="content">{{
                  report.sensi.developmentTrace.codePage || "---------"
                }}</span>
              </div>
              <div class="development-trace-item">
                <span class="title">• 作者</span
                ><span class="content">{{
                  report.sensi.developmentTrace.author || "---------"
                }}</span>
              </div>
            </el-card>
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
  props: ["rid"],
  data() {
    return {
      // 步骤条
      steps: {
        list: [
          { title: "基本信息", ref: "basic" },
          { title: "敏感信息分析结果", ref: "sensi" },
          { title: "同源分析结果", ref: "sensi" },
          { title: "网络仿真检测结果", ref: "sensi" },
          { title: "工具变形结果", ref: "sensi" },
          { title: "漏洞工具验证结果", ref: "sensi" }
        ],
        active: 0
      },
      // 报告信息
      report: {
        // 元数据
        meta: {
          level: "",
          detectContent: [],
          finishTime: "",
          md5: "",
          objName: "",
          tags: []
        },
        // 基本信息
        basic: {
          objName: "",
          ssdeep: "",
          sha256: "",
          sha1: "",
          md5: "",
          uploadTime: "",
          size: "",
          objType: ""
        },
        // 敏感信息
        sensi: {
          chineseStringConfig: {
            activeCollapseItems: ["1", "2", "3"]
          },
          // 敏感信息
          developmentTrace: {},
          languageInfo: {
            chineseStrings: [],
            sensiFeatures: {},
            sensitiveLanguage: []
          }
        }
      },
      // 页面上的所有返回数据
      res: { signatures: [] },
      // 元数据右侧的操作盒子
      manipulate: {
        visible: true
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    /**
     * @description 步骤条点击,设置当前激活的步骤条
     */
    handleStepClick(index, step) {
      this.steps.active = index;
      this.goAnchor(step.ref);
    },

    // 锚点跳转
    goAnchor(ref) {
      let scrollbar = document.querySelector(
        ".app-content .el-scrollbar__wrap"
      );
      let target = this.$refs[ref];
      let offsetTop = target.offsetTop;
      scrollbar.scrollTop = offsetTop;
    },
    // 资源特征信息
    _getSensitiveLanguage(signatures) {
      let res = signatures.find(signature => {
        return signature.name === "has_sensitiveLanguage";
      });
      return res === undefined ? [] : res.marks;
    },
    // 开发痕迹
    _getDevelopmentTrace(signatures) {
      // 作者
      let authorTemp = signatures.find(signature => {
        return signature.name === "has_author";
      });
      let author =
        authorTemp === undefined ? "---------" : authorTemp.marks[0].author;
      // 编译时间
      let compileTimeTemp = signatures.find(signature => {
        return signature.name === "has_beijingTime";
      });
      let compileTime =
        compileTimeTemp === undefined
          ? "---------"
          : compileTimeTemp.marks[0].create_time;
      //codepage
      let codePageTemp = signatures.find(signature => {
        return signature.name === "has_codepage";
      });
      let codePage =
        codePageTemp === undefined
          ? "---------"
          : codePageTemp.marks[0].codepage;
      //pdb调试符号路径
      let pdbTemp = signatures.find(signature => {
        return signature.name === "has_pdb";
      });
      let pdb = pdbTemp === undefined ? "---------" : pdbTemp.marks[0].pdb_path;
      return { author, compileTime, codePage, pdb };
    },
    //中文字符串
    _getChineseStrings(signatures) {
      let chineseStringTemp = signatures.find(signature => {
        return signature.name === "has_chinese";
      });
      return chineseStringTemp === undefined ? [] : chineseStringTemp.marks;
    },
    // 敏感特征信息
    _getSensiFeature(signatures) {
      // 清单文件
      let mainfestTemp = signatures.find(signature => {
        return signature.name === "has_manifest";
      });
      let mainfest = mainfestTemp === undefined ? [] : mainfestTemp.marks;
      // 敏感字符
      let sensitiveCharsTemp = signatures.find(signature => {
        return signature.name === "has_sensitiveChar";
      });
      let sensitiveChars =
        sensitiveCharsTemp === undefined ? [] : sensitiveCharsTemp.marks;
      // 拼音
      let pinyinTemp = signatures.find(signature => {
        return signature.name === "has_pinyin";
      });
      let pinyins = pinyinTemp === undefined ? [] : pinyinTemp.marks;
      // version资源中存在中文
      let versionChineseTemp = signatures.find(signature => {
        return signature.name === "has_versionChinese";
      });
      let versionChineses =
        versionChineseTemp === undefined ? [] : versionChineseTemp.marks;

      return {
        mainfest,
        sensitiveChars,
        pinyins,
        versionChineses
      };
    },
    // 敏感信息
    getSensi(signatures) {
      // 敏感信息为空
      if (signatures.length === 0) {
        return {};
      } else {
        let sensitiveLanguage = this._getSensitiveLanguage(signatures);
        let chineseStrings = this._getChineseStrings(signatures);
        let sensiFeatures = this._getSensiFeature(signatures);
        let languageInfo = { sensitiveLanguage, chineseStrings, sensiFeatures };
        let developmentTrace = this._getDevelopmentTrace(signatures);
        return { languageInfo, developmentTrace };
      }
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
          let { data: reportSensi } = resReportSensi;
          // 两个请求现在都执行完成
          next(vm => {
            vm.report.meta = reportMeta;
            vm.report.basic = reportBasic;
            if (reportSensi !== null) {
              vm.signatures = reportSensi.signatures;
              let obj = vm.getSensi(reportSensi.signatures);
              vm.report.sensi = Object.assign({}, vm.report.sensi, obj);
            } else {
              vm.report.sensi = Object.assign({}, vm.report.sensi);
            }
          });
        })
      );
  }
};
</script>
<style>
/* 重写element折叠面板标题字体大小 */
.detect-report .el-collapse-item__header {
  font-size: 16px;
}
.detect-report .el-step {
  cursor: pointer;
}
</style>

<style lang="stylus" scoped>
.detect-report
  padding 20px
  background-color #fff

  .report-steps-wrapper
    position absolute
    top 30%
    left 30px
    width 300px
    height 400px
    transform translateY(-50%)

  .report-content
    padding-left 310px

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
            color #2a82e4
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
              color #2a82e4

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

          >.title
            padding-bottom 15px
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

          .box-card
            .sensi-feature-title
              color #2a82e4
              font-size 15px

          .development-trace-item
            padding 10px 0

            .title
              width 250px
              color #2a82e4
</style>
