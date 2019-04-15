<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 封装任务详情和新建任务中的表格
 * @Date: 2019-04-12 09:46:16
 * @LastEditTime: 2019-04-15 09:25:31
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
              typeof row.analysis !== 'undefined' &&
                row.analysis.sensitivity !== 10
            "
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
            <el-button
              v-show="taskStatus === 3"
              type="success"
              size="mini"
              @click.native="handleView($index, row)"
              >查看报告</el-button
            >
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
  </div>
</template>

<script>
import _ from "lodash";
import { getTaskDetailList } from "@/api/task";
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
      taskTable: [
        {
          fileMD5: "3fb42cd646add8453f86c667c8f973ac",
          fileName: "AB.bundle~CB.bundle.bdcfc084.js",
          fileSHA1: "9c19aff835e6534ae61295ddbb79d2cdea344457",
          fileSHA256:
            "50c515d4b03bab731b62c47dce5598b6e1128ddd44356863a96739e46c621d2e",
          fileSSDEEP:
            "384:LAaOmPk7AgtKeMIkdVQ1cW+YIs99mHPhEv/Ti9V:0aOmPkkgwgkschYL99mvGv/Ti9V",
          fileSize: 19200,
          fileType: "未识别",
          objectResult: 5,
          analysis: {
            oid: 326,
            homology: 10,
            sensitivity: 21,
            antivirus: 10,
            verification: 10,
            morph: 10,
            hTime: null,
            sTime: null,
            aTime: null,
            vTime: null,
            mTime: null
          }
        },
        {
          fileMD5: "f3d29b9602a292fca20ccefd2679dabf",
          fileName: "AB.bundle~CB.bundle.fd644765.js",
          fileSHA1: "02a0f276cfa4119ed8a8591e015091f5442f2bdd",
          fileSHA256:
            "c9f28b7aae3e90bb98ed9eb21b63a81a3d1787864c6af6115ecc34baa8f9b167",
          fileSSDEEP:
            "384:L1aOmPHANFSGBIk0VQ1cW+YIs99mHPMjjVNa9V:ZaOmPgNcVkvchYL99mvGjVNa9V",
          fileSize: 19200,
          fileType: "未识别",
          objectResult: 5,
          analysis: {
            oid: 327,
            homology: 10,
            sensitivity: 21,
            antivirus: 10,
            verification: 10,
            morph: 10,
            hTime: null,
            sTime: null,
            aTime: null,
            vTime: null,
            mTime: null
          }
        },
        {
          fileMD5: "28c9b240c7251e2110136cbd485c34d3",
          fileName: "AB.bundle~AMB.bundle.e68e6808.js",
          fileSHA1: "f15a7d89f0d1dd57dc1ffab001cff11f349b5e98",
          fileSHA256:
            "4dec1f7bac480ffeed1e8b4831a8729bfdaf8b40c47e44e1b84a0288bd745214",
          fileSSDEEP:
            "384:TkSgg+A6hmw94jqQ4kCI1DRwekBYRZ+1hjIW0xJOIDPcjTMaqMV1j8RkcQ:TkSJ+3hB4+yq/BYRQ1SFPDPKpqMLekcQ",
          fileSize: 35203,
          fileType: "未识别",
          objectResult: 5,
          analysis: {
            oid: 328,
            homology: 10,
            sensitivity: 21,
            antivirus: 10,
            verification: 10,
            morph: 10,
            hTime: null,
            sTime: null,
            aTime: null,
            vTime: null,
            mTime: null
          }
        },
        {
          fileMD5: "f888e744d0955ed0b1c8ba95c9438f6b",
          fileName: "AMB.bundle.c141f692.js",
          fileSHA1: "5f0a7a4198d23b69b5d80ee81382ee15a61807d4",
          fileSHA256:
            "e59560765eece1f7a18e03a4b62d888af6757980bdf5c5388328ceeb96645219",
          fileSSDEEP:
            "1536:hS7cBAz/ZnrsjNlSlD9QfCcXzTiC8pqa1hDcTQtECSyh20hg3iGsBHGKmW95CytI:87RVsjnSl+E15R20hFHGKmu5Bc",
          fileSize: 190052,
          fileType: "html",
          objectResult: 5,
          analysis: {
            oid: 329,
            homology: 10,
            sensitivity: 21,
            antivirus: 10,
            verification: 10,
            morph: 10,
            hTime: null,
            sTime: null,
            aTime: null,
            vTime: null,
            mTime: null
          }
        },
        {
          fileMD5: "4de69294d108dfab7369f06be3d0008a",
          fileName: "AMB.bundle.dd99e738.js",
          fileSHA1: "98c1fc132fb89c2f8a6b881271392a0b1c999c3b",
          fileSHA256:
            "0586e447484b11bc2d8f6fcf8d26167006b206cc827509a2c9d9746f1169ceaa",
          fileSSDEEP:
            "1536:vSJcBA1/ZnrsjNlSlD9QfCcXzTiC8pqa1hDcTQtECSyh20hg3iGsBj5GKmW95Cy7:aJfVsjnSl+E15R20hF1GKmu5Bd",
          fileSize: 190052,
          fileType: "html",
          objectResult: 5,
          analysis: {
            oid: 330,
            homology: 10,
            sensitivity: 21,
            antivirus: 10,
            verification: 10,
            morph: 10,
            hTime: null,
            sTime: null,
            aTime: null,
            vTime: null,
            mTime: null
          }
        },
        {
          fileMD5: "2ef8b48d0d52f56cece2d184cd1728b4",
          fileName: "CB.bundle.b6a33a5b.js",
          fileSHA1: "cc5bada057266b328591780ad23958804d5ce495",
          fileSHA256:
            "f892463119c8a3fd3d2f74f0ee77eaefb8dfe3359d8c6141976d92dc25b0ea34",
          fileSSDEEP:
            "6144:it375kFz77Ue8DNt29N9NYQzsuiIWsfsWmMUMushwBh73DBN3pQzs38BMWEIanbm:CklAK9zi4H0VxNV387ab9OYplhkKH1FO",
          fileSize: 1199954,
          fileType: "html",
          objectResult: 5,
          analysis: {
            oid: 331,
            homology: 10,
            sensitivity: 21,
            antivirus: 10,
            verification: 10,
            morph: 10,
            hTime: null,
            sTime: null,
            aTime: null,
            vTime: null,
            mTime: null
          }
        },
        {
          fileMD5: "3fe5a5b1c3863c63b65248e24513406e",
          fileName: "CB.bundle.313c7ae9.js",
          fileSHA1: "8898dce9009b665edc53c167890af92e41d9ace5",
          fileSHA256:
            "d4a25db1e40c3abe8d6ce53e8e65c2960c36ff7833094f930900896ddfd07a0f",
          fileSSDEEP:
            "6144:Ht375kFz77Ue8DNt29N9NYQzsuiIWsfsWmMUMushwBh73DBN3pQzs38BMWEIanba:bklAK9zi4H0VxNV387ab9OYplhz2H1Fd",
          fileSize: 1199954,
          fileType: "html",
          objectResult: 5,
          analysis: {
            oid: 332,
            homology: 10,
            sensitivity: 21,
            antivirus: 10,
            verification: 10,
            morph: 10,
            hTime: null,
            sTime: null,
            aTime: null,
            vTime: null,
            mTime: null
          }
        },
        {
          uploadId: 1602,
          fileSHA1: "3a727e4b3cf73f5d496a7b912c9f4ec964f8f396",
          fileSHA256:
            "57fff245a6c38010a18d915fdf990b10ee4887b594ce98624179c72b134a780d",
          fileSSDEEP:
            "49152:wuj+gqXaEnPZEQ/ekJ50GR5B4xiZ35b542C+EGPu6CMfBHMmylKUCae14vB8pGN:OnP3/ekJe24qX42CCsTlK5a28Bx",
          suffix: "dll",
          fileName: "2345Image.dll",
          saveUrl: "/group1/M00/00/10/wKgCcFywZxOAM060AChGOJqZaNE345.dll",
          fileMD5: "0eb5c116a2bae2ee21d9560a2a7aaa57",
          fileType: "exe",
          openSensitivity: 2,
          modalForm: { taskSensi: { isChecked: false } },
          fileSize: 2639416
        }
      ],
      // 上传的文件列表
      uploadFiles: [],
      // modal表单
      modalForm: {
        // 敏感信息分析
        taskSensi: { isChecked: false }
      },
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
      currentRow: {}
    };
  },
  computed: {
    // 获取的接口数据转换成表格需要的数据
    transFromTaskTable() {
      let res = [];
      // anaAnti: null
      // anaHomo: null
      // anaVeri: null
      // analysis: Object
      //   aTime: null
      //   antivirus: 10
      //   hTime: null
      //   homology: 10
      //   mTime: null
      //   morph: 10
      //   oid: 264
      //   sTime: "2019-04-12T02:29:02.000+0000"
      //   sensitivity: 25
      //   vTime: null
      //   verification: 10
      // objectEndTime: "2019-04-11T09:24:47.000+0000"
      // objectMd5: "4e0ebb2d1df24e00a5cd7b21f804740d"
      // objectName: "tt - 副本.html"
      // objectResult: null
      // objectSha1: "4b229b7101db8e9cf7d38433680541b40dfd2184"
      // objectSha256: "2c7a87bfe6c51906a3160e75bb4ca34133ec031f446cf0760709f4ddd8a75af6"
      // objectSize: 13849
      // objectSsdeep: "384:fFVkHCNlbHMFzxBimKxBQ/ex2yn7Y4SpyricE:TkHC3bHgNBiz2iMCa"
      // objectSuffix: "html"
      // objectTid: 61
      // objectType: "docx"
      // objectUploadTime: "2019-04-11T09:18:42.000+0000"
      // objectUrl: "/group1/M00/00/0E/wKgCcFyvBluAYAySAAA2GTi3CHQ52.html"
      // oid: 255
      // 通过接口获取的任务详情的对象列表
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
          analysis
        } = item;
        let file = {
          fileMD5,
          fileName,
          fileSHA1,
          fileSHA256,
          fileSSDEEP,
          fileSize,
          fileType,
          objectResult,
          analysis
        };
        res.push(file);
      });

      return res;
    }
  },
  watch: {},
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
          this.transFromTaskTable.findIndex(item => {
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
          saveUrl,
          fileMD5,
          fileType,
          openSensitivity: 2,
          modalForm: { taskSensi: { isChecked: false } },
          fileSize
        };
        debugger;
        this.taskTable.push(file);
        debugger;
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
      debugger;
      this.currentEditItem = index;
      this.currentRow = row;
      this.modalForm = JSON.parse(JSON.stringify(row.modalForm));
      this.$modal.show("taskSetting");
    }, 300),

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
        debugger;
        //  开启敏感检测，1/开启，2/不开启 ,
        if (this.modalForm.taskSensi.isChecked === true) {
          this.$set(this.currentRow, "openSensitivity", 1);
        } else {
          this.$set(this.currentRow, "openSensitivity", 2);
        }
        debugger;
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
     * @description object格式转file格式
     */
    Object2File(arr) {
      let res = [];
      arr.forEach(item => {
        let {
          objectMd5: fileMD5,
          objectName: fileName,
          objectSha1: fileSHA1,
          objectSha256: fileSHA256,
          objectSsdeep: fileSSDEEP,
          objectSize: fileSize,
          objectType: fileType,
          objectResult,
          analysis
        } = item;
        let modalForm = { taskSensi: {} };
        debugger;
        modalForm.taskSensi.isChecked =
          analysis.sensitivity === 10 ? false : true;
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
          modalForm
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
          console.log(data);
          this.taskTable = this.Object2File(data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {}
};
</script>

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
