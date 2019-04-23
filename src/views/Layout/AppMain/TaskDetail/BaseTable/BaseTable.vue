<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 封装任务详情和新建任务中的表格
 * @Date: 2019-04-12 09:46:16
 * @LastEditTime: 2019-04-23 16:25:36
 -->
<template>
  <div class="base-table">
    <!-- 任务设置弹出框 -->
    <modal
      name="taskSetting"
      :draggable="false"
      :clickToClose="false"
      class="c-modal"
      @before-open="beforeModalOpen"
      transition="fade"
      height="auto"
      @opened="onModalOpened"
      @closed="onModalClosed"
    >
      <div class="modal-header">
        <h2 class="modal-title">任务设置</h2>
        <svg-icon
          icon-class="close"
          @click.native="handleModalClose"
        ></svg-icon>
      </div>
      <div class="modal-body">
        <el-form ref="form" :model="modalForm">
          <el-form-item>
            <el-checkbox
              size="medium"
              v-model="modalForm.taskSensi.isChecked"
            ></el-checkbox
            ><span class="engine-name">敏感信息分析</span>
          </el-form-item>
        </el-form>
      </div>
      <div class="modal-footer">
        <el-button size="mini" @click.native="handleSure" type="primary"
          >确定</el-button
        >
        <el-button @click.native="handleCancel" size="mini">取消</el-button>
      </div>
    </modal>
    <el-table
      ref="multipleTable"
      :data="Object2File"
      tooltip-effect="dark"
      style="width: 100%"
      class="c-el-table"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="fileName" label="文件名称"> </el-table-column>
      <el-table-column prop="fileType" label="文件类型"> </el-table-column>
      <el-table-column prop="fileSize" label="大小(kb)">
        <template slot-scope="{ row }">
          {{ parseInt(row.fileSize / 1024) }}kb
        </template>
      </el-table-column>
      <el-table-column prop="fileMD5" label="MD5"> </el-table-column>
      <el-table-column label="任务内容">
        <template slot-scope="{ row }">
          <span class="task-item" v-if="row.modalForm.taskSensi.isChecked"
            >敏感信息分析</span
          >
        </template>
      </el-table-column>
      <el-table-column label="结果" v-if="taskStatus !== 1">
        <template slot-scope="{ row }">
          <status :status-config="statusConfig" :status="row.objectResult" />
        </template>
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作"
        v-if="taskStatus === 1 || taskStatus === 3"
      >
        <template slot-scope="{ row, $index }">
          <div class="operate-box">
            <svg-icon
              v-show="taskStatus === 1"
              icon-class="edit"
              class="operate-item"
              style="margin-right:15px;font-size:20px;"
              @click.native="handleEdit($index, row)"
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
    <el-row type="flex" justify="center" align="middle" v-if="taskStatus === 1">
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

    <el-row type="flex" justify="end" v-if="taskStatus === 1">
      <el-button
        style="margin-right:20px;"
        type="info"
        @click.native="handleSave"
        plain
        >保存</el-button
      >
      <el-button
        style="margin-right:20px;"
        @click.native="handleSaveWithExecute"
        type="primary"
        >保存并执行</el-button
      >
    </el-row>
  </div>
</template>

