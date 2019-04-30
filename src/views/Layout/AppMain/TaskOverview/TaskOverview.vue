<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 任务概览组件
 * @Date: 2019-04-01 18:17:27
 * @LastEditTime: 2019-04-30 11:59:57
 -->
<template>
  <div class="task-overview">
    <div class="form-container">
      <el-form
        :model="taskOverviewForm"
        ref="taskOverviewForm"
        label-position="right"
        label-width="100px"
        class="task-overview-form"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="任务名称 :" prop="taskname">
              <el-input
                placeholder="请输入"
                v-model.trim="taskOverviewForm.taskname"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态 :" prop="taskStatus">
              <el-select
                style="width:100%;"
                v-model="taskOverviewForm.taskStatus"
                placeholder="请选择"
              >
                <el-option label="完成" value="3"></el-option>
                <el-option label="进行中" value="2"></el-option>
                <el-option label="待启动" value="1"></el-option>
                <el-option label="失败" value="4"></el-option>
                <el-option label="全部" value=" "></el-option>
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
        <transition
          name="custom-classes-transition"
          enter-active-class="animated  fadeInDown"
          leave-active-class="animated  fadeOutUp"
        >
          <div v-if="!options.isFold">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="起始时间段 :" prop="createTimeRange">
                  <el-date-picker
                    style="width:100%;"
                    v-model="taskOverviewForm.createTimeRange"
                    type="datetimerange"
                    start-placeholder="起始启动时间"
                    end-placeholder="起始完成时间"
                    :default-time="['00:00:00']"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="finishedTimeRange" label="结束时间段 :">
                  <el-date-picker
                    style="width:100%;"
                    v-model="taskOverviewForm.finishedTimeRange"
                    type="datetimerange"
                    start-placeholder="结束启动时间"
                    end-placeholder="结束完成时间"
                    :default-time="['00:00:00']"
                  >
                  </el-date-picker>
                </el-form-item> </el-col
            ></el-row>
            <el-row type="flex" :gutter="20" align="top">
              <el-form-item label-width="20px" prop="checkedEngines">
                <el-col>
                  <el-checkbox
                    size="medium"
                    :indeterminate="options.isIndeterminate"
                    v-model="options.checkAll"
                    border
                    @change="handleCheckAllChange"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    style="display:inline-block;"
                    size="medium"
                    v-model="taskOverviewForm.checkedEngines"
                  >
                    <el-checkbox
                      v-for="engine in options.engines"
                      :key="engine"
                      border
                      :label="engine"
                    />
                  </el-checkbox-group>
                </el-col> </el-form-item
            ></el-row></div
        ></transition>
      </el-form>
    </div>
    <div class="table-container" ref="tableContainer">
      <!-- 表格 -->
      <div class="button-wrapper">
        <el-button @click.native="handleCreateTask" size="medium" type="primary"
          ><svg-icon
            icon-class="add"
            style="margin-right:5px;color:#fff;"
          ></svg-icon
          >新建</el-button
        >
      </div>
      <div type="flex" class="table-tip">
        <el-alert type="info" :closable="false" show-icon>
          <div class="alert-inner">
            <span class="text">
              已选择{{ multipleSelection.length }}项, 任务总计{{
                tableData.list.length
              }}项</span
            >
            <el-button
              @click.native="toggleSelection"
              style="margin-left:50px;"
              type="text"
              >清空</el-button
            >
          </div>
        </el-alert>
      </div>
      <el-table
        ref="taskTable"
        :data="tableData.list"
        tooltip-effect="dark"
        style="width: 100%;"
        class="c-el-table"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection"> </el-table-column>
        <el-table-column align="center" width="100" label="任务编号" prop="tid">
        </el-table-column>
        <el-table-column align="center" prop="taskName" label="任务名称">
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="startTime"
          label="开始时间"
          width="150"
        >
          <template slot-scope="{ row }">
            <p style="color:#409eff;" v-if="row.startTime !== ''">
              {{ row.startTime | utc2LocalYmd }}
            </p>
            <p v-else style="color:#409eff;">
              ---
            </p>
            <p style="color:#409eff;" v-if="row.startTime !== ''">
              {{ row.startTime | utc2LocalTime }}
            </p>
            <p v-else style="color:#409eff;">
              ---
            </p>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="endTime"
          label="结束时间"
          width="150"
        >
          <template slot-scope="{ row }">
            <p style="color:#409eff;" v-if="row.endTime !== ''">
              {{ row.endTime | utc2LocalYmd }}
            </p>
            <p v-else style="color:#409eff;">
              ---
            </p>
            <p style="color:#409eff;" v-if="row.endTime !== ''">
              {{ row.endTime | utc2LocalTime }}
            </p>
            <p v-else style="color:#409eff;">
              ---
            </p>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="taskStatus"
          label="状态"
          width="100"
        >
          <!-- 1 带启动
          2 进行中
          3 完成
          4 失败 -->

          <template slot-scope="{ row }">
            <status :status="row.taskStatus" />
          </template>
        </el-table-column>
        <el-table-column align="center" prop="taskContent" label="任务内容">
          <template slot-scope="{ row }">
            <el-tag v-if="row.taskHomo === 1">同源分析</el-tag>
            <el-tag v-if="row.taskAnti === 1">静态仿真分析</el-tag>
            <el-tag v-if="row.taskMorph === 1">工具变形与验证</el-tag>
            <el-tag v-if="row.taskSensi === 1">敏感信息分析</el-tag>
            <el-tag v-if="row.taskVeri === 1">漏洞工具验证</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          prop="operate"
          label="操作"
          width="250px"
        >
          <template slot-scope="{ row, $index }">
            <el-button
              @click.native="handleTaskView(row, $index)"
              size="mini"
              type="primary"
              >查看</el-button
            >
            <el-button
              size="mini"
              v-if="row.taskStatus === 1 || row.taskStatus === 3"
              type="danger"
              @click.native="handleTaskDelete(row, $index)"
              >删除</el-button
            >
            <el-button
              size="mini"
              v-if="row.taskStatus === 1 || row.taskStatus === 3"
              style="margin-top:5px;"
              type="success"
              @click.native="handleTaskLaunch(row, $index)"
              >启动</el-button
            >
          </template></el-table-column
        >
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pagination.currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pagination.size"
        layout="sizes, prev, pager, next"
        :total="tableData.total"
        class="c-el-pagination"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
