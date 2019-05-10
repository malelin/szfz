<!--
 * @Author: 旺苍扛把子
 * @LastEditors: Please set LastEditors
 * @Description: 封装任务详情和新建任务中的表格
 * @Date: 2019-04-12 09:46:16
 * @LastEditTime: 2019-05-08 11:21:50
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
        :data="uploadFileList"
        tooltip-effect="dark"
        style="width: 100%"
        class="c-el-table"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection" width="55">
        </el-table-column>
        <el-table-column align="center" label="文件名称" prop="name">
        </el-table-column>
        <el-table-column label="上传进度">
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
                typeof row.openSensitivity !== 'undefined' &&
                  row.openSensitivity === 1
              "
              >敏感信息分析</el-tag
            >
            <el-tag
              v-if="
                typeof row.anti !== 'undefined' ||
                  (row.anaAnti !== null && row.anaAnti !== undefined)
              "
              >安全仿真分析
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="结果" v-if="taskStatus !== 1">
          <template slot-scope="{ row }">
            <status :status-config="statusConfig" :status="row.objectResult" />
          </template>
        </el-table-column>
        <el-table-column
          width="100px"
          prop="operate"
          label="操作"
          align="center"
          v-if="taskStatus === 1 || taskStatus === 3"
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
                  v-show="taskStatus === 3"
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
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="日期">
                <span>{{ props.row.date }}</span>
              </el-form-item>
              <el-form-item label="姓名">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
            </el-form>
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
    <modal
      name="taskSetting"
      :draggable="false"
      :clickToClose="false"
      class="c-modal"
      @before-open="beforeModalOpen"
      transition="fade"
      height="auto"
      width="40%"
      @before-close="beforeModalClosed"
    >
      <el-card>
        <div slot="header" class="clearfix">
          <span>任务设置</span>
          <el-button style="float: right; padding: 3px 0" type="text">
            <svg-icon
              icon-class="close"
              @click.native="handleModalClose"
            ></svg-icon
          ></el-button>
        </div>
        <div class="modal-body">
          <el-form
            ref="modalTaskSetting"
            :inline="true"
            :model="modalTaskSetting"
            :rules="modalTaskSetting.rules"
          >
            <el-collapse v-model="modalTaskSetting.activatedCollapse" accordion>
              <el-collapse-item title="敏感信息分析" name="1"
                ><el-form-item prop="sensi.isChecked">
                  <el-checkbox
                    border
                    size="medium"
                    v-model="modalTaskSetting.sensi.isChecked"
                    label="敏感信息分析"
                  ></el-checkbox>
                </el-form-item>
              </el-collapse-item>
              <el-collapse-item title="安全仿真分析" name="2">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item
                      label-width="100px"
                      label="杀毒软件 :"
                      prop="anti.aids"
                    >
                      <el-select
                        v-model="modalTaskSetting.anti.aids"
                        multiple
                        placeholder="请选择杀毒软件"
                        @change="onAntiActivated"
                      >
                        <el-option
                          v-for="option in modalTaskSetting.anti.antisOptions"
                          :key="option.aid"
                          :label="option.antiName"
                          :value="option.aid"
                        >
                          <span style="float: left">{{ option.antiName }}</span>
                          <span
                            style="float: right; color: #8492a6; font-size: 13px"
                            >{{ option.antiCountry }}</span
                          >
                        </el-option>
                      </el-select></el-form-item
                    ></el-col
                  >
                  <el-col :span="12">
                    <el-form-item
                      label-width="100px"
                      label="检测模式 :"
                      prop="anti.model"
                      required
                    >
                      <el-switch
                        v-model="modalTaskSetting.anti.model"
                        active-text="动态检测"
                        :active-value="2"
                        inactive-text="静态检测"
                        :inactive-value="1"
                      >
                      </el-switch> </el-form-item
                  ></el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12"
                    ><el-form-item
                      label-width="100px"
                      label="网络状态 :"
                      prop="anti.network"
                      required
                    >
                      <el-switch
                        v-model="modalTaskSetting.anti.network"
                        active-text="开启"
                        inactive-text="关闭"
                        :active-value="1"
                        :inactive-value="2"
                      >
                      </el-switch> </el-form-item
                  ></el-col>
                  <el-col :span="12">
                    <el-form-item
                      label-width="100px"
                      label="命令行参数 :"
                      prop="anti.param"
                    >
                      <el-input
                        v-model.trim="modalTaskSetting.anti.param"
                      ></el-input> </el-form-item
                  ></el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12"></el-col>
                  <el-col :span="12"></el-col>
                </el-row>
                <el-form-item
                  label-width="100px"
                  label="检测时长 :"
                  prop="anti.time"
                >
                  <el-select
                    v-model="modalTaskSetting.anti.time"
                    placeholder="请选择检测时长"
                  >
                    <el-option
                      v-for="option in modalTaskSetting.anti
                        .checkDurationOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    >
                    </el-option> </el-select></el-form-item
              ></el-collapse-item>
            </el-collapse>
          </el-form></div
      ></el-card>
      <div class="modal-footer">
        <el-button size="mini" @click.native="handleSure" type="primary"
          >确定</el-button
        >
        <el-button @click.native="handleModalClose" size="mini">取消</el-button>
      </div>
    </modal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapMutations } = createNamespacedHelpers("layout");
