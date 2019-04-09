<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 新建任务组件
 * @Date: 2019-04-02 09:23:23
 * @LastEditTime: 2019-04-09 16:03:37
 -->

<template>
  <div class="create-task">
    <div class="task-info">
      <el-form ref="form" :model="taskForm" label-width="80px">
        <el-form-item label="任务名称 :">
          <el-row :gutter="5"
            ><el-col :span="10">
              <el-input v-model="taskForm.name"></el-input
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
            v-model="taskForm.textarea"
          >
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="task-settings">
      <div class="settings-header">
        <h2>任务设置</h2>
        <el-select v-model="value2" placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="settings-body">
        <el-table
          ref="multipleTable"
          :data="taskTable"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="fileName" label="文件名称"> </el-table-column>
          <el-table-column prop="fileType" label="文件类型"> </el-table-column>
          <el-table-column prop="fileSize" label="大小(kb)"> </el-table-column>
          <el-table-column prop="fileMD5" label="MD5"> </el-table-column>
          <el-table-column prop="taskContents" label="任务内容">
          </el-table-column>
          <el-table-column prop="operate" label="操作">
            <template slot-scope="scope">
              <div class="operate-box">
                <svg-icon
                  icon-class="edit"
                  class="operate-item"
                  style="margin-right:15px;font-size:20px;"
                  @click.native="handleEdit(scope)"
                ></svg-icon>
                <svg-icon
                  class="operate-item"
                  icon-class="remove"
                  style="font-size:20px;"
                  @click.native="handleRemove(scope.$index, scope)"
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
              drag
              :action="upload.action"
              :name="upload.name"
              :show-file-list="false"
              :on-progress="fileOnProgress"
              :on-error="fileOnError"
              :on-success="fileOnSuccess"
              :before-upload="fileBeforeUpload"
              :headers="upload.headers"
            >
              <el-row type="flex" align="middle" style="height:100%;">
                <el-col>
                  <el-progress
                    v-if="upload.showProgress"
                    style="width:80%;margin:0 auto;"
                    :text-inside="true"
                    :stroke-width="30"
                    :percentage="upload.percent"
                  ></el-progress>
                  <template v-else
                    ><i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                      将文件拖到此处，或点击上传
                    </div>
                  </template>
                </el-col>
              </el-row>
            </el-upload></el-col
          >
        </el-row>
      </div>
    </div>
    <div class="task-execute">
      <el-button>创建</el-button>
      <el-button type="primary">创建并执行</el-button>
    </div>
  </div>
</template>

<script>
import { upload } from "@/api/file";
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
        action: "http://192.168.2.112:8081/v1/filemanage/object",
        percent: 0,
        showProgress: false,
        headers: {
          "Digark-Access-Header": sessionStorage.getItem("token")
        }
      },
      taskForm: { name: "", isDefaultName: true, textarea: "" },
      options2: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶",
          disabled: true
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value2: "",
      // 任务列表
      taskTable: [
        {
          fileName: "index1.html",
          uploadId: "001",
          fileMD5: "81967f68746d92bb83994778305113d7",
          fileType: "html",
          fileSize: 1243703
        },
        {
          fileName: "index2.html",
          uploadId: "001",
          fileMD5: "81967f68746d92bb83994778305113d7",
          fileType: "html",
          fileSize: 1243703
        },
        {
          fileName: "index3.html",
          uploadId: "003",
          fileMD5: "81967f68746d92bb83994778305113d7",
          fileType: "html",
          fileSize: 1243703
        },
        {
          fileName: "index4.html",
          uploadId: "004",
          fileMD5: "81967f68746d92bb83994778305113d7",
          fileType: "html",
          fileSize: 1243703
        },
        {
          fileName: "index4.html",
          uploadId: "005",
          fileMD5: "81967f68746d92bb83994778305113d7",
          fileType: "html",
          fileSize: 1243703
        },
        {
          fileName: "index6.html",
          uploadId: "006",
          fileMD5: "81967f68746d92bb83994778305113d7",
          fileType: "html",
          fileSize: 1243703
        }
      ],
      multipleSelection: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    handleSelectionChange() {},
    /**
     * @description 上传文件之前的钩子，
     * @param {file} file 上传的文件
     * @returns 若返回 false 或者返回 Promise 且被 reject，则停止上传。
     */
    fileBeforeUpload() {
      this.$set(this.upload, "showProgress", true);
    },
    /**
     * @description 文件上传成功钩子
     */
    fileOnSuccess({ status, data, msg }) {
      if (status === 200) {
        let { fileName, fileMD5, fileType, fileSize } = data;
        let file = { fileName, fileMD5, fileType, fileSize };
        this.upload = Object.assign({}, this.upload, {
          showProgress: false,
          percent: 0
        });
        this.taskTable.push(file);
      } else {
        this.$message({
          type: "warning",
          message: msg
        });
        this.$set(this.upload, "showProgress", false);
      }
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
     * @description 文件上传时的钩子
     */
    fileOnProgress(file) {
      this.$set(this.upload, "percent", parseInt(file.percent));
    },
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
    handleRemove(index) {
      this.taskTable.splice(index, 1);
    },
    handleEdit(index) {
      console.log(index);
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

  .task-execute
    display flex
    justify-content flex-end
    padding 20px 20px 30px
</style>
