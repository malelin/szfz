<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 任务概览组件
 * @Date: 2019-04-01 18:17:27
 * @LastEditTime: 2019-04-03 14:43:44
 -->
<template>
  <div class="task-overview">
    <div class="form-container">
      <el-form
        :model="taskOverviewForm"
        :rules="taskOverviewRules"
        ref="taskOverviewForm"
        label-position="left"
        class="task-overview-form"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="任务名称 :" prop="taskName">
              <el-input
                style="width:70%;"
                placeholder="请输入"
                v-model="taskOverviewForm.taskName"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态 :" prop="stateSelect">
              <el-select
                v-model="taskOverviewForm.stateSelect"
                placeholder="请选择"
              >
                <el-option label="完成" value="1"></el-option>
                <el-option label="进行中" value="2"></el-option>
                <el-option label="待启动" value="3"></el-option>
              </el-select> </el-form-item
          ></el-col>
          <el-col :span="8">
            <el-form-item label-width="50px"
              ><el-button type="primary" @click.native="handleSearch"
                >查&nbsp;询</el-button
              >
              <el-button @click="resetForm('taskOverviewForm')"
                >清&nbsp;空</el-button
              >
              <el-button @click.native="handleFold" type="text"
                >{{ buttonState.text
                }}<svg-icon
                  style="margin-left:5px;"
                  icon-class="fold"
                  :class="{ rotate: buttonState.isActiveRotate }"
                ></svg-icon
              ></el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-collapse v-model="activeNames">
          <el-collapse-item name="1">
            <el-row>
              <el-col :span="10">
                <el-form-item label="起始时间段 :" prop="createTimeRange">
                  <el-date-picker
                    v-model="taskOverviewForm.createTimeRange"
                    type="datetimerange"
                    style="width:60%;"
                    start-placeholder="起始启动时间"
                    end-placeholder="起始完成时间"
                    :default-time="['12:00:00']"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item prop="finishedTimeRange" label="结束时间段 :">
                  <el-date-picker
                    v-model="taskOverviewForm.finishedTimeRange"
                    type="datetimerange"
                    style="width:60%;"
                    start-placeholder="结束启动时间"
                    end-placeholder="结束完成时间"
                    :default-time="['12:00:00']"
                  >
                  </el-date-picker>
                </el-form-item> </el-col
            ></el-row>
            <el-row type="flex" align="middle">
              <el-col :span="16">
                <el-form-item prop="checkedList">
                  <el-checkbox-group v-model="taskOverviewForm.checkedList">
                    <el-checkbox label="同源分析" />
                    <el-checkbox label="敏感信息分析" />
                    <el-checkbox label="静态仿真分析" />
                    <el-checkbox label="工具变形与验证" />
                    <el-checkbox label="漏洞工具验证" />
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  ><el-select
                    style="width:110px;margin-right:5px;"
                    v-model="taskOverviewForm.plczSelect.selected"
                    placeholder="批量操作"
                  >
                    <el-option
                      v-for="item in taskOverviewForm.plczSelect.selected"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                  <el-button type="primary"
                    ><svg-icon
                      icon-class="add"
                      style="margin-right:5px;color:#fff;"
                    ></svg-icon
                    >新建</el-button
                  >
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </div>
    <div class="table-container" ref="tableContainer">
      <!-- 表格 -->
      <el-table
        ref="taskTable"
        :data="tableData"
        tooltip-effect="dark"
        :height="380"
        style="width: 100%;"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="任务编号" width="80" prop="id">
        </el-table-column>
        <el-table-column prop="name" label="任务名称"> </el-table-column>
        <el-table-column sortable prop="createTime" label="创建时间">
        </el-table-column>
        <el-table-column sortable prop="finishedTime" label="完成时间">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          :filters="[
            { text: '2016-05-01', value: '2016-05-01' },
            { text: '2016-05-02', value: '2016-05-02' },
            { text: '2016-05-03', value: '2016-05-03' },
            { text: '2016-05-04', value: '2016-05-04' }
          ]"
          :filter-method="filterHandler"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.state }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="taskContent" label="任务内容"> </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="{}">
            <el-button size="mini">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template></el-table-column
        >
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="100"
        layout="sizes, prev, pager, next"
        :total="1000"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "TaskOverview",
  components: {
    /* 按需加载组件 */
    // demo: () => import('@/pages/')
  },
  props: {
    /*  <WelcomeMessage greeting-text="hi"/> */
    //   'greetingText': {
    //     type: [String,Number],
    //     required: true
    //  }
  },
  data() {
    return {
      // 任务概览组件表单数据
      taskOverviewForm: {
        taskName: "",
        // 创建时间段
        createTimeRange: "",
        // 结束时间段
        finishedTimeRange: "",
        // 状态下拉
        stateSelect: "",
        // 多选框
        checkedList: [],
        // 批量选中下拉框
        plczSelect: {
          selected: "",
          option: [
            {
              value: "1",
              label: "完成"
            },
            {
              value: "2",
              label: "进行中"
            },
            {
              value: "3",
              label: "待启动"
            }
          ]
        }
      },
      // 折叠项
      activeNames: [],
      // 任务概览组件表单校验规则
      taskOverviewRules: {},
      // 表格数据
      tableData: [
        {
          id: 1,
          name: "特种任务",
          createTime: "2018-10-02",
          finishedTime: "2019-02-02",
          state: "1",
          taskContent: "这是任务内容",
          operate: "操作"
        },
        {
          id: 2,
          name: "特种任务",
          createTime: "2018-10-03",
          finishedTime: "2019-02-02",
          state: "1",
          taskContent: "这是任务内容",
          operate: "操作"
        },
        {
          id: 3,
          name: "特种任务",
          createTime: "2018-10-04",
          finishedTime: "2019-02-02",
          state: "1",
          taskContent: "这是任务内容",
          operate: "操作"
        },
        {
          id: 4,
          name: "特种任务",
          createTime: "2018-10-05",
          finishedTime: "2019-02-02",
          state: "1",
          taskContent: "这是任务内容",
          operate: "操作"
        },
        {
          id: 5,
          name: "特种任务",
          createTime: "2018-10-06",
          finishedTime: "2019-02-02",
          state: "1",
          taskContent: "这是任务内容",
          operate: "操作"
        },
        {
          id: 6,
          name: "特种任务",
          createTime: "2018-10-07",
          finishedTime: "2019-02-02",
          state: "1",
          taskContent: "这是任务内容",
          operate: "操作"
        },
        {
          id: 7,
          name: "特种任务",
          createTime: "2018-10-08",
          finishedTime: "2019-02-02",
          state: "1",
          taskContent: "这是任务内容",
          operate: "操作"
        }
      ],

      // 表格高度
      tableHeight: 300,
      multipleSelection: [],
      // 分页组件的当前页码
      currentPage: 5
    };
  },
  computed: {
    //  按钮文字, 展开或收起
    buttonState() {
      return this.activeNames[0] === "1"
        ? { text: "收起", isActiveRotate: true }
        : { text: "展开", isActiveRotate: false };
    }
  },
  watch: {},
  methods: {
    /**
     * @description 收起和展开折叠面板,防抖处理
     */
    handleFold: _.debounce(function() {
      if (this.activeNames.length === 0) {
        // 展开
        this.activeNames.push("1");
      } else {
        // 收起
        this.activeNames.pop();
      }
    }, 300),
    handleSizeChange() {},
    handleCurrentChange() {},
    /**
     * @description 根据表单查询
     */

    handleSearch() {},
    /**
     * @description 清空表单
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /**
     * @description 设置表格高度
     */
    setTableHeight: _.debounce(function() {
      // console.log(
      //   // "tableContainer高度:" + this.$refs.tableContainer.offsetHeight
      // );
      this.tableHeight = this.$refs.tableContainer.offsetHeight - 52;
    }),
    /**
     * @description 过滤处理器
     */
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    }
  },
  created() {},
  mounted() {
    // 页面加载完毕后设置表格的高度
    this.setTableHeight();
    // 监听屏幕的尺寸,动态设置表格的高度
    window.addEventListener("resize", this.setTableHeight);
  },
  updated() {
    // this.$nextTick(() => {
    //   console.log(
    //     "tableContainer高度:" + this.$refs.tableContainer.offsetHeight
    //   );
    // });
  }
};
</script>
<style>
/* 清除折叠面板上下边框 */
.task-overview .el-collapse {
  border-top: none;
}
.task-overview .el-collapse-item__wrap {
  border-bottom: none;
}
.task-overview .el-collapse {
  border: none;
}
/* 隐藏折叠面板头部 */
.task-overview .el-collapse-item__header {
  display: none;
}
</style>

<style lang="stylus" scoped>
.task-overview
  display flex
  flex-direction column
  padding 15px 15px 0
  background-color #fff
  line-height 1

  .form-container
    // background-color pink

  .table-container
    flex 1
    overflow hidden
    background-color greeen

  .svg-icon
    transition all 0.1s

    &.rotate
      transition all 0.1s
      transform rotate(180deg)
</style>
