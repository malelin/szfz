<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 任务概览组件
 * @Date: 2019-04-01 18:17:27
 * @LastEditTime: 2019-04-11 14:13:50
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
            <el-form-item label="任务名称 :" prop="taskname">
              <el-input
                style="width:70%;"
                placeholder="请输入"
                v-model.trim="taskOverviewForm.taskname"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态 :" prop="taskStatus">
              <el-select
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
                    :default-time="['00:00:00']"
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
                    :default-time="['00:00:00']"
                  >
                  </el-date-picker>
                </el-form-item> </el-col
            ></el-row>
            <el-row type="flex" align="middle">
              <el-col :span="16">
                <el-form-item prop="taskContents">
                  <el-checkbox-group v-model="taskOverviewForm.taskContents">
                    <el-checkbox label="同源分析" />
                    <el-checkbox label="敏感信息分析" />
                    <el-checkbox label="静态仿真分析" />
                    <el-checkbox label="漏洞工具验证" />
                    <el-checkbox label="工具变形与验证" />
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  ><el-select
                    style="width:110px;margin-right:5px;"
                    v-model="plczSelect.selected"
                    placeholder="批量操作"
                  >
                    <el-option
                      v-for="item in plczSelect.selected"
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
        :data="tableData.list"
        tooltip-effect="dark"
        style="width: 100%;"
        class="c-el-table"
      >
        <el-table-column align="center" type="selection" width="55">
        </el-table-column>
        <el-table-column align="center" label="任务编号" width="80" prop="tid">
        </el-table-column>
        <el-table-column align="center" prop="taskName" label="任务名称">
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="startTime"
          label="开始时间"
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
          :filters="[
            { text: '完成', value: 1 },
            { text: '进行中', value: 2 },
            { text: '待启动', value: 3 }
          ]"
          :filter-method="filterHandler"
        >
          <!-- 1 带启动
          2 进行中
          3 完成
          4 失败 -->
          <template slot-scope="{ row }">
            <template v-if="row.taskStatus === 2">
              <i
                style="display:inline-block;vertical-align:middle;border-radius: 50%;background-color:#409EFF;width: 5px;height: 5px;"
              ></i>
              <span style="vertical-align:middle;margin-left: 10px;"
                >进行中</span
              >
            </template>
            <template v-if="row.taskStatus === 1">
              <i
                style="display:inline-block;vertical-align:middle;border-radius: 50%;background-color:#aaaaaa;width: 5px;height: 5px;"
              ></i>
              <span style="vertical-align:middle;margin-left: 10px;"
                >待启动</span
              >
            </template>
            <template v-if="row.taskStatus === 3">
              <i
                style="display:inline-block;vertical-align:middle;border-radius: 50%;background-color:#67C23A;width: 5px;height: 5px;"
              ></i>
              <span style="vertical-align:middle;margin-left: 10px;">完成</span>
            </template>
            <template v-if="row.taskStatus === 4">
              <i
                style="display:inline-block;vertical-align:middle;border-radius: 50%;background-color:#F56C6C;width: 5px;height: 5px;"
              ></i>
              <span style="vertical-align:middle;margin-left: 10px;">失败</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="taskContent" label="任务内容">
          <template slot-scope="{ row }">
            <span class="task-item" v-if="row.taskHomo === 1">同源分析</span>
            <span class="task-item" v-if="row.taskAnti === 1"
              >静态仿真分析</span
            >
            <span class="task-item" v-if="row.taskMorph === 1"
              >工具变形与验证</span
            >
            <span class="task-item" v-if="row.taskSensi === 1"
              >敏感信息分析</span
            >
            <span class="task-item" v-if="row.taskVeri === 1"
              >漏洞工具验证</span
            >
          </template>
        </el-table-column>
        <el-table-column align="center" prop="operate" label="操作">
          <template slot-scope="{ row }">
            <el-button size="mini" type="primary">查看</el-button>
            <el-button
              size="mini"
              v-if="row.taskStatus === 1 || row.taskStatus === 3"
              type="danger"
              >删除</el-button
            >
            <el-button
              size="mini"
              v-if="row.taskStatus === 1 || row.taskStatus === 3"
              style="margin-top:5px;"
              type="success"
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
import { utc2LocalDate, formatChinese } from "@/utils/day";
import { getDefaultTask, getTask } from "@/api/task";
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
        taskname: "",
        // 创建时间段
        createTimeRange: [],
        // 结束时间段
        finishedTimeRange: [],
        // 状态下拉
        taskStatus: "",
        // 多选框
        taskContents: []
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
      // 任务概览组件表单校验规则
      taskOverviewRules: {},
      // 表格数据
      tableData: {
        list: [
          {
            tid: 8,
            taskStatus: 1,
            taskLevel: 1,
            taskUid: 5,
            taskName: "新任务8",
            startTime: "2019-04-16T03:11:24.000+0000",
            endTime: "2019-04-17T03:11:29.000+0000",
            taskHomo: 2,
            taskSensi: 1,
            taskAnti: 2,
            taskVeri: 2,
            taskMorph: 2,
            remarks: null
          },
          {
            tid: 8,
            taskStatus: 1,
            taskLevel: 1,
            taskUid: 5,
            taskName: "新任务8",
            startTime: "2019-04-16T03:11:24.000+0000",
            endTime: "2019-04-17T03:11:29.000+0000",
            taskHomo: 2,
            taskSensi: 1,
            taskAnti: 2,
            taskVeri: 2,
            taskMorph: 2,
            remarks: null
          },
          {
            tid: 8,
            taskStatus: 1,
            taskLevel: 1,
            taskUid: 5,
            taskName: "新任务8",
            startTime: "2019-04-16T03:11:24.000+0000",
            endTime: "2019-04-17T03:11:29.000+0000",
            taskHomo: 2,
            taskSensi: 1,
            taskAnti: 2,
            taskVeri: 2,
            taskMorph: 2,
            remarks: null
          },
          {
            tid: 8,
            taskStatus: 1,
            taskLevel: 1,
            taskUid: 5,
            taskName: "新任务8",
            startTime: "2019-04-16T03:11:24.000+0000",
            endTime: "2019-04-17T03:11:29.000+0000",
            taskHomo: 2,
            taskSensi: 1,
            taskAnti: 2,
            taskVeri: 2,
            taskMorph: 2,
            remarks: null
          },
          {
            tid: 8,
            taskStatus: 1,
            taskLevel: 1,
            taskUid: 5,
            taskName: "新任务8",
            startTime: "2019-04-16T03:11:24.000+0000",
            endTime: "2019-04-17T03:11:29.000+0000",
            taskHomo: 2,
            taskSensi: 1,
            taskAnti: 2,
            taskVeri: 2,
            taskMorph: 2,
            remarks: null
          },
          {
            tid: 8,
            taskStatus: 1,
            taskLevel: 1,
            taskUid: 5,
            taskName: "新任务8",
            startTime: "2019-04-16T03:11:24.000+0000",
            endTime: "2019-04-17T03:11:29.000+0000",
            taskHomo: 2,
            taskSensi: 1,
            taskAnti: 2,
            taskVeri: 2,
            taskMorph: 2,
            remarks: null
          },
          {
            tid: 11,
            taskStatus: 3,
            taskLevel: 2,
            taskUid: 5,
            taskName: "新任务11",
            startTime: "2019-03-26T05:33:22.000+0000",
            endTime: "2019-03-26T05:35:11.000+0000",
            taskHomo: 2,
            taskSensi: 1,
            taskAnti: 2,
            taskVeri: 2,
            taskMorph: 2,
            remarks: null
          },
          {
            tid: 12,
            taskStatus: 2,
            taskLevel: null,
            taskUid: 5,
            taskName: "新任务12",
            startTime: "2019-04-08T02:27:10.000+0000",
            endTime: null,
            taskHomo: 2,
            taskSensi: 2,
            taskAnti: 1,
            taskVeri: 2,
            taskMorph: 2,
            remarks: null
          },
          {
            endTime: "2019-04-17T03:11:29.000+0000",
            remarks: null,
            startTime: "2019-04-16T03:11:24.000+0000",
            //静态仿真分析
            taskAnti: 2,
            // 同源分析
            taskHomo: 2,
            taskLevel: 1,
            // 工具变形与验证
            taskMorph: 2,
            taskName: "新任务8",
            // 敏感信息分析 1 开启 2 未开启
            taskSensi: 1,
            // 状态 1 未启动 2 进行中 3,完成 4,失败
            taskStatus: 1, // 1 查看 启动 删除 2 查看 3 查看 启动 删除
            taskUid: 5,
            // 漏洞工具验证
            taskVeri: 2,
            // 任务编号
            tid: 8
          }
        ]
      },
      tableHeight: 300,
      multipleSelection: [],
      // 分页组件
      pagination: {
        size: 10,
        currentPage: 1
      }
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

    handleSearch: _.debounce(async function() {
      let {
        taskname,
        createTimeRange: [enableTimeStart, enableTimeEnd],
        finishedTimeRange: [finishTimeStart, finishTimeEnd],
        taskStatus,
        taskContents: tem
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
     * @description 过滤处理器
     */
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    utc2LocalDate(utcDateString) {
      return utc2LocalDate(utcDateString);
    }
  },
  created() {
    // 请求默认任务;
    getDefaultTask()
      .then(res => {
        console.log(res);
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
    flex 1
    overflow hidden
    background-color greeen

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