<script>
import _ from "lodash";
import { getTaskDetailList, createAndExecuteTask } from "@/api/task";
import { getReportList } from "@/api/report";
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
        action: "http://192.168.2.112:8081/v1/filemanage/object",
        percent: 0,
        showProgress: false,
        headers: {
          "Digark-Access-Header": sessionStorage.getItem("token")
        },
        showFileList: false
      },
      taskForm: { taskname: "", isDefaultName: true, remarks: "" },
      taskTable: [],
      // 上传的文件列表
      uploadFiles: [],
      // modal表单
      modalForm: {
        // 敏感信息分析
        taskSensi: { isChecked: false }
      },
      // status组件配置
      statusConfig: [
        { text: "安全", color: "#67C23A" },
        { text: "中危", color: "#aaaaaa" },
        { text: "高危", color: "#f66600" },
        { text: "失败", color: "#F56C6C" },
        { text: "进行中", color: "#409EFF" }
      ],
      multipleSelection: [],
      // 当前编辑的任务
      currentEditItem: -1,
      // 当前编辑row
      currentRow: {},
      // 1 保存 2 保存并执行
      currentModel: 0,
      // 每个对象的报告
      objectReport: {
        list: [],
        meta: {},
        basic: {},
        oid: ""
      }
    };
  },
  computed: {
    /**
     * @description object格式转file格式
     */
    Object2File() {
      let res = [];
      this.taskTable.forEach(item => {
        let {
          objectMd5: fileMD5,
          objectName: fileName,
          objectSha1: fileSHA1,
          objectSha256: fileSHA256,
          objectSsdeep: fileSSDEEP,
          objectSize: fileSize,
          objectType: fileType,
          objectResult,
          analysis,
          oid,
          objectUrl: url,
          objectSuffix: suffix
        } = item;
        let modalForm = { taskSensi: {} };
        let openSensitivity;
        if (analysis.sensitivity === 10) {
          modalForm.taskSensi.isChecked = false;
          openSensitivity = 2;
        } else {
          modalForm.taskSensi.isChecked = true;
          openSensitivity = 1;
        }

        let file = {
          fileMD5,
          fileName,
          fileSHA1,
          fileSHA256,
          fileSSDEEP,
          fileSize,
          fileType,
          objectResult,
          analysis,
          modalForm,
          openSensitivity,
          oid,
          url,
          suffix
        };
        res.push(file);
      });
      return res;
    },
    //创建任务时传递的参数
    createData() {
      let objects = this.Object2File.map(item => {
        let {
          uploadId,
          fileSHA1,
          fileSHA256,
          fileSSDEEP,
          suffix,
          url,
          fileMD5,
          fileType,
          fileSize,
          fileName,
          openSensitivity,
          oid
        } = item;
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
          url,
          oid
        };
        if (res.uploadId === undefined) {
          delete res.uploadId;
        }
        if (res.oid === undefined) {
          delete res.oid;
        }
        return res;
      });
      let { remarks, taskname } = this.taskForm;
      let model = this.currentModel;
      let tid = this.tid;
      let res = {
        req: { model, objects },
        tid,
        remarks,
        taskname
      };
      return res;
    }
  },
  watch: {
    // 监听objectReport的oid改变,执行获取该oid的报告信息的请求
    async "objectReport.oid"(newValue) {
      await getReportList(newValue);
    }
  },
  methods: {
    /**
     * @description modal打开之前,获取数据
     */
    beforeModalOpen() {},
    /**
     * @description modal打开之后
     */
    /**
     * @description 上传文件之前的钩子，
     * @param {file} file 上传的文件
     * @returns 若返回 false 或者返回 Promise 且被 reject，则停止上传。
     */
    fileBeforeUpload(file) {
      if (file.type === "") {
        this.$message({
          type: "warning",
          message: "请传入有后缀名的文件"
        });
        return false;
      }
    },
    /**
     * @description 文件上传时的钩子
     */
    fileOnProgress(file) {
      this.$set(this.upload, "percent", parseInt(file.percent));
    },
    /**
     * @description 文件上传成功钩子
     */
    fileOnSuccess({ status, data, msg }) {
      if (status === 200) {
        let {
          uploadId,
          fileSHA1,
          fileSHA256,
          fileSSDEEP,
          fileName,
          saveUrl,
          fileMD5,
          fileType,
          suffix,
          fileSize
        } = data;
        if (
          this.taskTable.findIndex(item => {
            return item.fileMD5 === fileMD5;
          }) !== -1
        ) {
          this.$message({
            type: "warning",
            message: "重复上传"
          });
          return false;
        }
        // 单个对象
        let file = {
          uploadId,
          fileSHA1,
          fileSHA256,
          fileSSDEEP,
          suffix,
          fileName,
          url: saveUrl,
          fileMD5,
          fileType,
          openSensitivity: 2,
          modalForm: { taskSensi: { isChecked: false } },
          fileSize
        };
        this.Object2File.push(file);
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
    fileOnError(err, file, fileList) {
      console.log(err, file, fileList);
      this.$set(this.upload, "showProgress", false);
      this.$message({
        type: "error",
        message: err
      });
    },

    /**
     * @description 任务表格删除某一项
     */
    handleRemove: _.debounce(function(index) {
      this.taskTable.splice(index, 1);
    }, 300),
    /**
     * @description 任务表格编辑某一项
     * @param {index} 数组下标
     * @param {row} 数组某一项
     */
    handleEdit: _.debounce(function(index, row) {
      this.currentEditItem = index;
      this.currentRow = row;
      this.modalForm = JSON.parse(JSON.stringify(row.modalForm));
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
      this.$router.push({
        name: `detectReport`,
        params: {
          rid,
          tid: this.tid
        }
      });
    }, 300),
    /**
     * @description modal关闭
     */
    handleModalClose() {
      this.$modal.hide("taskSetting");
    },
    /**
     * @description modal打开之后
     */
    onModalOpened() {},
    /**
     * @description modal关闭之前
     */
    onModalClosed() {},
    /**
     * @description 设置弹框确定按钮
     */
    handleSure() {
      // 批量设置
      if (this.currentEditItem === -1) {
        if (this.multipleSelection.length === 0) {
          this.$message({
            type: "warning",
            message: "请选择任务"
          });
        } else {
          if (
            typeof this.modalForm.taskSensi.isChecked !== "undefined" &&
            this.modalForm.taskSensi.isChecked === true
          ) {
            this.multipleSelection.map(item => {
              item.openSensitivity = 1;
            });
          } else {
            this.multipleSelection.map(item => {
              item.openSensitivity = 2;
            });
          }
        }
      } else {
        //  开启敏感检测，1/开启，2/不开启 ,
        if (this.modalForm.taskSensi.isChecked === true) {
          this.$set(this.currentRow, "openSensitivity", 1);
        } else {
          this.$set(this.currentRow, "openSensitivity", 2);
        }
        this.$set(this.currentRow, "modalForm", this.modalForm);
      }

      this.$modal.hide("taskSetting");
      this.modalForm = { taskSensi: { isChecked: false } };
      this.currentEditItem = -1;
    },
    /**
     * @description 设置弹框取消按钮
     */
    handleCancel() {
      this.$modal.hide("taskSetting");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    /**
     * @description 保存
     */
    handleSave: _.debounce(async function() {
      this.currentModel = 1;
      try {
        console.log(this.createData);
        let { status } = await createAndExecuteTask(this.createData);
        if (status === 200) {
          this.$message({
            type: "success",
            message: "保存成功"
          });
          this.$router.push({ path: "/taskOverview" });
        }
      } catch (e) {
        console.log(e);
      }
    }, 300),
    /**
     * @description 保存并执行
     */
    handleSaveWithExecute: _.debounce(async function() {
      this.currentModel = 2;
      try {
        console.log(this.createData);
        let { data, status } = await createAndExecuteTask(this.createData);
        if (status === 200) {
          console.log(data);
          this.$message({
            type: "success",
            message: "保存并执行成功"
          });
          this.$router.push({ path: "/taskOverview" });
        }
      } catch (e) {
        console.log(e);
      }
    }, 300)
  },
  created() {
    getTaskDetailList(this.tid)
      .then(({ data, status }) => {
        if (status === 200) {
          this.taskTable = data;
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
.base-table
  line-height 1

  .c-el-table
    margin-bottom 20px

    .operate-box
      .operate-item
        cursor pointer

        &:hover
          color rgba(24, 144, 255, 1)

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
        font-size 18px

    .modal-footer
      display flex
      justify-content flex-end
      padding 20px 20px 20px 0

  .task-item
    margin-top 8px
    margin-right 5px
    padding 1px 3px
    border 1px solid rgba(64, 174, 252, 1)
    border-radius 5px
    color rgba(64, 174, 252, 1)
    cursor pointer

    &:hover
      background-color rgba(64, 174, 252, 1)
      color #fff

  .c-el-upload
    width 100%

    >>>.el-upload
      width 100%

    >>>.el-upload-dragger
      width 100%
</style>
