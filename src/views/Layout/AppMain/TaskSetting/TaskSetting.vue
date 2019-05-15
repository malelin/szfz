<!--
 * @Author: 旺苍扛把子
 * @reference: 创建任务组件,任务概览组件
 * @Description: 任务设置模态框
 * @Date: 2019-05-13 11:26:53
 * @LastEditTime: 2019-05-15 14:10:00
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
            :model="taskSetting"
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
                      v-model="taskSetting.sensi.isChecked"
                      active-text="启用"
                      :active-value="true"
                      inactive-text="禁用"
                      :inactive-value="false"
                    />
                  </el-form-item>
                </el-card>
              </el-collapse-item>
              <el-collapse-item title="安全仿真分析" name="2">
                <anti-setting :anti="taskSetting.anti"></anti-setting>
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
      }
    };
  },
  computed: {},
  watch: {
    // "taskSetting.anti.isChecked"(newValue) {
    //   this._setAntiTreeIsActivated(this.antiTree, newValue);
    // },
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
      // // modal打开的类型
      // let typeOpen = this.modalTaskSetting.typeOpen;
      // // 单个任务的设置
      // if (typeOpen === "single") {
      //   // 设置表单内容
      //   this._setTaskSetting();
      // }
    },
    /**
     * @description 关闭modal
     */

    handleModalClose() {
      this.$emit("get-data", null);
      this.$refs.taskSetting.resetFields();
      // this._setAntiTreeIsActivated(this.antiTree, false);
      this._clearAids();
      this.$modal.hide("modalTaskSetting");
    },
    // /**
    //  * @description modal关闭之前的事件
    //  */
    // async beforeModalClosed() {
    //   // 生成任务内容
    //   let typeOpen = this.modalTaskSetting.typeOpen;
    //   typeOpen === "single"
    //     ? this._generateTaskContent([this.currentRow])
    //     : this._generateTaskContent(this.uploadFileList);
    //   this.$refs["modalTaskSetting"].resetFields();
    // },
    /**
     * @description 获取选中的杀软aids
     */
    // _getAids() {
    //   let nodes = this.$refs.tree.getCheckedNodes();
    //   return nodes
    //     .filter(node => {
    //       return typeof node.id !== "undefined";
    //     })
    //     .map(({ id }) => id);
    // },
    /**
     * @description 清空选中的杀软aids
     */
    _clearAids() {
      this.taskSetting.anti.aids = [];
    },
    /**
     * @description 确定按钮
     */
    handleSure() {
      let aids = this.taskSetting.anti.aids;
      if (this.taskSetting.anti.isChecked) {
        if (aids.length > 0) {
          this.taskSetting.anti.aids = aids;
        } else {
          this.$message({
            type: "warning",
            message: "请选择杀毒软件"
          });
          return false;
        }
      }
      this.$emit("get-data", JSON.parse(JSON.stringify(this.taskSetting)));
      this.$refs.taskSetting.resetFields();
      this.$modal.hide("modalTaskSetting");
    }
    // setCheckedNodes() {
    //   let aids = this.taskSetting.anti.aids;
    //   this.$refs.tree.setCheckedNodes(aids);
    // }
  },
  created() {},
  mounted() {}
};
</script>
<style>
.task-setting .el-transfer-panel {
  width: 268px;
}
.task-setting .anti-select {
  height: 180px;
  overflow-x: hidden;
  padding-left: 110px;
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
