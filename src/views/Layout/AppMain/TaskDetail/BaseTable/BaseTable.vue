<!--
 * @Author: 旺苍扛把子
 * @LastEditors: Please set LastEditors
 * @Description: 封装任务详情和新建任务中的表格
 * @Date: 2019-04-12 09:46:16
 * @LastEditTime: 2019-05-20 18:13:57
 -->
<template>
  <div class="base-table task-settings box-shadow-6">
    <div class="settings-header">
      <h2>任务详情</h2>
      <div class="tool-box">
        <el-button
          v-if="taskStatus === 1"
          :disabled="controllable"
          @click.native="handleDeleteBatch"
          >批量删除</el-button
        >
        <el-button
          v-if="taskStatus === 1"
          :disabled="controllable"
          @click.native="handleSettingsBatch"
          >批量设置</el-button
        >
      </div>
    </div>
    <div class="settings-body">
      <el-table
        ref="multipleTable"
        :data="newList"
        tooltip-effect="dark"
        style="width: 100%"
        class="c-el-table"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection" width="55">
        </el-table-column>
        <el-table-column align="center" label="文件名称" prop="name">
        </el-table-column>
        <el-table-column label="上传进度" v-if="taskStatus === 1">
          <template slot-scope="{ row }">
            <transition name="fade">
              <el-progress
                v-if="parseInt(row.percentage)"
                :percentage="parseInt(row.percentage)"
                :stroke-width="18"
                :status="row.status === 'success' ? 'success' : 'text'"
                :text-inside="true"
              ></el-progress
            ></transition>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="fileType"
          width="100"
          label="文件类型"
        >
          <template slot-scope="{ row }"
            >{{ row.fileType || (row.response && row.response.data.fileType) }}
          </template></el-table-column
        >
        <el-table-column align="center" prop="size" width="90" label="大小(kb)">
          <template slot-scope="{ row }">
            {{ Math.ceil(row.size / 1024) }}kb
          </template>
        </el-table-column>
        <el-table-column align="center" prop="fileMD5" label="MD5">
          <template slot-scope="{ row }"
            >{{ row.fileMD5 || (row.response && row.response.data.fileMD5) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="任务内容">
          <template slot-scope="{ row }">
            <el-tag
              v-if="
                typeof row.setting !== 'undefined' &&
                  row.setting.sensi.isChecked
              "
              >敏感信息分析</el-tag
            >
            <el-tag
              v-if="
                typeof row.setting !== 'undefined' && row.setting.anti.isChecked
              "
              >安全仿真分析
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="结果" v-show="taskStatus !== 1">
          <template slot-scope="{ row }">
            <status :status-config="statusConfig" :status="row.objectResult" />
          </template>
        </el-table-column>
        <el-table-column
          width="100px"
          prop="operate"
          label="操作"
          align="center"
        >
          <template slot-scope="{ row, $index }">
            <div class="operate-box">
              <svg-icon
                v-show="taskStatus === 1"
                icon-class="edit"
                class="operate-item"
                style="margin-right:15px;font-size:20px;"
                @click.native="handleSettingSingle($index, row)"
              ></svg-icon>
              <svg-icon
                v-show="taskStatus === 1"
                class="operate-item"
                icon-class="remove"
                style="font-size:20px;"
                @click.native="handleRemove($index, row)"
              ></svg-icon>
              <el-popover
                placement="top-start"
                width="300"
                :open-delay="300"
                trigger="hover"
              >
                <el-scrollbar class="el-card-wrapper">
                  <div class="report-wrapper">
                    <div
                      v-for="report in objectReport.list"
                      :key="report.rid"
                      class="report"
                      @click="handleReportListClick(report.rid)"
                    >
                      <p class="report-name">{{ report.reportName }}</p>
                      <p class="generate-time">{{ report.generateTime }}</p>
                    </div>
                  </div>
                </el-scrollbar>
                <el-button
                  slot="reference"
                  v-show="
                    typeof row.objectResult !== 'undefined' &&
                      row.objectResult !== 5
                  "
                  type="success"
                  size="mini"
                  @mouseenter.native="handleView(row)"
                  >查看报告</el-button
                >
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="{ row }">
            <setting-overview :row="row" />
          </template>
        </el-table-column>
      </el-table>
      <el-row
        type="flex"
        style="margin-top:20px;"
        justify="center"
        align="middle"
        v-if="taskStatus === 1"
      >
        <el-col :span="24"
          ><el-upload
            class="c-el-upload"
            ref="r_el_upload"
            drag
            multiple
            :show-file-list="false"
            :action="upload.action"
            :name="upload.name"
            :on-error="fileOnError"
            :on-success="fileOnSuccess"
            :on-progress="fileOnProgress"
            :before-upload="fileBeforeUpload"
            :headers="upload.headers"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或点击上传
            </div>
          </el-upload></el-col
        >
      </el-row>
      <el-row
        style="margin-top:20px"
        type="flex"
        justify="end"
        v-if="taskStatus === 1"
      >
        <el-button
          style="margin-right:20px;"
          type="info"
          @click.native="handleSave(1)"
          plain
          >保存</el-button
        >
        <el-button
          style="margin-right:20px;"
          @click.native="handleSave(2)"
          type="primary"
          >保存并执行</el-button
        >
      </el-row>
    </div>
    <task-setting
      :taskSetting="modalTaskSetting"
      @get-task-setting="getTaskSetting"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapMutations } = createNamespacedHelpers("layout");
import _ from "lodash";
import { getTaskDetailList, createTask, modifyTask } from "@/api/task";
import { getAntiList } from "@/api/anti";
import { getReportList } from "@/api/report";
export default {
  name: "BaseTable",
  components: {
    /* 按需加载组件 */
    SettingOverview: () => import("../../SettingOverview/SettingOverview"),
    TaskSetting: () => import("../../TaskSetting/TaskSetting")
  },
  props: {
    // 任务tid
    tid: {
      type: Number,
      required: true
    },
    // 任务状态
    taskStatus: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      // el-upload配置
      upload: {
        name: "object",
        action: window.g.ApiUrl + "/v1/filemanage/object",
        percent: 0,
        showProgress: false,
        headers: {
          "Digark-Access-Header": sessionStorage.getItem("token")
        },
        showFileList: false
      },
      // 文件上传列表
      uploadFileList: [],
      // 任务详情请求到的列表
      detailList: [],
      // 多选选中项
      multipleSelection: [],
      //任务可选信息
      taskOptinalInfo: {
        // 任务名称
        taskname: "",
        // 任务描述
        remarks: "",
        //使用默认名称
        isDefaultName: true
      },
      // status组件配置
      statusConfig: [
        { text: "安全", color: "#67C23A" },
        { text: "中危", color: "#aaaaaa" },
        { text: "高危", color: "#f66600" },
        { text: "失败", color: "#F56C6C" },
        { text: "进行中", color: "#409EFF" }
      ],
      // 每个对象的报告
      objectReport: {
        list: [],
        meta: {},
        basic: {},
        oid: ""
      },
      // 任务设置模态框
      modalTaskSetting: {
        // 敏感信息分析
        sensi: { isChecked: false },
        // 安全仿真分析
        anti: {
          isChecked: false,
          // 选中的杀软
          aids: [],
          // 检测模式
          model: 1,
          // 网络状态
          network: 2,
          // 命令行参数
          param: "",
          // 选中的检测时长
          time: 1
        }
      },
      typeOpen: "",
      // 当前组件所有接口返回
      res: {
        // 杀软列表
        antiList: {},
        taskDetailList: {}
      },
      // 当前编辑的row
      currentRow: {},
      ws: null
    };
  },
  computed: {
    // 当前是否可以控制创建任务按钮,创建并执行任务按钮,批量删除按钮,批量设置按钮
    controllable() {
      return this.newList.length === 0;
    },
    newList() {
      return this.detailList.concat(this.uploadFileList);
    }
  },
  watch: {
    // 监听objectReport的oid改变,执行获取该oid的报告信息的请求
    async "objectReport.oid"(newValue) {
      await getReportList(newValue);
    }
  },
  methods: {
    ...mapMutations(["setDefaultActive", "setTaskTid"]),
    /**
     * @description 处理表格选中项改变
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * @description 上传文件之前的钩子，
     * @param {file} file 上传的文件
     * @returns 若返回 false 或者返回 Promise 且被 reject，则停止上传。
     */
    fileBeforeUpload(file) {
      let maxSize = 31457280;
      // 判断文件是否有后缀
      if (file.size > maxSize) {
        this.$message({
          type: "warning",
          message: "传入的文件不能大于30mb"
        });
        return false;
      }
    },
    /**
     * @description 文件上传时的钩子
     */
    fileOnProgress(event, file, fileList) {
      // 更新上传列表
      this.uploadFileList = fileList;
    },
    /**
     * @description 文件上传成功钩子
     */
    fileOnSuccess({ msg, status }, file) {
      // 更新上传列表
      if (status === 200) {
        let fileMD5 = file.response.data.fileMD5;
        console.log(fileMD5);
        let repeatIndex = [];
        this.uploadFileList.filter((item, index) => {
          let response = item.response;
          if (typeof response !== "undefined") {
            if (fileMD5 === response.data.fileMD5) {
              repeatIndex.push(index);
            }
          }
        });
        if (repeatIndex.length > 1) {
          repeatIndex.shift();
          console.log(repeatIndex);
          console.log(this.uploadFileList);
          repeatIndex.forEach(item => {
            this.uploadFileList.splice(item, 1);
          });
          this.$message({
            type: "warning",
            message: "重复上传"
          });
        }
      } else {
        this.$notify({
          title: "上传失败",
          type: "warning",
          message: msg,
          offset: 61
        });
      }
    },
    /**
     * @description 文件上传出错时的钩子
     */
    fileOnError(err) {
      this.$message({
        type: "error",
        message: err.toString()
      });
    },
    /**
     * @description 任务表格删除某一项
     */
    handleRemove: _.debounce(function(index, row) {
      let uploadFileListIndex = this.uploadFileList.findIndex(item => {
        // console.log("detailList=====" + JSON.stringify(this.detailList));
        // console.log(
        //   "uploadFileList=====" + JSON.stringify(this.uploadFileList)
        // );
        // console.log("row=====" + JSON.stringify(row));
        // console.log("item====" + JSON.stringify(item));
        return JSON.stringify(row) === JSON.stringify(item);
      });
      if (uploadFileListIndex !== -1) {
        this.uploadFileList.splice(uploadFileListIndex, 1);
        return;
      }
      let detailListIndex = this.detailList.findIndex(item => {
        return JSON.stringify(row) === JSON.stringify(item);
      });
      if (detailListIndex !== -1) {
        this.detailList.splice(detailListIndex, 1);
      }
    }, 300),
    /**
     * @description 批量删除
     */
    handleDeleteBatch() {
      const length = this.multipleSelection.length;
      if (length === 0) {
        this.$message({
          type: "warning",
          message: "请选择对象"
        });
      } else {
        this.multipleSelection.forEach(selectedItem => {
          let uploadFileListIndex = this.uploadFileList.findIndex(item => {
            return JSON.stringify(selectedItem) === JSON.stringify(item);
          });
          if (uploadFileListIndex !== -1) {
            this.uploadFileList.splice(uploadFileListIndex, 1);
          }
          let detailListIndex = this.detailList.findIndex(item => {
            return JSON.stringify(selectedItem) === JSON.stringify(item);
          });
          if (detailListIndex !== -1) {
            this.detailList.splice(detailListIndex, 1);
          }
        });
      }
    },
    /**
     * @description 单个任务设置
     */
    handleSettingSingle: _.debounce(function(index, row) {
      this.typeOpen = "single";
      // 保存正在编辑的row
      this.currentRow = row;
      let setting = this.currentRow.setting;
      if (typeof setting !== "undefined") {
        this.modalTaskSetting = _.cloneDeep(setting);
      } else {
        this.modalTaskSetting = {
          sensi: { isChecked: false },
          // 安全仿真分析
          anti: {
            isChecked: false,
            // 选中的杀软
            aids: [],
            // 检测模式
            model: 1,
            // 网络状态
            network: 2,
            // 命令行参数
            param: "",
            // 选中的检测时长
            time: 1
          }
        };
      }
      this.$modal.show("modalTaskSetting");
    }, 300),
    /**
     * @description 查看报告鼠标移入
     * @param {row} 数组某一项
     */
    handleView: _.debounce(async function({ oid }) {
      try {
        let { data, status } = await getReportList(oid);
        if (status === 200) {
          this.objectReport.list = data;
          this.objectReport.oid = oid;
        }
      } catch (e) {
        console.log(e);
      }
    }, 300),
    /**
     * @description 查看报告鼠标点击某个报告
     * @param {string} rid
     */
    handleReportListClick: _.debounce(function(rid) {
      this.setTaskTid(this.tid);
      this.$router.push({
        name: `detectReport`,
        params: {
          rid
        }
      });
    }, 300),
    /**
     * @description 批量设置
     */
    handleSettingsBatch: _.debounce(async function() {
      this.typeOpen = "batch";
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: "warning",
          message: "请先选择对象"
        });
      } else {
        this.$modal.show("modalTaskSetting");
      }
    }, 300),
    /**
     * @description modal打开之前,获取数据
     */
    async beforeModalOpen() {
      try {
        // 获取安全仿真引擎的杀软列表
        let { status, data } = await getAntiList();
        if (status === 200) {
          this.res.antiList = data;
          let options = data.list;
          this.modalTaskSetting.anti.antisOptions = options;
        }
      } catch (e) {
        console.log(e);
      }
      // modal打开的类型
      let typeOpen = this.typeOpen;
      // 单个任务的设置
      if (typeOpen === "single") {
        // 设置表单内容
        this._setTaskSetting();
      }
    },
    /**
     * @description 关闭modal
     */

    handleModalClose() {
      this.$modal.hide("taskSetting");
    },
    /**
     * @description modal关闭之前
     */
    async beforeModalClosed() {
      // 生成任务内容
      let typeOpen = this.typeOpen;
      typeOpen === "single"
        ? this._generateTaskContent([this.currentRow])
        : this._generateTaskContent(this.uploadFileList);
      this.$refs["modalTaskSetting"].resetFields();
    },
    /**
     * @description 保存||保存并执行
     */
    handleSave: _.debounce(async function(model) {
      let hasTaskContent = this._hasTaskContent();
      if (!hasTaskContent) {
        this.$message({
          type: "warning",
          message: "请先给对象添加任务内容"
        });
        return;
      }
      try {
        let config = { req: this._generateTaskParam(model), tid: this.tid };
        debugger;
        let { status } = await modifyTask(config);
        if (status === 200) {
          this.$message({
            type: "success",
            message: model === 1 ? "保存任务成功" : "创建任务成功"
          });
          this.$router.push({ path: "/taskOverview" });
        }
      } catch (e) {
        console.log(e);
      }
    }, 300),
    _generateTaskParam(model) {
      // 任务名称,任务描述
      debugger;
      let { remarks, taskName: taskname } = this.$parent.taskForm;
      let objects = this.uploadFileList.map(item => {
        let {
          response: { data: file },
          setting
        } = item;
        let {
          uploadId,
          fileSHA1,
          fileSHA256,
          fileSSDEEP,
          suffix,
          saveUrl,
          fileMD5,
          fileType,
          fileSize,
          fileName
        } = file;
        let res = {
          md5: fileMD5,
          objectName: fileName,
          sha1: fileSHA1,
          sha256: fileSHA256,
          size: fileSize,
          ssdeep: fileSSDEEP,
          suffix: suffix,
          type: fileType,
          uploadId: uploadId,
          url: saveUrl,
          setting
        };
        return res;
      });
      let objects2 = this.detailList.map(item => {
        let {
          fileMD5,
          fileSHA1,
          fileSHA256,
          fileSSDEEP,
          fileType,
          name,
          oid,
          size,
          suffix,
          url,
          setting
        } = item;
        let res = {
          md5: fileMD5,
          objectName: name,
          sha1: fileSHA1,
          sha256: fileSHA256,
          size,
          ssdeep: fileSSDEEP,
          suffix: suffix,
          type: fileType,
          url,
          oid,
          setting
        };
        return res;
      });
      debugger;
      return {
        model, //1 创建 2 创建并执行
        objects: objects.concat(objects2),
        remarks,
        taskname
      };
    },
    /**
     * @description 根据任务表单生成任务对象的任务内容
     */
    _generateTaskContent(rows, setting) {
      rows.forEach(row => {
        row.setting = setting;
      });
    },
    /**
     * @description 检测所有对象是否有任务内容
     */
    _hasTaskContent() {
      return this.newList.every(element => {
        let setting = element.setting;
        console.log(setting);
        if (typeof setting === "undefined") {
          return false;
        } else {
          for (const key in setting) {
            if (setting.hasOwnProperty(key)) {
              const engine = setting[key];
              return engine;
            }
          }
        }
      });
    },
    /**
     * @description 根据任务对象设置任务表单
     * @param {number} model 模式 1 创建 2 创建并执行
     */
    handleCreateTask: _.debounce(async function(model) {
      let hasContent = this._hasTaskContent();
      if (hasContent) {
        try {
          let param = this._generateTaskParam(model);
          let { status, msg } = await createTask(param);
          const h = this.$createElement;
          switch (status) {
            case 200:
              this.$message({
                type: "success",
                message: "任务创建成功"
              });
              this.setDefaultActive("2-1");
              this.$router.push({ path: "/taskOverview" });
              break;
            case 201:
              this.$notify({
                type: "error",
                title: "创建失败",
                duration: 0,
                offset: 62,
                message: h("i", { style: "color: teal" }, msg)
              });
              break;
            default:
              break;
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        this.$message({
          type: "warning",
          message: "请选择对象要执行的任务内容"
        });
      }
    }, 300),
    /**
     * @description object格式转换成表格显示需要的字段
     */
    _Object2File(objects) {
      let res = [];
      objects.forEach(item => {
        let {
          objectMd5: fileMD5,
          objectName: name,
          objectSha1: fileSHA1,
          objectSha256: fileSHA256,
          objectSsdeep: fileSSDEEP,
          objectSize: size,
          objectType: fileType,
          objectResult,
          oid,
          objectUrl: url,
          objectSuffix: suffix,
          setting
        } = item;
        let file = {
          fileMD5,
          name,
          fileSHA1,
          fileSHA256,
          fileSSDEEP,
          size,
          fileType,
          objectResult,
          percentage: 100, //已经创建的任务的单个文件,上传进度设置成100%
          status: "success", //已经创建的任务的单个文件,上传进度设置成success
          oid,
          url,
          suffix,
          setting
        };
        res.push(file);
      });
      return res;
    },
    /**
     * @description 获取任务设置模态框里的数据
     */
    getTaskSetting(setting) {
      if (setting !== null) {
        // 生成任务内容
        let typeOpen = this.typeOpen;
        typeOpen === "single"
          ? this._generateTaskContent([this.currentRow], setting)
          : this._generateTaskContent(this.multipleSelection, setting);
      }
    },
    /**
     * @description 创建websocket
     */
    createWs() {
      let token = sessionStorage.getItem("token");
      this.ws = new WebSocket(
        window.g.WsUrl + "/v1/ws/task_object_state/" + token
      );
      this.ws.onopen = () => {
        console.log("open task_object");
      };
      this.ws.onmessage = event => {
        let { objectResult, oid } = JSON.parse(event.data);
        let object = this.detailList.find(item => oid === item.oid);
        object.objectResult = objectResult;
        debugger;
      };
      this.ws.onclose = () => {
        console.log("close task_object!");
      };
      this.ws.onerror = event => {
        console.log(event);
        console.log("WebSocketError!");
      };
    }
  },
  created() {
    getTaskDetailList(this.tid)
      .then(({ data, status }) => {
        if (status === 200) {
          this.res.taskDetailList = data;
          this.detailList = this._Object2File(data);
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.createWs();
  },
  beforeDestroy() {
    this.ws.close();
  },
  mounted() {}
};
</script>
<style>
.report-wrapper {
  padding: 10px 0;
}
.report {
  cursor: pointer;
}

.report .report-name {
  color: #40aefc;
  padding: 0 10px 5px 10px;
}
.report .generate-time {
  padding: 0 10px;
  color: #ccc;
  margin-right: 10px;
}
.el-card-wrapper {
  height: 300px;
  overflow-x: hidden;
}
.el-card-wrapper .el-scrollbar__wrap {
  overflow-x: hidden;
}
.base-table .el-tag {
  margin-top: 8px;
}
</style>

<style lang="stylus" scoped>
.task-settings
  margin-top 20px
  padding 20px
  border 1px solid #eee
  background-color #fff
  box-shadow 0 1px 10px #ccc

  .settings-header
    display flex
    justify-content space-between
    align-items center
    padding-bottom 10px
    border-bottom 1px solid #ccc

  .settings-body
    .operate-box
      .operate-item
        cursor pointer

        &:hover
          color rgba(24, 144, 255, 1)

    .svg-icon
      cursor pointer

    .c-el-upload
      width 100%

      >>>.el-upload
        width 100%

      >>>.el-upload-dragger
        width 100%

    .c-el-table
      margin-top 20px

      .task-item
        margin-top 8px
        margin-right 5px
        padding 1px 3px
        border 1px solid rgba(64, 174, 252, 1)
        border-radius 5px
        color rgba(64, 174, 252, 1)
        cursor pointer
.c-modal
  .modal-header
    display flex
    justify-content space-between
    align-items center
    margin-bottom 10px
    padding 0 20px
    border 1px solid #ccc
    line-height 40px

  .modal-body
    padding 0 20px

    >>>.engine-name
      font-weight 400

  .modal-footer
    display flex
    justify-content flex-end
    padding 20px 20px 20px 0

  .svg-icon
    color #409EFF

    &:hover
      color #1261b3
      cursor pointer
</style>
