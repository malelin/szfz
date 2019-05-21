<!--
 * @Author: 旺苍扛把子
 * @LastEditors: Please set LastEditors
 * @Description: 新建任务组件
 * @Date: 2019-04-02 09:23:23
 * @LastEditTime: 2019-05-21 13:47:07
 -->

<template>
  <div class="create-task">
    <task-setting
      :task-setting="modalTaskSetting"
      @get-task-setting="getTaskSetting"
    />
    <div class="task-info box-shadow-6">
      <el-form ref="form" :model="taskOptinalInfo" label-width="80px">
        <el-form-item label="任务名称 :">
          <el-row :gutter="5"
            ><el-col :span="10">
              <el-input
                :disabled="taskOptinalInfo.isDefaultName"
                v-model="taskOptinalInfo.taskname"
              ></el-input
            ></el-col>
            <el-col :span="8">
              <el-switch
                style="margin-left:30px;"
                active-text="使用默认名称"
                v-model="taskOptinalInfo.isDefaultName"
                active-color="rgba(24, 144, 255, 1)"
                inactive-color="#cccccc"
              >
              </el-switch></el-col
          ></el-row> </el-form-item
        ><el-form-item label="任务描述 :">
          <el-input
            type="textarea"
            :rows="8"
            placeholder="请输入内容"
            v-model="taskOptinalInfo.remarks"
          >
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="task-settings box-shadow-6">
      <div class="settings-header">
        <h2>任务设置</h2>
        <div class="tool-box">
          <el-button :disabled="controllable" @click.native="handleDeleteBatch"
            >批量删除</el-button
          >
          <el-button
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
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="文件名称" prop="name"> </el-table-column>
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

          <el-table-column width="100" label="文件类型">
            <template slot-scope="{ row }"
              >{{ row.response && row.response.data.fileType }}
            </template></el-table-column
          >
          <el-table-column prop="size" width="90" label="大小(kb)">
            <template slot-scope="{ row }">
              {{ Math.ceil(row.size / 1024) }}kb
            </template>
          </el-table-column>
          <el-table-column label="MD5">
            <template slot-scope="{ row }"
              >{{ row.response && row.response.data.fileMD5 }}
            </template>
          </el-table-column>
          <el-table-column label="任务内容">
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
                  typeof row.setting !== 'undefined' &&
                    row.setting.anti.isChecked
                "
                >安全仿真分析</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column width="100px" prop="operate" label="操作">
            <template slot-scope="{ row, $index }">
              <div class="operate-box">
                <svg-icon
                  icon-class="edit"
                  class="operate-item"
                  style="margin-right:15px;font-size:20px;"
                  @click.native="handleSettingSingle($index, row)"
                ></svg-icon>
                <svg-icon
                  class="operate-item"
                  icon-class="remove"
                  style="font-size:20px;"
                  @click.native="handleRemove($index, row)"
                ></svg-icon>
              </div>
            </template>
          </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="{ row }">
              <setting-overview
                v-if="typeof row.setting !== 'undefined'"
                :row="row"
              />
            </template>
          </el-table-column>
        </el-table>
        <el-row
          type="flex"
          style="margin-top:20px;"
          justify="center"
          align="middle"
        >
          <el-col :span="24"
            ><el-upload
              class="c-el-upload"
              ref="r_el_upload"
              drag
              :limit="20"
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
      </div>
    </div>
    <div class="task-execute">
      <el-button @click.native="handleCreateTask(1)" :disabled="controllable"
        >创建</el-button
      >
      <el-button
        type="primary"
        @click.native="handleCreateTask(2)"
        :disabled="controllable"
        >创建并执行</el-button
      >
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { createTask } from "@/api/task";
import { createNamespacedHelpers } from "vuex";
const { mapMutations } = createNamespacedHelpers("layout");
export default {
  name: "CreateTask",
  components: {
    SettingOverview: () => import("../SettingOverview/SettingOverview.vue"),
    TaskSetting: () => import("../TaskSetting/TaskSetting.vue")
  },
  props: {
    /*  <WelcomeMessage greeting-text="hi"/> */
    //   'greetingText': {
    //     type: [String,Number],
    //     required: true
    //  }
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
      // 任务列表
      taskTable: [],
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
      typeOpen: "",
      activatedCollapse: [],
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
      //接受模态框的设置
      taskSetting: {},
      // 当前组件所有接口返回
      res: {
        // 杀软列表
        antiList: {}
      },
      // 当前编辑的row
      currentRow: {},
      array: []
    };
  },
  computed: {
    // 当前是否可以控制创建任务按钮,创建并执行任务按钮,批量删除按钮,批量设置按钮
    controllable() {
      return this.uploadFileList.length === 0;
    }
  },
  watch: {},
  methods: {
    ...mapMutations(["setDefaultActive"]),
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
    fileOnSuccess({ status, msg }, file) {
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
          message: "请选择对象"
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
    handleSettingSingle: _.debounce(async function(index, row) {
      this.typeOpen = "single";
      // 保存正在编辑的row
      this.currentRow = row;
      let setting = this.currentRow.setting;
      if (typeof setting !== "undefined") {
        this.modalTaskSetting = JSON.parse(JSON.stringify(setting));
      }
      this.$modal.show("modalTaskSetting");
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
    async beforeModalClosed() {},

    /**
     * @description 任务设置取消操作
     */
    handleCancel() {
      this.$modal.hide("taskSetting");
    },
    _generateTaskParam(model) {
      // 任务名称,任务描述
      let { remarks, taskname } = this.taskOptinalInfo;
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
        return {
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
    _generateTaskContent(rows, taskSetting) {
      rows.forEach(row => {
        row.setting = taskSetting;
      });
    },

    /**
     * @description 检测所有对象是否有任务内容
     */
    _hasTaskContent() {
      return this.uploadFileList.every(element => {
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
     * @description 获取任务设置模态框里的数据
     */
    getTaskSetting(data) {
      debugger;
      if (data !== null) {
        let taskSetting = data;
        this.$set(this.currentRow, "setting", data);
        // 生成任务内容
        let typeOpen = this.typeOpen;
        typeOpen === "single"
          ? this._generateTaskContent([this.currentRow], taskSetting)
          : this._generateTaskContent(this.multipleSelection, taskSetting);
      }
    }
  },

  created() {},
  mounted() {}
};
</script>

<style>
/* 屏蔽el-scroller横向滚动条 */
.create-task .el-scrollbar__wrap {
  overflow-x: hidden;
}
.create-task .el-tag {
  margin-right: 8px;
}
.create-task .el-transfer-panel {
  width: 260px;
}
</style>

<style lang="stylus" scoped>
.create-task
  height 100%

  .task-info
    padding 15px 20px
    border 1px solid #eee
    background-color #fff
    box-shadow 0 1px 10px #ccc

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
      border-bottom 1px solid #EBEEF5

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

  .task-execute
    display flex
    justify-content flex-end
    padding 20px 20px 30px

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
