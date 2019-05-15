<!--
 * @Author: 旺苍扛把子
 * @Date: 2019-05-15 12:59:41
 * @LastEditTime: 2019-05-15 15:48:42
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
      :model="anti"
    >
      <el-row v-if="showIsChecked">
        <el-col>
          <el-form-item
            label-width="110px"
            prop="isChecked"
            label="安全仿真分析 :"
          >
            <el-switch
              v-model="anti.isChecked"
              active-text="启用"
              :active-value="true"
              inactive-text="禁用"
              :inactive-value="false"
            /> </el-form-item
        ></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <p class="anti-select-title">杀毒软件选择 :</p>
          <el-scrollbar class="anti-select">
            <el-tree
              @check-change="treeCheckChange"
              default-expand-all
              ref="tree"
              :data="antiTree"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[2, 3]"
            >
            </el-tree>
          </el-scrollbar>
        </el-col>
        <el-col :span="12">
          <el-form-item label="检测模式 :" prop="model">
            <el-switch
              :disabled="!anti.isChecked"
              v-model="anti.model"
              active-text="动态检测"
              :active-value="2"
              inactive-text="静态检测"
              :inactive-value="1"
            >
            </el-switch> </el-form-item
          ><el-form-item label="网络状态 :" prop="network">
            <el-switch
              :disabled="!anti.isChecked"
              v-model="anti.network"
              active-text="开启"
              inactive-text="关闭"
              :active-value="1"
              :inactive-value="2"
            >
            </el-switch> </el-form-item
          ><el-form-item label-width="100px" label="命令行参数 :" prop="param">
            <el-input
              :disabled="!anti.isChecked"
              style="width:170px;"
              v-model.trim="anti.param"
            ></el-input> </el-form-item
          ><el-form-item label="检测时长 :" prop="time">
            <el-select
              :disabled="!anti.isChecked"
              style="width:80px;"
              v-model="anti.time"
              placeholder="请选择检测时长"
            >
              <el-option
                v-for="option in checkDurationOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              >
              </el-option> </el-select></el-form-item
        ></el-col> </el-row
    ></el-form>
    <slot name="setting-footer"></slot>
  </el-card>
</template>

<script>
import { getAntiTree } from "@/api/anti";
export default {
  name: "AntiSetting",
  components: {
    /* 按需加载组件 */
    // demo: () => import('@/pages/')
  },
  props: {
    /*  <WelcomeMessage greeting-text="hi"/> */
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
  watch: {},
  methods: {
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
      this.anti.aids = this._getAids();
    }
  },
  created() {
    getAntiTree()
      .then(({ data }) => {
        this.antiTree = data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {}
};
</script>

<style lang="stylus" scoped>
.anti-setting
  line-height 1
  .anti-select {
    height: 180px;
    overflow-x: hidden;
    padding-left: 110px;
}
</style>
