<!--
 * @Author: 旺苍扛把子
 * @LastEditors: Please set LastEditors
 * @Description: 检测报告
 * @Date: 2019-04-16 10:07:40
 * @LastEditTime: 2019-05-21 13:53:41
 -->
<template>
  <div class="detect-report">
    <back :target="target" />
    <div class="report-inner">
      <div class="report-steps-wrapper">
        <!-- 步骤条 -->
        <el-steps direction="vertical" :active="config.steps.active">
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
        <!-- 元数据 -->
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
                :type="_getStyle(item.levelContent)"
                >{{ item.detectContent }}</el-tag
              >
            </div>
            <div class="meta-level">
              <span class="meta-title">• 危险等级</span>
              <span class="meta-content">
                <el-tag type="success" v-if="report.meta.level === 1"
                  >安全</el-tag
                >
                <el-tag type="warning" v-if="report.meta.level === 2"
                  >中危</el-tag
                >
                <el-tag type="danger" v-if="report.meta.level === 3"
                  >高危</el-tag
                >
                <el-tag type="info" v-if="report.meta.level === 4">失败</el-tag>
              </span>
            </div>
            <div class="meta-tags" v-if="report.meta.tags.length">
              <span class="meta-title">• 标签</span>
              <el-tag
                style="margin-right:5px;"
                v-for="tag in report.meta.tags"
                :key="tag.id"
                >{{ tag }}</el-tag
              >
            </div>
          </div>
          <!-- <div class="meta-manipulate-wrapper fr">
            <svg-icon
              icon-class="manipulate"
              class="manipulate-icon"
            ></svg-icon>
            <div class="manipulate" v-show="config.manipulate.visible">
              <a
                :href="report.meta.downloadLink"
                download="report.meta.downloadName"
                ><svg-icon icon-class="download" class="manipulate-item">
                </svg-icon
              ></a>
              <svg-icon icon-class="save" class="manipulate-item"></svg-icon>
              <svg-icon icon-class="refresh" class="manipulate-item"></svg-icon>
            </div>
          </div> -->
        </div>
        <!-- 基本信息 -->
        <div class="report-item report-basic" ref="basic">
          <div class="report-header">
            <svg-icon icon-class="basic"></svg-icon>
            <span class="report-title">基本信息</span>
          </div>
          <div class="report-body basic-body">
            <ul class="basic-list">
              <li>
                <span class="field">• 文件名称</span>
                <span class="description">{{
                  report.basic.objName || "-------"
                }}</span>
              </li>
              <li>
                <span class="field">• 文件类型</span>
                <span class="description">{{
                  report.basic.objType || "-------"
                }}</span>
              </li>
              <li>
                <span class="field">• 文件大小</span>
                <span class="description">{{
                  report.basic.size || "-------"
                }}</span>
              </li>
              <li>
                <span class="field">• 上传时间</span>
                <span class="description">{{
                  report.basic.uploadTime || "-------"
                }}</span>
              </li>
              <li>
                <span class="field">• MD5</span>
                <span class="description">{{
                  report.basic.md5 || "-------"
                }}</span>
              </li>
              <li>
                <span class="field">• SHA1</span>
                <span class="description">{{
                  report.basic.sha1 || "-------"
                }}</span>
              </li>
              <li>
                <span class="field">• SHA256</span>
                <span class="description">{{
                  report.basic.sha256 || "-------"
                }}</span>
              </li>
              <li>
                <span class="field">• SSDEEP</span>
                <span class="description">{{
                  report.basic.ssdeep || "-------"
                }}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 敏感信息 -->
        <div
          class="report-item report-sensi"
          ref="sensi"
          v-if="visible.reportSensi"
        >
          <div class="report-header" :class="style.reportSensi">
            <svg-icon icon-class="sensi"></svg-icon>
            <span class="report-title">敏感信息</span>
          </div>
          <div class="report-body sensi-body">
            <template>
              <!-- 语言信息 -->
              <div class="sensi-type language-info">
                <p class="title">语言信息</p>
                <el-collapse v-model="config.activeCollapseItems">
                  <el-collapse-item title="• 中文字符串" name="1">
                    <el-table
                      :data="report.sensi.languageInfo.chineseStrings"
                      border
                    >
                      <el-table-column prop="offset" label="偏移">
                      </el-table-column>
                      <el-table-column prop="value" label="内容">
                      </el-table-column>
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
                          report.sensi.languageInfo.sensiFeatures
                            .versionChineses
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
                      {{ report.sensi.developmentTrace.pdb || "-------" }}</span
                    >
                  </div>
                  <div class="development-trace-item">
                    <span class="title">• 编译时间</span
                    ><span class="content">{{
                      report.sensi.developmentTrace.compileTime || "-------"
                    }}</span>
                  </div>
                  <div class="development-trace-item">
                    <span class="title">• CodePage</span
                    ><span class="content">{{
                      report.sensi.developmentTrace.codePage || "-------"
                    }}</span>
                  </div>
                  <div class="development-trace-item">
                    <span class="title">• 作者</span
                    ><span class="content">{{
                      report.sensi.developmentTrace.author || "-------"
                    }}</span>
                  </div>
                </el-card>
              </div>
            </template>
          </div>
        </div>
        <!-- 安全仿真分析 -->
        <div
          class="report-item report-anti"
          ref="anti"
          v-if="visible.reportAnti"
        >
          <div class="report-header" :class="style.reportAnti">
            <svg-icon icon-class="anti"></svg-icon>
            <span class="report-title">安全仿真分析</span>
          </div>
          <div class="report-body anti-body">
            <el-table :data="report.anti.av_result">
              <el-table-column type="expand">
                <template slot-scope="{ row }">
                  <el-tabs type="border-card">
                    <el-tab-pane>
                      <span slot="label"
                        ><i class="el-icon-date"></i> 杀软截图</span
                      >
                      <el-carousel
                        height="450px"
                        style="width:600px;margin:0 auto;"
                        trigger="click"
                      >
                        <el-carousel-item v-for="url in row.urls" :key="url">
                          <img
                            class="anti-screenshot"
                            :src="url"
                            alt="杀软截图"
                          />
                        </el-carousel-item>
                      </el-carousel>
                    </el-tab-pane>
                    <el-tab-pane>
                      <span slot="label"
                        ><i class="el-icon-date"></i> 动态行为</span
                      >
                      <el-table
                        ref="dynamicInfo"
                        class="dynamicInfo"
                        :data="row.dynamic_info"
                        tooltip-effect="dark"
                        style="width: 100%;"
                        height="600"
                      >
                        <el-table-column
                          align="left"
                          label="行为"
                          prop="action"
                        >
                        </el-table-column>
                        <el-table-column align="center" label="描述">
                          <template slot-scope="{ row }">
                            <p
                              class="description-item"
                              v-for="(value, key) in row"
                              :key="key"
                            >
                              {{ key }}&nbsp;&nbsp;:&nbsp;&nbsp;{{ value }}
                            </p>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-tab-pane>
                    <el-tab-pane>
                      <span slot="label"
                        ><i class="el-icon-date"></i> 释放文件</span
                      >
                      <el-table
                        ref="dynamicInfo"
                        :data="row.dynamic_info"
                        tooltip-effect="dark"
                        style="width: 100%;"
                      >
                      </el-table>
                    </el-tab-pane>
                  </el-tabs>
                </template>
              </el-table-column>
              <el-table-column label="杀软名称" prop="antiName">
              </el-table-column>
              <el-table-column label="操作系统" prop="antiSystem">
              </el-table-column>
              <el-table-column label="更新时间" prop="antiUpdateTime">
              </el-table-column>
              <el-table-column label="版本" prop="antiVersion">
              </el-table-column>
              <el-table-column label="检测结果" prop="result">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("layout");
