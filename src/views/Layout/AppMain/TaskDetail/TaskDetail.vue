<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 任务详情组件
 * @Date: 2019-04-11 14:32:10
 * @LastEditTime: 2019-05-05 14:53:14
 -->
<template>
  <div class="task-detail">
    <back :target="{ path: '/taskOverview' }" />
    <div class="detail-header">
      <div class="header-left">
        <el-form
          :model="taskForm"
          ref="taskFrom"
          label-width="100px"
          class="task-form"
        >
          <el-form-item label="任务名称 :">
            <el-input
              :disabled="taskForm.taskStatus !== 1"
              style="width:300px;"
              v-model="taskForm.taskName"
              placeholder="请输入任务名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="任务描述 :">
            <el-input
              :disabled="taskForm.taskStatus !== 1"
              type="textarea"
              :rows="1"
              style="width:300px;"
              placeholder=""
              v-model="taskForm.remarks"
            ></el-input
          ></el-form-item>

          <el-form-item label="创建时间 :">
            <span>{{ taskForm.createTime }}</span>
          </el-form-item>
          <el-form-item label="开始时间 :">
            <span>{{ taskForm.startTime }}</span>
          </el-form-item>
          <el-form-item label="完成时间 :">
            <span>{{ taskForm.endTime }}</span>
          </el-form-item>

          <el-form-item label="任务内容 :">
            <el-tag
              v-if="
                typeof taskForm.taskHomo !== 'undefined' &&
                  taskForm.taskHomo === 1
              "
              >同源分析</el-tag
            >
            <el-tag
              v-if="
                typeof taskForm.taskAnti !== 'undefined' &&
                  taskForm.taskAnti === 1
              "
              >安全仿真分析</el-tag
            >
            <el-tag
              v-if="
                typeof taskForm.taskMorph !== 'undefined' &&
                  taskForm.taskMorph === 1
              "
              >工具变形与验证</el-tag
            >
            <el-tag
              v-if="
                typeof taskForm.taskSensi !== 'undefined' &&
                  taskForm.taskSensi === 1
              "
              >敏感信息分析</el-tag
            >
            <el-tag
              v-if="
                typeof taskForm.taskVeri !== 'undefined' &&
                  taskForm.taskVeri === 1
              "
              >漏洞工具验证</el-tag
            >
          </el-form-item>
          <el-form-item label="任务作者 :">
            <span>{{ taskForm.taskUserName }}</span>
          </el-form-item>
        </el-form>
      </div>
      <div class="header-right">
        <img :src="taskIcon.src" alt="任务图标" />
      </div>
    </div>
    <div class="detail-body">
      <div class="detail-top">
        <h1 class="title">任务详情</h1>
      </div>
      <div class="detail-main">
        <BaseTable :tid="tid" :task-status="taskForm.taskStatus" />
      </div>
    </div>
  </div>
</template>

<script>
import { getTaskDetail } from "@/api/task";
export default {
  name: "TaskDetail",
  components: {
    /* 按需加载组件 */
    BaseTable: () => import("./BaseTable/BaseTable.vue")
  },
  props: {},
  data() {
    return {
      // 任务表单
      taskForm: {
        // : "2019-04-11T08:46:01.000+0000"
        // endTime: null
        // remarks: null
        // startTime: "2019-04-11T09:16:06.000+0000"
        // taskAnti: 2
        // taskHomo: 2
        // taskLevel: null
        // taskMorph: 2
        // taskName: "新任务59"
        // taskSensi: 1
        // taskStatus: 1
        // taskUid: 6
        // taskUserName: "test002"
        // taskVeri: 2
        // tid: 59
        taskName: "任务名称",
        remarks: "",
        createTime: "",
        taskUserName: "",
        taskStatus: -1
      },
      // 任务列表
      taskTable: [
        // {
        //   uploadId: 491,
        //   fileSHA1: "2098a650eb5896a5b6cef4ea08abd9ca913efa25",
        //   fileSHA256:
        //     "fb5b59ae05692e7e628a64ec48d8ddc53dc624e9f198896c222114229aa02e9e",
        //   fileSSDEEP:
        //     "12288:3Powop57TEtekBplIl1bs7akdMrgq1jqq3ggCzPX61Omv1NSecL4FSLsOV15URZg:hOe",
        //   suffix: "html",
        //   fileName: "index.html",
        //   saveUrl: "/group1/M00/00/04/wKgCcFytWAiAAH2oABL6Nxhs8Rc59.html",
        //   fileMD5: "81967f68746d92bb83994778305113d7",
        //   fileType: "html",
        //   taskContents: {},
        //   modalForm: { taskSensi: { isChecked: false } },
        //   fileSize: 1214.5537109375
        // }
      ],
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
    // 任务id
    tid() {
      return parseInt(this.$route.params.tid);
    },
    taskIcon() {
      let taskStatus = this.taskForm.taskStatus;
      switch (taskStatus) {
        case 1:
          return { src: require("./images/task_dqd.png") };
        case 2:
          return { src: require("./images/task_jxz.png") };
        case 3:
          return { src: require("./images/task_ywc.png") };
        case 4:
          return { src: require("./images/task_sb.png") };
        default:
          return { src: "" };
      }
    }
  },
  watch: {},
  methods: {
    /**
     * @description 获取任务详情
     */
    async getTaskDetail() {
      try {
        let { status, data } = await getTaskDetail(this.tid);
        if (status === 200) {
          this.taskForm = data;
          return data;
        }
      } catch (e) {
        throw e;
      }
    }
  },
  created() {
    this.getTaskDetail().catch(err => {
      console.log(err);
    });
    // this.timer = setInterval(() => {
    //   console.log(this);
    //   this.getTaskDetail()
    //     .then(res => {
    //       if (res.taskStatus === 3) {
    //         clearInterval(this.timer);
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }, 5000);
  },
  mounted() {},
  beforeDestroy() {
    // if (this.timer) {
    //   //如果定时器还在运行 或者直接关闭，不用判断
    //   window.clearInterval(this.timer); //关闭
    // }
  }
};
</script>
<style>
.task-detail .el-tag {
  margin-right: 8px;
}
</style>

<style lang="stylus" scoped>
.task-detail
  .detail-header
    display flex
    justify-content space-between
    margin 0 12px 20px 6px
    margin-top 43px
    padding 15px 10px 10px 40px
    background-color #fff
    box-shadow 1px 0 10px #ccc

    &.affix
      margin-top 40px

    .header-left
      padding-left 50px
      background url('./images/task_name.png') no-repeat 0 0 / 30px 30px
      color #333

      .task-name
        display flex
        align-items center

        img
          margin-right 20px
          width 30px

        .name
          color #2ab2e4
          font-size 24px

      .task-form
        .task-item
          display inline-block
          margin-right 6px
          padding 5px
          border-radius 5px
          background-color #2ab2e4
          color #fff
          line-height 20px

    .header-right
      img
        margin-right 100px
        width 200px

  .detail-body
    margin 0 12px 20px 6px
    padding 10px
    background-color #fff
    box-shadow 1px 0 10px #ccc

    .detail-top
      display flex
      justify-content space-between
      align-items center
      padding 0 0 10px 30px
      border-bottom 1px solid #ccc
      line-height 30px

    .detail-footer
      display flex
      justify-content flex-end
      padding 10px 10px 5px 10px
</style>
