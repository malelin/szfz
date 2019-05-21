<!--
 * @Author: 旺苍扛把子
 * @reference: 创建任务组件,任务概览组件
 * @Description: 任务设置模态框
 * @Date: 2019-05-13 11:26:53
 * @LastEditTime: 2019-05-21 11:52:06
 -->
<template>
  <modal
    name="modalTaskSetting"
    :draggable="true"
    :clickToClose="false"
    class="c-modal"
    @before-open="beforeModalOpen"
    transition="fade"
    height="auto"
    width="50%"
    @before-close="beforeModalClose"
  >
    <div class="task-setting">
      <el-card>
        <div slot="header" class="clearfix">
          <span>任务设置</span>
        </div>
        <div class="modal-body">
          <el-form
            label-position="left"
            ref="taskSetting"
            :inline="false"
            label-width="80px"
            :model="model"
          >
            <el-collapse v-model="activatedCollapse" accordion>
              <el-collapse-item title="敏感信息分析" name="1"
                ><el-card class="c-el-card">
                  <el-form-item
                    label-width="110px"
                    prop="sensi.isChecked"
                    label="敏感信息分析:"
                  >
                    <el-switch
                      v-model="model.sensi.isChecked"
                      active-text="开启"
                      :active-value="true"
                      inactive-text="关闭"
                      :inactive-value="false"
                    />
                  </el-form-item>
                </el-card>
              </el-collapse-item>
              <el-collapse-item title="安全仿真分析" name="2">
                <anti-setting
                  ref="antiSetting"
                  :anti="model.anti"
                ></anti-setting>
              </el-collapse-item>
            </el-collapse>
          </el-form>
        </div>
        <div class="modal-footer">
          <el-button size="mini" @click.native="handleSure" type="primary"
            >确定</el-button
          >
          <el-button @click.native="handleModalClose" size="mini"
            >取消</el-button
          >
        </div></el-card
      >
    </div>
  </modal>
</template>

<script>
import { getAntiTree } from "@/api/anti";
import _ from "lodash";
export default {
  name: "TaskSetting",
  components: {
    AntiSetting: () => import("../Setting/AntiSetting/AntiSetting.vue")
  },
  props: {
    taskSetting: {
      type: Object,
      default() {
        return {
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
        };
      }
    }
  },
  data() {
    return {
      activatedCollapse: [],
      // 杀软树
      antiTree: [],
      // 检测时长
      checkDurationOptions: [
        { label: "45s", value: 1 },
        { label: "60s", value: 2 },
        { label: "90s", value: 3 },
        { label: "120s", value: 4 }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      model: null
    };
  },
  computed: {},
  watch: {
    taskSetting: {
      deep: true,
      immediate: true,
      handler: function(val) {
        this.model = _.cloneDeep(val);
      }
    }
  },
  methods: {
    /**
     * @description 安全仿真引擎关闭开启的切换事件
     */
    antiIsCheckedChange(value) {
      this._setAntiTreeIsActivated(this.antiTree, value ? true : false);
    },
    /**
     * @description 设置杀软列表是否可用
     */
    _setAntiTreeIsActivated(data, value) {
      data.forEach(item => {
        this.$set(item, "disabled", value ? false : true);
        if (typeof item.children !== "undefined") {
          this._setAntiTreeIsActivated(item.children, value);
        }
      });
    },
    /**
     * @description modal打开之前,获取数据
     */
    async beforeModalOpen() {
      try {
        // 获取安全仿真引擎的杀软列表
        let { status, data } = await getAntiTree();
        if (status === 200) {
          this.antiTree = data;

          // this.setCheckedNodes();
          // this._setAntiTreeIsActivated(this.antiTree, false);
        }
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * @description modal关闭之前,获取数据
     */
    beforeModalClose() {
      console.log("beforeModalClose");
      this.$refs.taskSetting.resetFields();
    },
    /**
     * @description 关闭modal
     */
    handleModalClose() {
      this.$emit("get-task-setting", null);
      this.$refs.taskSetting.resetFields();
      this.$modal.hide("modalTaskSetting");
    },
    /**
     * @description 确定按钮
     */
    handleSure() {
      let taskSetting = this.getTaskSetting();
      if (taskSetting.anti.isChecked && taskSetting.anti.aids.length === 0) {
        this.$message({
          type: "warning",
          message: "请选择杀毒软件"
        });
        return false;
      }
      this.$emit("get-task-setting", _.cloneDeep(taskSetting));
      this.$refs.taskSetting.resetFields();
      this.$modal.hide("modalTaskSetting");
    },
    /**
     * @description 获取安全仿真分析引擎设置
     */
    _getAnti() {
      let model = this.$refs.antiSetting.model;
      return model;
    },
    /**
     * @description 获取敏感信息分析引擎设置
     */
    _getSensi() {
      return this.model.sensi;
    },
    /**
     * @description 获取所有引擎设置
     */
    getTaskSetting() {
      let taskSetting = {};
      let anti = this._getAnti();
      let sensi = this._getSensi();
      taskSetting.sensi = sensi;
      if (anti !== null) {
        taskSetting.anti = anti;
      }
      return taskSetting;
    }
  },
  created() {},
  mounted() {}
};
</script>
<style>
.task-setting .el-transfer-panel {
  width: 268px;
}
.task-setting .el-scrollbar__wrap {
  overflow-x: hidden;
}
.c-el-card {
  margin: 8px;
}
</style>

<style lang="stylus" scoped>
.task-setting
  line-height 1

  .anti-select-title
    width 120px
    text-align left
    font-size 14px

  .modal-footer
    display flex
    justify-content flex-end
    padding-top 10px
</style>
