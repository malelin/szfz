<!--
 * @Author: 旺苍扛把子
 * @LastEditors: Please set LastEditors
 * @Description: 引擎组件
 * @Date: 2019-04-22 16:51:22
 * @LastEditTime: 2019-05-15 17:12:13
 -->
<template>
  <li class="engine-item">
    <modal-anti-setting
      v-if="engineId === 'anti'"
      :anti="taskSetting.anti"
      :object="taskFile"
      :engine="engine"
    />
    <el-upload
      class="c-el-upload"
      drag
      @dragenter.native="onDragenterEngine"
      @dragleave.native="onDragleaveEngine"
      @mouseenter.native="onEnterEngine"
      @mouseleave.native="onLeaveEngine"
      @drop.native="onDropEngine"
      :show-file-list="false"
      :name="engineUploadName"
      :action="engineAction"
      :headers="engineHeaders"
      :on-error="onUploadErr"
      :on-success="onUploadSuccess"
      :before-upload="FileBeforeUpload"
      :on-progress="onUploadProgress"
    >
      <div class="upload-inner">
        <div class="engine-item-header">
          <svg-icon :icon-class="engineIcon"></svg-icon>
          <span class="engine-name">{{ engineName }}</span>
        </div>
        <div class="engine-item-body">
          <p class="engine-desc">{{ engineDescription }}</p>
        </div>
      </div>
      <div class="upload-text-wrapper" v-show="engine.showUploadHoverShadow">
        <svg-icon icon-class="dashboard_add"></svg-icon>
      </div>
    </el-upload>
    <div class="overlay" v-show="engine.isUploading">
      <el-progress
        type="circle"
        v-if="engine.showProgress"
        :percentage="engine.progress.percentage"
      ></el-progress>
    </div>
    <div class="loading clearfix" v-show="engine.isLoading">
      <div class="loading-inner">
        <div class="loading-item"></div>
        <div class="loading-item"></div>
        <div class="loading-item"></div>
        <div class="loading-item"></div>
        <div class="loading-item"></div>
      </div>
      <p class="loading-text">正在创建任务</p>
    </div>
  </li>
</template>

