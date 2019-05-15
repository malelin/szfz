<!--
 * @Author: 旺苍扛把子
 * @LastEditors: Please set LastEditors
 * @Description: 任务对象设置
 * @reference: 创建任务组件和任务概览组件中
 * @Date: 2019-05-07 10:50:38
 * @LastEditTime: 2019-05-14 15:59:19
 -->
<template>
  <div class="setting-overview">
    <el-tabs type="border-card">
      <el-tab-pane label="敏感信息分析设置">
        <el-checkbox
          disabled
          border
          size="medium"
          v-model="setting.sensi.isChecked"
          label="敏感信息分析"
        ></el-checkbox>
      </el-tab-pane>
      <el-tab-pane label="安全仿真分析设置"
        ><el-form :model="setting.anti">
          <el-row :gutter="20">
            <el-col>
              <el-form-item label-width="100px" label="杀毒软件 :">
                <el-card>
                  <el-tag type="info" v-for="tag in antiTags" :key="tag">{{
                    tag
                  }}</el-tag>
                </el-card>
              </el-form-item></el-col
            >
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12"
              ><el-form-item label-width="100px" label="网络状态 :">
                <el-switch
                  disabled
                  v-model="setting.anti.network"
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
                  style="width:200px;"
                  disabled
                  v-model.trim="setting.anti.param"
                ></el-input> </el-form-item
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label-width="100px" label="检测模式 :">
                <el-switch
                  disabled
                  v-model="setting.anti.model"
                  active-text="动态检测"
                  :active-value="2"
                  inactive-text="静态检测"
                  :inactive-value="1"
                >
                </el-switch> </el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item label-width="100px" label="检测时长 :">
                <el-select
                  disabled
                  v-model="setting.anti.time"
                  placeholder="请选择检测时长"
                >
                  <el-option
                    v-for="option in checkDurationOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  >
                  </el-option> </el-select
              ></el-form-item>
            </el-col>
          </el-row> </el-form
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getAntiInfo } from "@/api/anti";
export default {
  name: "SettingOverview",
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
      ],
      antiTags: []
    };
  },
  computed: {
    setting() {
      return this.row.setting;
    },
    aids() {
      return this.row.setting.anti.aids;
    }
  },
  watch: {},
  methods: {
    /**
     * @description 根据安全仿真aids获取杀软全名
     */
    async getAntiTagByAids(aids) {
      try {
        let { status, data } = await getAntiInfo(aids);
        if (status === 200) {
          return data.map(({ fullName }) => fullName);
        }
      } catch (e) {
        throw e;
      }
    }
  },
  created() {
    (async () => {
      try {
        let aids = this.aids + "";
        this.antiTags = await this.getAntiTagByAids(aids);
      } catch (e) {
        console.log(e);
      }
    })();
  },
  mounted() {}
};
</script>

<style lang="stylus" scoped>
.setting-overview
  line-height 1
</style>
