<!--
 * @Author: 旺苍扛把子
 * @Date: 2019-05-15 12:47:48
 * @LastEditTime: 2019-05-16 09:44:01
 * @reference: 监控台
 * @Description: 监控台安全仿真分析任务设置modal
 -->

<template>
  <modal
    name="modalAntiSetting"
    :draggable="true"
    class="modal-anti-setting"
    :clickToClose="false"
    transition="fade"
    height="auto"
    width="50%"
  >
    <p class="setting-name">安全仿真分析设置</p>
    <div class="an-setting-wrapper">
      <anti-setting
        ref="antiSetting"
        class="c-anti-setting"
        :anti="anti"
        :show-is-checked="false"
      >
        <div class="setting-footer" slot="setting-footer">
          <el-button size="mini" @click.native="handleSure" type="primary"
            >确定</el-button
          >
          <el-button @click.native="handleModalClose" size="mini"
            >取消</el-button
          >
        </div></anti-setting
      >
    </div>
  </modal>
</template>

<script>
import { createTask } from "@/api/task";
import _ from "lodash";
export default {
  name: "ModalAntiSetting",
  components: {
    /* 按需加载组件 */
    AntiSetting: () => import("../Setting/AntiSetting/AntiSetting.vue")
  },
  props: {
    anti: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    handleSure() {
      let aids = this.$refs.antiSetting.model.aids;
      if (aids.length === 0) {
        this.$message({
          type: "warning",
          message: "请选择杀毒软件"
        });
      } else {
        this.createTask()
          .then(result => {
            console.log(result);
            this.$attrs.engine.isLoading = false;
            this.$router.push("/taskOverview");
          })
          .catch(err => {
            console.log(err);
          });
        this.$modal.hide("modalAntiSetting");
      }
    },
    handleModalClose() {
      this.anti.aids = [];
      this.$attrs.engine.isLoading = false;
      this.$modal.hide("modalAntiSetting");
    },
    async createTask() {
      let anti = this.$refs.antiSetting.model;
      let object = this.$attrs.object;
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
      } = object;
      let base = {
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
        setting: { anti: _.cloneDeep(anti) }
      };
      debugger;
      let param = {
        model: 2,
        objects: [base]
      };
      try {
        let { data } = await createTask(param);
        return data;
      } catch (e) {
        throw e;
      }
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang="stylus" scoped>
.modal-anti-setting
  line-height 1
  .setting-name
    line-height 40px
    padding-left 20px
    border-bottom 1px solid #ebeef5
    margin-bottom 10px
  .an-setting-wrapper
    padding 20px
    .setting-footer
      display flex
      justify-content flex-end
      padding-top 10px
</style>