import _ from "lodash";
import { getTaskDetailList, createTask, modifyTask } from "@/api/task";
import { getAntiList } from "@/api/anti";
import { getReportList } from "@/api/report";
import { hasSuffix } from "@/utils/file";
export default {
  name: "BaseTable",
  components: {
    /* 按需加载组件 */
    // demo: () => import('@/pages/')
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
        action: process.env.VUE_APP_BASE_API + "/v1/filemanage/object",
        percent: 0,
        showProgress: false,
        headers: {
          "Digark-Access-Header": sessionStorage.getItem("token")
        },
        showFileList: false
      },
      // 文件上传列表
      uploadFileList: [],
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
        // 表单验证
        rules: {
          anti: {
            // aids: [
            //   {
            //     type: "array",
            //     required: true,
            //     message: "请选择杀毒软件",
            //     trigger: ["change", "blur"]
            //   }
            // ],
            // time: [
            //   {
            //     type: "number",
            //     required: true,
            //     message: "请选择检测时长",
            //     trigger: ["change", "blur"]
            //   }
            // ]
          }
        },

        // 任务设置框 批量设置||单个设置
        typeOpen: "",
        activatedCollapse: [],
        // 敏感信息分析
        sensi: { isChecked: false },
        // 安全仿真分析
        anti: {
          // 是否在设置安全仿真引擎
          activated: false,
          // 杀软列表
          antisOptions: [],
          // 选中的杀软
          aids: [],
          // 检测模式
          model: 1,
          // 网络状态
          network: 2,
          // 命令行参数
          param: "",
          // 检测时长
          checkDurationOptions: [
            { label: "45s", value: 1 },
            { label: "60s", value: 2 },
            { label: "90s", value: 3 },
            { label: "120s", value: 4 }
          ],
          // 选中的检测时长
          time: 1
        }
      },
      // 当前组件所有接口返回
      res: {
        // 杀软列表
        antiList: {},
        taskDetailList: {}
      },
      // 当前编辑的row
      currentRow: {}
    };
  },
  computed: {
    // 当前是否可以控制创建任务按钮,创建并执行任务按钮,批量删除按钮,批量设置按钮
    controllable() {
      return this.uploadFileList.length === 0;
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
      // 判断文件是否有后缀
      if (!hasSuffix(file.name)) {
        this.$message({
          type: "error",
          message: "请传入有后缀名的文件"
        });
        return false;
      }
    },
    /**
     * @description 文件上传时的钩子
     */
    fileOnProgress(event, file) {
      // 更新上传列表
      let fileUid = file.uid;
      // 判断上传列表中是否存在该文件正在上传
      let isUploading = this.uploadFileList.some(({ uid }) => uid === fileUid);
      //上传列表中如果没有此uid的文件就push该文件
      if (!isUploading) {
        this.uploadFileList.push(file);
      }
    },
    /**
     * @description 文件上传成功钩子
     */
    fileOnSuccess({ status, data, msg }) {
      if (status === 200) {
        console.log(data);
      } else {
        this.$message({
          type: "warning",
          message: msg
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
    handleRemove: _.debounce(function(index) {
      this.uploadFileList.splice(index, 1);
    }, 300),
    /**
     * @description 批量删除
     */
    handleDeleteBatch() {
      const length = this.multipleSelection.length;
      if (length === 0) {
        this.$message({
          type: "warning",
          message: "请选择任务"
        });
      } else {
        this.multipleSelection.forEach(item => {
          let { uid } = item;
          let index = this.uploadFileList.findIndex(item => item.uid === uid);
          this.uploadFileList.splice(index, 1);
        });
      }
    },
    /**
     * @description 单个任务设置
     */
    handleSettingSingle: _.debounce(function(index, row) {
      this.modalTaskSetting.typeOpen = "single";
      // 保存正在编辑的row
      this.currentRow = row;
      this.$modal.show("taskSetting");
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
      this.modalTaskSetting.typeOpen = "batch";
      if (this.uploadFileList.length === 0) {
        this.$message({
          type: "warning",
          message: "请先添加文件"
        });
      } else {
        this.$modal.show("taskSetting");
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
      let typeOpen = this.modalTaskSetting.typeOpen;
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
      let typeOpen = this.modalTaskSetting.typeOpen;
      typeOpen === "single"
        ? this._generateTaskContent([this.currentRow])
        : this._generateTaskContent(this.uploadFileList);
      this.$refs["modalTaskSetting"].resetFields();
    },
    /**
     * @description 设置弹框确定按钮
     */
    async handleSure() {
      this.$modal.hide("taskSetting");
    },
    /**
     * @description 任务设置中的安全仿真引擎设置项的值发生改变,说明用户在设置安全仿真引擎
     */
    onAntiActivated(newValue, oldValue) {
      console.log("用户正在设置安全仿真引擎");
      if (!this.modalTaskSetting.anti.activated && newValue !== oldValue) {
        this.modalTaskSetting.anti.activated = true;
      }
    },

    /**
     * @description 任务设置取消操作
     */
    handleCancel() {
      this.$modal.hide("taskSetting");
    },
    /**
     * @description 保存||保存并执行
     */
    handleSave: _.debounce(async function(model) {
      debugger;
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
      let { remarks, taskname } = this.taskOptinalInfo;
      let objects = this.uploadFileList.map(item => {
        debugger;
        let {
          response: { data: file },
          openSensitivity,
          anti
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
          openMorph: 2,
          openSensitivity,
          sha1: fileSHA1,
          sha256: fileSHA256,
          size: fileSize,
          ssdeep: fileSSDEEP,
          suffix: suffix,
          type: fileType,
          uploadId: uploadId,
          url: saveUrl
        };
        if (anti !== undefined) {
          res.anti = anti;
        }
        return res;
      });
      return {
        model, //1 创建 2 创建并执行
        objects,
        remarks,
        taskname
      };
    },
    /**
     * @description 根据任务表单生成任务对象的任务内容
     */
    _generateTaskContent(rows) {
      let {
        sensi: { isChecked },
        anti: { aids, model, network, param, time }
      } = this.modalTaskSetting;
      // 创建任务时对象敏感信息分析引擎的参数
      let openSensitivity = isChecked ? 1 : 2;
      // 创建任务时安全仿真引擎的参数
      let anti = {
        aids,
        model,
        network,
        param,
        time
      };
      rows.forEach(row => {
        if (aids.length !== 0) {
          this.$set(row, "anti", anti);
        } else {
          this.$delete(row, "anti");
        }
        this.$set(row, "openSensitivity", openSensitivity);
      });
    },
    /**
     * @description 根据任务对象设置任务表单
     */
    _setTaskSetting() {
      let { openSensitivity, anti, anaAnti } = this.currentRow;
      if (openSensitivity !== undefined && openSensitivity === 1) {
        this.modalTaskSetting.sensi.isChecked = true;
      }
      // 没有anti属性就读取anaAnti属性
      if (anti === undefined) {
        if (anaAnti !== null) {
          debugger;
          let { antiDynamicStr, antiModel, antiNetwork, antiTime } = anaAnti;
          this.modalTaskSetting.anti["model"] = antiModel;
          this.modalTaskSetting.anti["network"] = antiNetwork;
          this.modalTaskSetting.anti["param"] =
            antiDynamicStr === null ? "" : antiDynamicStr;
          this.modalTaskSetting.anti["time"] = antiTime;
        }
      } else {
        // 不设置杀毒软件列表,因为要动态获取
        let { aids, model, network, param, time } = anti;
        this.modalTaskSetting.anti["model"] = model;
        this.modalTaskSetting.anti["network"] = network;
        this.modalTaskSetting.anti["aids"] = aids;
        this.modalTaskSetting.anti["param"] = param;
        this.modalTaskSetting.anti["time"] = time;
      }
    },
    /**
     * @description 检测所有对象是否有任务内容
     */
    _hasTaskContent() {
      return this.uploadFileList.every(file => {
        let { openSensitivity, anti } = file;
        return (
          (openSensitivity !== undefined && openSensitivity === 1) ||
          anti !== undefined
        );
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
        // this.$message({
        //   type: "warning",
        //   message: "请选择对象要执行的任务内容"
        // });
        const h = this.$createElement;
        this.$notify({
          type: "error",
          title: "创建失败",
          offset: 62,
          duration: 0,
          message: h(
            "i",
            { style: "color: teal" },
            "请选择对象要执行的任务内容"
          )
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
          analysis,
          anaAnti,
          anaHomo,
          anaVeri,
          oid,
          objectUrl: url,
          objectSuffix: suffix
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
          analysis,
          anaAnti,
          anaHomo,
          anaVeri,
          openSensitivity: analysis.sensitivity === 10 ? 2 : 1, //根据 analysis.sensitivity是否等于10判断是否启动了敏感分析引擎
          percentage: 100, //已经创建的任务的单个文件,上传进度设置成100%
          status: "success", //已经创建的任务的单个文件,上传进度设置成success
          oid,
          url,
          suffix
        };
        res.push(file);
      });
      return res;
    }
  },
  created() {
    getTaskDetailList(this.tid)
      .then(({ data, status }) => {
        if (status === 200) {
          this.res.taskDetailList = data;
          this.uploadFileList = this._Object2File(data);
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