// 导入时间处理工具函数
import { formatChinese } from "@/utils/day";
import { getDefaultTask, getTask, deleteTask, executeTask } from "@/api/task";
export default {
  name: "TaskOverview",
  data() {
    return {
      // 任务概览组件表单数据
      taskOverviewForm: {
        taskname: "",
        // 创建时间段
        createTimeRange: [],
        // 结束时间段
        finishedTimeRange: [],
        // 状态下拉
        taskStatus: "",
        // 多选框
        checkedEngines: []
      },
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
      },
      // 折叠项
      activeNames: [],
      // 表格数据
      tableData: {
        list: []
      },
      tableHeight: 300,
      multipleSelection: [],
      // 分页组件
      pagination: {
        size: 10,
        currentPage: 1
      },
      // 组件中所有的配置
      options: {
        // 是否展开
        isFold: true,
        // 检测内容配置
        engines: [
          "同源分析",
          "敏感信息分析",
          "静态仿真分析",
          "漏洞工具验证",
          "工具变形与验证"
        ],
        checkAll: false,
        checkedEngines: [],
        isIndeterminate: true
      }
    };
  },
  computed: {
    //  按钮文字, 展开或收起
    buttonState() {
      return this.options.isFold
        ? { text: "展开", isActiveRotate: false }
        : { text: "收起", isActiveRotate: true };
    }
  },
  methods: {
    /**
     * @description 收起和展开折叠面板,防抖处理
     */
    handleFold: _.debounce(function() {
      this.options.isFold = !this.options.isFold;
    }, 300),
    /**
     * @description 新建任务
     */
    handleCreateTask: _.debounce(function() {
      this.$router.push("/createTask");
    }, 300),
    /**
     * @description 清空所有选中任务
     */
    toggleSelection: _.debounce(function() {
      debugger;
      this.$refs.taskTable.clearSelection();
    }, 300),
    /**
     * @description 切换每页显示条数
     */
    async handleSizeChange(size) {
      this.pagination.size = size;
      try {
        let res = await getDefaultTask({
          page: this.pagination.currentPage,
          rows: size
        });
        console.log(res);
        this.tableData = res.data;
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * @description 当前页改变
     */
    async handleCurrentChange(pageIndex) {
      try {
        let res = await getDefaultTask({
          page: pageIndex,
          rows: this.pagination.size
        });
        console.log(res);
        this.tableData = res.data;
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * @description 根据表单查询,获取任务列表
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSearch: _.debounce(async function() {
      let {
        taskname,
        createTimeRange: [enableTimeStart, enableTimeEnd],
        finishedTimeRange: [finishTimeStart, finishTimeEnd],
        taskStatus,
        checkedEngines: tem
      } = this.taskOverviewForm;
      let taskContents = [];
      // taskContent拼装成数组[1,2,3,4,5]
      tem.forEach(item => {
        switch (item) {
          case "同源分析":
            taskContents.push(1);
            break;
          case "敏感信息分析":
            taskContents.push(2);
            break;
          case "静态仿真分析":
            taskContents.push(3);
            break;
          case "漏洞工具验证":
            taskContents.push(4);
            break;
          case "工具变形与验证":
            taskContents.push(5);
            break;
          default:
            break;
        }
      });

      let params = {
        taskname,
        enableTimeStart,
        enableTimeEnd,
        finishTimeStart,
        finishTimeEnd,
        taskStatus,
        taskContents: taskContents + ""
      };
      // 删除params中无效的参数
      for (let key in params) {
        if (params.hasOwnProperty(key)) {
          let value = params[key];
          if (
            value === "" ||
            (Array.isArray(value) && value.length === 0) ||
            value === undefined ||
            value === " "
          ) {
            delete params[key];
          } else {
            if (
              [
                "enableTimeStart",
                "enableTimeEnd",
                "finishTimeStart",
                "finishTimeEnd"
              ].indexOf(key) !== -1
            ) {
              params[key] = formatChinese(value);
            }
          }
        }
      }
      try {
        let { data } = await getTask(params);
        this.tableData = data;
      } catch (e) {
        console.log(e);
      }
    }, 300),

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
      this.tableHeight = this.$refs.tableContainer.offsetHeight - 52;
    }),
    /**
     * @description 启动操作
     */
    handleTaskLaunch: _.debounce(async function(row) {
      let tids = row.tid;
      try {
        let { status } = await executeTask(tids);
        if (status === 200) {
          let { data } = await getDefaultTask({
            page: this.pagination.currentPage,
            rows: this.pagination.size
          });
          this.tableData = data;
          this.$message({ type: "success", message: "任务启动成功" });
        }
      } catch (e) {
        console.log(e);
      }
    }),
    /**
     * @description 删除操作
     */
    handleTaskDelete: _.debounce(async function(row) {
      let tid = row.tid;
      try {
        let { status } = await deleteTask(tid);
        if (status === 200) {
          let { data } = await getDefaultTask();
          this.tableData = data;
          this.$message({
            type: "success",
            message: "删除任务成功"
          });
        }
      } catch (e) {
        console.log(e);
      }
    }),
    /**
     * @description 查看操作
     */
    handleTaskView: _.debounce(async function(row) {
      let tid = row.tid;
      this.$router.push({ path: `/taskDetail/${tid}` });
    }),
    /**
     * @description 处理检测内容全选按钮改变
     */
    handleCheckAllChange(val) {
      this.taskOverviewForm.checkedEngines = val ? this.options.engines : [];
      this.options.isIndeterminate = false;
    },
    /**
     * @description 处理检测内容选中项改变
     */
    handleCheckedEnginesChange(value) {
      let checkedCount = value.length;
      this.options.checkAll = checkedCount === this.options.engines.length;
      this.options.isIndeterminate =
        checkedCount > 0 && checkedCount < this.options.engines.length;
    }
  },
  created() {
    // 请求默认任务;
    getDefaultTask()
      .then(res => {
        this.tableData = res.data;
      })
      .catch(err => console.log(err));
  },
  mounted() {},
  updated() {}
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

.task-overview .el-checkbox {
  margin-right: 10px;
}
.task-overview .alert-inner .text {
  font-size: 16px;
}
.task-overview .el-button--text {
  font-size: 16px;
}
.task-overview .el-alert {
  margin: 10px 0;
}
.task-overview .el-tag {
  margin: 5px 8px 0 0;
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
    position relative

    .button-wrapper
      position absolute
      top -61px
      right 31px
      z-index 2

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

    .c-el-pagination
      padding 15px 0

  .svg-icon
    transition all 0.1s

    &.rotate
      transition all 0.1s
      transform rotate(180deg)
</style>