<script>
import { createTask } from "@/api/task";
export default {
  name: "Engine",
  components: {
    /* 按需加载组件 */
    // demo: () => import('@/pages/')
    ModalAntiSetting: () =>
      import("../../ModalAntiSetting/ModalAntiSetting.vue")
  },
  props: {
    // 引擎名称
    engineName: {
      type: String,
      required: true
    },
    // 引擎图标
    engineIcon: {
      type: String,
      required: true
    },
    // 引擎id
    engineId: {
      type: String,
      required: true
    },
    //引擎上传请求的headers
    engineHeaders: { type: Object, required: true },
    //引擎上传name
    engineUploadName: { type: String, required: true },
    //引擎上传地址
    engineAction: { type: String, required: true },
    // 引擎描述
    engineDescription: { type: String, required: true }
  },
  data() {
    return {
      // 引擎配置
      engine: {
        // 是否正在上传中
        isUploading: false,
        showUploadHoverShadow: false,
        isLoading: false,
        showProgress: false,
        // 最后一次拖动进入的目标
        lastDragenter: null,
        progress: {
          percentage: 0
        }
      },
      activatedCollapse: [],
      taskSetting: {
        // 敏感信息分析
        sensi: { isChecked: false },
        // 安全仿真分析
        anti: {
          isChecked: true,
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
      // 当前组件所有接口返回
      res: {
        // 杀软列表
        antiList: {}
      },
      // 任务文件
      taskFile: {}
    };
  },
  computed: {},
  watch: {},
  methods: {
    /**
     * @description 引擎上传文件成功
     */
    async onUploadSuccess({ status, data: file }) {
      if (status === 200) {
        // 完成上传,切换上传状态
        this.engine.isUploading = false;
        // 打开创建任务中的动画的遮罩
        this.engine.overlay = true;
        this.taskFile = file;
        switch (this.engineId) {
          case "sensi":
            this.createTask(file, 2)
              .then(({ status, msg }) => {
                this.engine.isLoading = false;
                if (status == 200) {
                  this.$message({
                    type: "success",
                    message: "敏感信息分析引擎任务创建成功"
                  });
                  this.$router.push("/taskOverview");
                } else if (status == 201) {
                  this.$message({
                    type: "warning",
                    message: msg
                  });
                }
              })
              .catch(err => {
                console.log(err);
              });
            break;
          case "anti":
            this.$modal.show("modalAntiSetting");
            break;
          default:
            break;
        }
      }
    },
    _generateTaskParam(file) {
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
        setting: { sensi: { isChecked: true } }
      };
    },
    async createTask(file, model) {
      try {
        let obj = this._generateTaskParam(file);
        let taskData = {
          model,
          objects: [obj]
        };
        return await createTask(taskData);
      } catch (e) {
        throw e;
      }
    },
    /**
     * @description 引擎上传中
     */
    async onUploadProgress(event) {
      this.engine.isUploading = true;
      this.engine.showUploadHoverShadow = false;
      this.engine.showProgress = true;
      let percentage = parseInt(event.percent);
      this.engine.progress.percentage = percentage;
      if (percentage === 100) {
        this.engine.progress.percentage = 0;
        this.engine.showProgress = false;
        this.engine.isLoading = true;
      }
    },
    /**
     * @description 引擎上传文件出错
     */
    onUploadErr(err, file, fileList) {
      console.log(fileList);
    },
    /**
     * @description 引擎上传文件之前
     */
    FileBeforeUpload(file) {
      let maxSize = 31457280;
      // 判断文件是否有后缀
      if (file.size > maxSize) {
        this.$message({
          type: "warning",
          message: "传入的文件不能大于30mb"
        });
        return false;
      }
      this.engine.showProgress = true;
      this.engine.showUploadHoverShadow = false;
    },
    /**
     * @description 鼠标移入引擎
     */
    onEnterEngine() {
      // 是否正在上传中
      if (!this.engine.isUploading) {
        this.engine.showUploadHoverShadow = true;
      }
    },
    /**
     * @description 鼠标移出引擎
     */
    onLeaveEngine() {
      // 是否正在上传中
      if (!this.engine.isUploading) {
        this.engine.showUploadHoverShadow = false;
      }
    },
    /**
     * @description 鼠标拖文件进入引擎
     */
    onDragenterEngine(event) {
      this.engine.lastDragenter = event.target;
      // 是否正在上传中
      if (!this.engine.isUploading) {
        this.engine.showUploadHoverShadow = true;
      }
    },
    /**
     * @description  鼠标拖文件离开引擎
     */
    onDragleaveEngine(event) {
      // 是否正在上传中
      if (!this.engine.isUploading) {
        if (this.engine.lastDragenter === event.target) {
          this.engine.showUploadHoverShadow = false;
        }
      }
    },
    /**
     * @description 文件放入目标对象触发的事件
     */
    onDropEngine() {
      if (!this.engine.isUploading) {
        this.engine.showUploadHoverShadow = false;
      }
    },
    /**
     * @description 把上传接受到的file类型格式的数据转化成object类型的创建任务的格式
     */
    _formatFile2Object({
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
        openSensitivity: 2,
        openMorph: 2
      };
    }
  },
  mounted() {}
};
</script>
<style>
.engine-item .el-upload {
  width: 100%;
  height: 100%;
}
.engine-item .el-upload-dragger {
  width: 100%;
  border-color: #fff;
}

.engine-item .c-el-upload {
  height: 100%;
}
.engine-item .el-upload-dragger {
  height: 100%;
  border: none;
}
.engine-item .el-upload-dragger:hover {
  border: #fff;
}
.engine-item .el-upload-dragger .upload-text-wrapper {
  background-color: rgba(0, 0, 0, 0.2);
  height: 180px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: #2a82e4;
  display: flex;
  align-items: center;
  justify-content: center;
}
.engine-item .upload-text-wrapper .svg-icon {
  font-size: 70px;
}
.engine-item .el-upload-dragger .upload-text {
  color: #2a82e4;
  margin-top: 20px;
}
.dashboard .el-upload:focus .el-upload-dragger {
  border: none;
  color: #333;
}
.el-upload-dragger.is-dragover {
  border: none !important;
}
.el-progress--circle .el-progress__text {
  color: #2a82e4;
}
</style>

<style lang="stylus" scoped>
.engine-item
  position relative
  flex 0 0 33.33%
  box-sizing border-box
  height 280px
  border 1px solid #ebeef5
  color #333

  .upload-inner
    width 100%

    .engine-item-header
      display flex
      align-items center
      padding 10px 0 10px 20px

      >>>.svg-icon
        font-size 40px

      .engine-name
        padding-left 20px
        color #333
        font-weight 700
        font-size 20px

    .engine-item-body
      box-sizing border-box

      .engine-desc
        padding 0 50px
        color #999
        font-size 18px
        line-height 26px

.overlay
  position absolute
  top 0
  left 0
  display flex
  justify-content center
  align-items center
  width 100%
  height 100%

  .svg-icon
    font-size 50px
    line-height 1

.loading
  position absolute
  top 0
  left 0
  display flex
  flex-direction column
  justify-content center
  align-items center
  width 100%
  height 100%

  .loading-text
    padding-top 30px
    color rgb(32, 160, 255)
    text-align center

  .loading-item
    float left
    margin 0 8px
    width 8px
    height 8px
    border-radius 50%
    background rgb(32, 160, 255)
    animation loading-item linear 1s infinite
    -webkit-animation loading-item linear 1s infinite

  .loading-item:nth-child(1)
    animation-delay 0s

  .loading-item:nth-child(2)
    animation-delay 0.15s

  .loading-item:nth-child(3)
    animation-delay 0.3s

  .loading-item:nth-child(4)
    animation-delay 0.45s

  .loading-item:nth-child(5)
    animation-delay 0.6s

  @keyframes loading-item
    0%, 60%, 100%
      transform scale(1)

    30%
      transform scale(2.5)

  @keyframes loading-item
    0%, 60%, 100%
      transform scale(1)

    30%
      transform scale(2.5)
.c-modal
   .modal-footer
    display: flex;
    justify-content: flex-end;
    padding: 20px 20px 20px 0;
</style>
