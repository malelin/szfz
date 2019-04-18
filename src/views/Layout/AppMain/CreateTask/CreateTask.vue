<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 新建任务组件
 * @Date: 2019-04-02 09:23:23
 * @LastEditTime: 2019-04-18 09:17:06
 -->

<template>
  <div class="create-task">
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
              @click.native.stop="stopProp"
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
    <div class="task-info">
      <el-form ref="form" :model="taskForm" label-width="80px">
        <el-form-item label="任务名称 :">
          <el-row :gutter="5"
            ><el-col :span="10">
              <el-input v-model="taskForm.taskname"></el-input
            ></el-col>
            <el-col :span="8">
              <el-switch
                style="margin-left:30px;"
                active-text="使用默认名称"
                v-model="taskForm.isDefaultName"
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
            v-model="taskForm.remarks"
          >
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="task-settings">
      <div class="settings-header">
        <h2>任务设置</h2>
        <div class="tool-box">
          <el-button @click.native="handleDeleteAll">批量删除</el-button>
          <el-button @click.native="handleSettings">批量设置</el-button>
        </div>
      </div>
      <div class="settings-body">
        <el-table
          ref="multipleTable"
          :data="taskTable"
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
              <span
                class="task-item"
                v-if="
                  typeof row.openSensitivity !== 'undefined' &&
                    row.openSensitivity === 1
                "
                >敏感信息分析</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="operate" label="操作">
            <template slot-scope="{ row, $index }">
              <div class="operate-box">
                <svg-icon
                  icon-class="edit"
                  class="operate-item"
                  style="margin-right:15px;font-size:20px;"
                  @click.native="handleEdit($index, row)"
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
        <el-row type="flex" justify="center" align="middle">
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
      </div>
    </div>
    <div class="task-execute">
      <el-button @click.native="handleCreate">创建</el-button>
      <el-button type="primary" @click.native="handleCreateExecute"
        >创建并执行</el-button
      >
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { upload } from "@/api/file";
import { createTask } from "@/api/task";
import { createNamespacedHelpers } from "vuex";
const { mapMutations } = createNamespacedHelpers("layout");
export default {
  name: "CreateTask",
  components: {
    /* 按需加载组件 */
    // demo: () => import('@/pages/')
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
        action: process.env.VUE_APP_BASE_API + "/v1/filemanage/object",
        percent: 0,
        showProgress: false,
        headers: {
          "Digark-Access-Header": sessionStorage.getItem("token")
        },
        showFileList: false
      },
      taskForm: { taskname: "", isDefaultName: true, remarks: "" },
      // 任务列表
      taskTable: [
        // fileMD5:"a9d811addb3ff9c4e748c45d6a638c61"
        // fileName:"AB.bundle.5258a95c.js"
        // fileSHA1:"754f7a363afa1e12c4b7e941b5b6c94ee1ad3736"
        // fileSHA256:"64eb7a33751d0d6ffe556b0051de3aea4ead0cb03997d7313314063c7a106b81"
        // fileSSDEEP:"6144:NLrwWgpX0Yt1plybMozZKJso+h/tQG7SPTjue3xA+51gVdH4:NL8jtbsMozZKrCQXnu/+5V"
        // fileSize:805386
        // fileType:"html"
        // modalForm:Object
        // openSensitivity:1
        // saveUrl:"/group1/M00/00/0E/wKgCcFyv_ZGAONJCAAxKCiDN4qs9523.js"
        // suffix:"js"
        // uploadId:1467
      ],
      // 激活的折叠面板
      activeCollapse: [],
      multipleSelection: [],
      // modal表单
      modalForm: {
        // 敏感信息分析
        taskSensi: { isChecked: false }
      },
      // 当前编辑的任务
      currentEditItem: -1,
      // 当前编辑row
      currentRow: {}
    };
  },
  computed: {
    // 点击执行按钮后传递的参数
    taskData() {
      let objects = this.taskTable.map(item => {
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
          fileName,
          openSensitivity
        } = item;
        return {
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
      });
      let { remarks, taskname } = this.taskForm;
      let taskData = {
        model: 1,
        objects,
        remarks,
        taskname
      };
      return taskData;
    }
  },
  watch: {},
  methods: {
    ...mapMutations(["setDefaultActive"]),
    /**
     * @description 阻止el-checkbox点击冒泡
     */
    stopProp() {
      return;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * @description 上传文件之前的钩子，
     * @param {file} file 上传的文件
     * @returns 若返回 false 或者返回 Promise 且被 reject，则停止上传。
     */
    fileBeforeUpload(file) {
      this.$set(this.upload, "showFileList", true);
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
        this.$message({
          type: "success",
          message: msg
        });
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
        // 单个任务
        let task = {
          uploadId,
          fileSHA1,
          fileSHA256,
          fileSSDEEP,
          suffix,
          fileName,
          saveUrl,
          fileMD5,
          fileType,
          openSensitivity: 2,
          modalForm: { taskSensi: { isChecked: false } },
          fileSize: fileSize
        };
        this.taskTable.push(task);
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
     * @description 重写表单上传方法
     */
    async fileOnUpload(item) {
      let formData = new FormData();
      formData.append("object", item.file);
      let size = item.file.size / (1024 * 1024);
      if (size <= 30) {
        try {
          let {
            data: { fileName, fileMD5, fileSize, fileType },
            status
          } = await upload(formData);
          if (status === 200) {
            let file = { fileName, fileMD5, fileSize, fileType };
            this.taskTable.push(file);
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        this.$message({
          type: "warning",
          message: "文件大小不能超过30MB"
        });
      }
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
     * @description modal打开之前,获取数据
     */
    beforeModalOpen() {},
    /**
     * @description 关闭modal
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
    /**
     * @description 创建任务
     */
    handleCreate: _.debounce(async function() {
      try {
        debugger;
        let { status } = await createTask(this.taskData);
        if (status === 200) {
          this.$message({
            type: "success",
            message: "任务创建成功"
          });
        }
        this.setDefaultActive("2-1");
        this.$router.push({ path: "/taskOverview" });
      } catch (e) {
        console.log(e);
      }
    }, 300),
    /**
     * @description 创建并执行任务
     */
    handleCreateExecute: _.debounce(async function() {
      createTask()
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    }, 300),
    /**
     * @description 批量设置
     */
    handleSettings: _.debounce(async function() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: "warning",
          message: "请选择任务"
        });
      } else {
        this.$modal.show("taskSetting");
      }
    }, 600),

    /**
     * @description 批量删除
     */
    handleDeleteAll() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: "warning",
          message: "请选择任务"
        });
      } else {
        let taskTable = this.taskTable;
        this.multipleSelection.forEach(item => {
          taskTable.forEach((task, index) => {
            if (item.uploadId === task.uploadId) {
              debugger;
              taskTable.splice(index, 1);
            }
          });
        });
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
        font-size 18px

    .modal-footer
      display flex
      justify-content flex-end
      padding 20px 20px 20px 0

    .svg-icon
      &:hover
        color #409EFF
        cursor pointer
</style>