import _ from "lodash";
import axios from "axios";
import {
  getReportMeta,
  getReportBasic,
  getReportSensi,
  getReportAnti
} from "@/api/report";
export default {
  name: "DetectReport",
  components: {
    /* 按需加载组件 */
    // demo: () => import('@/pages/')
  },
  props: ["rid", "tid"],
  data() {
    return {
      // 报告信息
      report: {
        // 元数据
        meta: {
          level: "",
          detectContent: [],
          finishTime: "",
          md5: "",
          objName: "",
          tags: [],
          downloadLink: ""
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
          // 敏感信息
          developmentTrace: {},
          languageInfo: {
            chineseStrings: [],
            sensiFeatures: {},
            sensitiveLanguage: []
          }
        },
        // 安全仿真信息
        anti: {}
      },
      // 页面上的所有返回数据
      res: { signatures: [] },
      // 页面所有的配置
      config: {
        // 元数据右侧的操作盒子
        manipulate: {
          visible: true
        },
        steps: {
          active: 0
        },
        activeCollapseItems: []
      },
      style: {
        reportSensi: {},
        reportAnti: {}
      },
      visible: {
        reportSensi: false,
        reportAnti: false
      },
      steps: {
        list: [{ title: "基本信息", ref: "basic" }]
      },
      reportSelectors: []
    };
  },
  computed: {
    ...mapState(["task"]),
    target() {
      return { path: "/taskDetail/" + this.task.tid };
    }
  },
  watch: {},
  methods: {
    /**
     * @description 步骤条点击,设置当前激活的步骤条
     */
    handleStepClick(index, step) {
      this.config.steps.active = index;
      this.goAnchor(step.ref);
    },
    /**
     * @description 锚点跳转
     */
    goAnchor(ref) {
      let scrollbar = document.querySelector(
        ".app-content .el-scrollbar__wrap"
      );
      let target = this.$refs[ref];
      let offsetTop = target.offsetTop;
      console.log("TCL: goAnchor -> offsetTop", offsetTop);
      scrollbar.scrollTop = offsetTop;
    },
    /**
     * @description 元数据右侧的操作按钮进入事件
     */
    handleManipulateEnter: _.debounce(function() {
      this.config.manipulate.visible = true;
    }, 300),
    /**
     * @description 元数据右侧的操作按钮离开事件
     */
    handleManipulateLeave: _.debounce(function() {
      setTimeout(() => {
        this.config.manipulate.visible = false;
      }, 800);
    }, 300),
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
    /**
     * @description 中文字符串
     */
    _getChineseStrings(signatures) {
      let chineseStringTemp = signatures.find(signature => {
        return signature.name === "has_chinese";
      });
      return chineseStringTemp === undefined ? [] : chineseStringTemp.marks;
    },
    /**
     * @description 敏感特征信息
     */
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
    /**
     * @description 敏感信息总对象
     */
    getSensi(signatures) {
      // 敏感信息为空
      if (signatures.length === 0) {
        return null;
      } else {
        let sensitiveLanguage = this._getSensitiveLanguage(signatures);
        let chineseStrings = this._getChineseStrings(signatures);
        let sensiFeatures = this._getSensiFeature(signatures);
        let languageInfo = { sensitiveLanguage, chineseStrings, sensiFeatures };
        let developmentTrace = this._getDevelopmentTrace(signatures);
        return { languageInfo, developmentTrace };
      }
    },
    /**
     * @description 下载报告
     */
    handleReportDownload(downloadLink) {
      let aTag = document.createElement("a");
      let blob = new Blob(downloadLink); // 这个content是下载的文件内容，自己修改
      aTag.download = "报告"; // 下载的文件名
      aTag.href = URL.createObjectURL(blob);
      aTag.click();
      URL.revokeObjectURL(blob);
    },
    /**
     * @description 根据元数据检测内容生成步骤条,各个报告的可见性,各个报告header样式,各个报告dom
     */
    _generateSteps(detectContent) {
      detectContent.forEach(({ detectContent, levelContent }) => {
        switch (detectContent) {
          case "敏感信息分析":
            this.steps.list.push({ title: "敏感信息分析结果", ref: "sensi" });
            this.visible.reportSensi = true;
            this.style.reportSensi = this._getStyle(levelContent);
            break;
          case "安全仿真分析":
            this.steps.list.push({ title: "安全仿真分析结果", ref: "anti" });
            this.visible.reportAnti = true;
            this.style.reportAnti = this._getStyle(levelContent);
            break;
          default:
            break;
        }
      });
    },
    /**
     * @description 设置报告header样式
     */
    _getStyle(levelContent) {
      switch (levelContent) {
        case "安全":
          return "success";
        case "中危":
          return "warning";
        case "高危":
          return "danger";
        default:
          return "info";
      }
    },
    /**
     * @description 根据距离滚动条顶部的距离获取滚动到哪一个报告
     */
    _getReportIndex(selectors, scrollTop) {
      let floors = selectors.map(({ selector }) => {
        let dom = document.querySelector(selector);
        let { offsetHeight, offsetTop } = dom;
        return offsetHeight + offsetTop;
      });
      floors.shift();
      console.log(floors);
      return floors.findIndex(offsetTop => offsetTop >= scrollTop);
    },

    _initScrollBar() {
      let scrollbar = document.querySelector(
        ".app-content .el-scrollbar__wrap"
      );
      let _this = this;
      scrollbar.addEventListener(
        "scroll",
        _.debounce(function() {
          // 滚动条距离顶部的距离
          let scrollTop = scrollbar.scrollTop;
          let index = _this._getReportIndex(_this.reportSelectors, scrollTop);
          console.log(index);
          _this.config.steps.active = index;
        }, 300)
      );
    },
    /**
     * @description 根据检测内容返回需要渲染dom
     */
    _getReportSelectors(detectContent) {
      let arr = [
        {
          selector: ".report-basic"
        }
      ];
      detectContent.forEach(({ detectContent }) => {
        let dom = {};
        switch (detectContent) {
          case "敏感信息分析":
            dom.selector = ".report-sensi";
            // dom.offsetTop = document.querySelector(".report-sensi").offsetTop;
            break;
          case "安全仿真分析":
            dom.selector = ".report-anti";
            // dom.offsetTop = document.querySelector(".report-anti").offsetTop;
            break;
          default:
            break;
        }
        arr.push(dom);
      });
      return arr;
    },
    /**
     * @description 初始化报告数据
     */
    async initReport() {
      let rid = this.rid;
      try {
        let { data: reportMeta } = await getReportMeta(rid);
        // 设置元数据
        this.report.meta = reportMeta;
        let { detectContent } = reportMeta;
        // 生成步骤条
        this._generateSteps(detectContent);
        this.reportSelectors = this._getReportSelectors(detectContent);
        // 要执行并发的请求
        let promiseAll = [getReportBasic(rid)];
        // 报告类型
        let reportType = ["basic"];
        // 根据元数据的检测内容添加请求
        detectContent.forEach(({ detectId }) => {
          switch (detectId) {
            case 1:
              promiseAll.push(getReportSensi(rid));
              reportType.push("sensi");
              break;
            case 2:
              promiseAll.push(getReportAnti(rid));
              reportType.push("anti");
              break;
            default:
              break;
          }
        });
        let resAll = await axios.all(promiseAll);
        // 各个类型的报告赋值
        resAll.forEach(({ data }, index) => {
          let type = reportType[index];
          // 报告类型时敏感报告,要单独处理
          if (type === "sensi") {
            let sensi = this.getSensi(data.signatures);
            if (sensi !== null) {
              this.report.sensi = sensi;
            }
          } else {
            // 数据是null就使用data里的默认数据
            if (!_.isNull(data)) {
              this.report[type] = data;
            }
          }
        });
      } catch (e) {
        throw e;
      }
    }
  },
  created() {
    (async () => {
      try {
        await this.initReport();
      } catch (e) {
        console.log(e);
      }
    })();
  },
  mounted() {
    this._initScrollBar();
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
  padding 0 20px 20px 20px
  .report-inner
    background-color #fff
    .report-steps-wrapper
      position absolute
      top 50%
      left 30px
      width 200px
      height 400px
      transform translateY(-50%)
    .report-content
      padding 20px 0 0 310px
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
      .report-item
        margin 12px
        border 1px solid #ebeef5
        box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.1)
        font-size 14px
        .report-header
          padding 10px 20px
          border-bottom 1px solid #ebeef5
          font-size 0
          &.success
            background-color #67c23a
          &.warning
            background-color #e6a23c
          &.danger
            background-color rgb(245,108,108)
          &.info
            background-color rgb(144,147,153)
          .svg-icon
            vertical-align middle
            font-size 30px
          .report-title
            margin-left 15px
            vertical-align middle
            font-size 20px
        .report-body
          padding 10px 20px
      .report-basic
        .basic-body
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
        .sensi-body
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
              .aaa
                color #000
      .report-anti
        .anti-body
          .anti-screenshot
            width 600px
            height 450px
          .dynamicInfo
            .description-item
              text-align left
</style>
