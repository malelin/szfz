<!--
 * @Author: 旺苍扛把子
 * @LastEditors: Please set LastEditors
 * @Description: 任务对象设置,用到
 * @reference: 创建任务组件和任务概览组件中
 * @Date: 2019-05-07 10:50:38
 * @LastEditTime: 2019-05-08 11:21:48
 -->
<template>
  <div class="object-setting">
    <el-tabs type="border-card">
      <el-tab-pane label="敏感信息分析设置">
        <el-checkbox
          disabled
          border
          size="medium"
          v-model="settings.sensi.isChecked"
          label="敏感信息分析"
        ></el-checkbox>
      </el-tab-pane>
      <el-tab-pane label="安全仿真分析设置"
        ><el-form :model="settings.anti">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label-width="100px" label="杀毒软件 :">
                <el-select
                  disabled
                  v-model="settings.anti.aids"
                  multiple
                  placeholder="请选择杀毒软件"
                  @change="onAntiActivated"
                >
                  <el-option
                    v-for="option in settings.anti.antisOptions"
                    :key="option.aid"
                    :label="option.antiName"
                    :value="option.aid"
                  >
                    <span style="float: left">{{ option.antiName }}</span>
                    <span
                      style="float: right; color: #8492a6; font-size: 13px"
                      >{{ option.antiCountry }}</span
                    >
                  </el-option>
                </el-select>
              </el-form-item></el-col
            >
            <el-col :span="12">
              <el-form-item label-width="100px" label="检测模式 :">
                <el-switch
                  disabled
                  v-model="settings.anti.model"
                  active-text="动态检测"
                  :active-value="2"
                  inactive-text="静态检测"
                  :inactive-value="1"
                >
                </el-switch> </el-form-item
            ></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12"
              ><el-form-item label-width="100px" label="网络状态 :">
                <el-switch
                  disabled
                  v-model="settings.anti.network"
                  active-text="开启"
                  inactive-text="关闭"
                  :active-value="1"
                  :inactive-value="2"
                >
                </el-switch> </el-form-item
            ></el-col>
            <el-col :span="12">
              <el-form-item label-width="100px" label="命令行参数 :">
                <el-input
                  disabled
                  v-model.trim="settings.anti.param"
                ></el-input> </el-form-item
            ></el-col>
          </el-row>
          <el-form-item label-width="100px" label="检测时长 :">
            <el-select
              disabled
              v-model="settings.anti.time"
              placeholder="请选择检测时长"
            >
              <el-option
                v-for="option in checkDurationOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              >
              </el-option> </el-select
          ></el-form-item> </el-form
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "ObjectSetting",
  props: {
    // 任务文件
    row: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      checkDurationOptions: [
        { label: "45s", value: 1 },
        { label: "60s", value: 2 },
        { label: "90s", value: 3 },
        { label: "120s", value: 4 }
      ]
    };
  },
  computed: {
    settings() {
      let sensi = { isChecked: this.row.openSensitivity === 1 ? true : false };
      let anti = this.row.anti;
      return { sensi, anti };
    }
  },
  watch: {},
  methods: {},
  created() {
    console.log(undefined == null);
  },
  mounted() {}
};
</script>

<style lang="stylus" scoped>
.object-setting
  line-height 1
</style>
