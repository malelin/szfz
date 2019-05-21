<!--
 * @Author: 旺苍扛把子
 * @Date: 2019-05-15 12:59:41
 * @LastEditTime: 2019-05-17 10:54:53
 * @reference: 
 * @Description: 安全仿真分析的所有设置
 -->
<template>
  <el-card class="c-el-card anti-setting">
    <slot name="setting-header"></slot>
    <el-form
      label-position="left"
      ref="antiSetting"
      :inline="false"
      label-width="80px"
      :model="model"
    >
      <el-row v-if="showIsChecked">
        <el-col>
          <el-form-item
            label-width="110px"
            prop="isChecked"
            label="安全仿真分析 :"
          >
            <el-switch
              v-model="model.isChecked"
              active-text="开启"
              :active-value="true"
              inactive-text="关闭"
              :inactive-value="false"
            /> </el-form-item
        ></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label-width="110px" label="杀毒软件选择 :" prop="aids">
            <el-scrollbar class="anti-select">
              <el-tree
                :show-checkbox="model.isChecked"
                @check-change="treeCheckChange"
                default-expand-all
                class="aids-tree"
                ref="tree"
                :data="antiTree"
                node-key="id"
                :default-checked-keys="model.aids"
              >
              </el-tree> </el-scrollbar
          ></el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="检测模式 :" prop="model">
            <el-switch
              :disabled="!model.isChecked"
              v-model="model.model"
              active-text="动态检测"
              :active-value="2"
              inactive-text="静态检测"
              :inactive-value="1"
            >
            </el-switch> </el-form-item
          ><el-form-item label="网络状态 :" prop="network">
            <el-switch
              :disabled="!model.isChecked"
              v-model="model.network"
              active-text="开启"
              inactive-text="关闭"
              :active-value="1"
              :inactive-value="2"
            >
            </el-switch> </el-form-item
          ><el-form-item label-width="100px" label="命令行参数 :" prop="param">
            <el-input
              :disabled="!model.isChecked"
              style="width:170px;"
              v-model.trim="model.param"
            ></el-input> </el-form-item
          ><el-form-item label="检测时长 :" prop="time">
            <el-select
              :disabled="!model.isChecked"
              style="width:80px;"
              v-model="model.time"
              placeholder="请选择检测时长"
            >
              <el-option
                v-for="option in checkDurationOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              >
              </el-option>
            </el-select> </el-form-item
        ></el-col> </el-row
    ></el-form>
    <slot name="setting-footer"></slot>
  </el-card>
</template>

<script>
import { getAntiTree } from "@/api/anti";
import _ from "lodash";
export default {
  name: "AntiSetting",
  components: {},
  props: {
    anti: {
      type: Object,
      required: true
    },
    showIsChecked: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      model: {
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
      antiTree: [],
      // 检测时长
      checkDurationOptions: [
        { label: "45s", value: 1 },
        { label: "60s", value: 2 },
        { label: "90s", value: 3 },
        { label: "120s", value: 4 }
      ]
    };
  },
  computed: {},
  watch: {
    anti: {
      deep: true,
      immediate: true,
      handler: function(val) {
        this.model = _.cloneDeep(val);
      }
    }
  },
  methods: {
    resetForm() {
      this.$refs.antiSetting.resetFields();
    },

    /**
     * @description 获取选中的杀软aids
     */
    _getAids() {
      let nodes = this.$refs.tree.getCheckedNodes();
      return nodes
        .filter(node => {
          return typeof node.id !== "undefined";
        })
        .map(({ id }) => id);
    },
    treeCheckChange() {
      this.model.aids = this._getAids();
    }
  },
  created() {
    console.log("anti-setting-created");
    getAntiTree()
      .then(({ data }) => {
        this.antiTree = data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  beforeDestroy() {
    console.log("anti-setting-beforeDestroy");
    this.resetForm();
  },
  mounted() {}
};
</script>
<style></style>

<style lang="stylus" scoped>
.anti-setting
  line-height 1
  .anti-select {
    height: 240px;
    margin-top: 10px;
    overflow-x: hidden;
}
</style>
