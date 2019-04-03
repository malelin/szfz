<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 任务概览组件
 * @Date: 2019-04-01 18:17:27
 * @LastEditTime: 2019-04-03 09:52:58
 -->
<template>
  <div class="task-overview">
    <div class="form-container">
      <el-form
        :model="taskOverviewForm"
        :rules="taskOverviewRules"
        ref="taskOverviewForm"
        label-width="80px"
        label-position="left"
        class="task-overview-form"
      >
        <el-form-item>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="关键字" prop="keyword">
                <el-input
                  style="width:70%;"
                  placeholder="请输入"
                  v-model="taskOverviewForm.keyword"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态">
                <el-select
                  style="width:100%;"
                  v-model="taskOverviewForm.stateSelect.selected"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="option in taskOverviewForm.stateSelect.options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  >
                  </el-option>
                </el-select> </el-form-item
            ></el-col>
            <el-col :span="8">
              <el-form-item label-width="50px"
                ><el-button type="primary">查&nbsp;询</el-button>
                <el-button>清&nbsp;空</el-button>
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
        </el-form-item>
        <el-collapse v-model="activeNames">
          <el-collapse-item name="1">
            <el-row>
              <el-col :span="16">
                <el-form-item>
                  <el-col :span="12">
                    <el-form-item label="创建时间" prop="startTime">
                      <el-date-picker
                        v-model="taskOverviewForm.startTime"
                        type="datetime"
                        placeholder="请选择开始时间"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="结束时间" prop="startTime">
                      <el-date-picker
                        v-model="taskOverviewForm.endTime"
                        type="datetime"
                        placeholder="请选择结束时间"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item prop="checkedList">
                  <el-checkbox-group v-model="taskOverviewForm.checkedList">
                    <el-checkbox label="同源分析" />
                    <el-checkbox label="敏感信息分析" />
                    <el-checkbox label="静态仿真分析" />
                    <el-checkbox label="工具变形与验证" />
                    <el-checkbox label="漏洞工具验证" />
                  </el-checkbox-group> </el-form-item
              ></el-col>
              <el-col :span="8">
                <el-form-item>&nbsp;</el-form-item>
                <el-form-item>
                  <el-col :span="24">
                    <el-select
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
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row></el-collapse-item
          >
        </el-collapse>
      </el-form>
    </div>
    <div class="table-container" ref="tableContainer">
      <!-- 表格 -->
      <el-table
        ref="taskTable"
        :data="tableData"
        tooltip-effect="dark"
        :height="tableHeight"
        style="width: 100%;"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="日期" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="100"
        style="margin-top:20px;"
        layout="prev, pager, next, jumper"
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
        keyword: "",
        startTime: "",
        endTime: "",
        stateSelect: {
          selected: "",
          options: [
            {
              value: "HTML",
              label: "HTML"
            },
            {
              value: "CSS",
              label: "CSS"
            },
            {
              value: "JavaScript",
              label: "JavaScript"
            }
          ]
        },
        checkedList: [],
        // 批量选中下拉框
        plczSelect: {
          selected: "",
          option: [
            {
              value: "dd",
              label: "ddd"
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
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],

      // 表格高度
      tableHeight: 300,
      multipleSelection: [],
      currentPage3: 5
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
        this.$nextTick(() => {
          this.setTableHeight();
        });
      } else {
        // 收起
        this.activeNames.pop();
        this.$nextTick(() => {
          this.setTableHeight();
        });
      }
    }, 300),
    handleSizeChange() {},
    handleCurrentChange() {},
    /**
     * @description 设置表格高度
     */
    setTableHeight: _.debounce(function() {
      this.tableHeight = this.$refs.tableContainer.offsetHeight - 52;
    })
  },
  created() {},
  mounted() {
    // 页面加载完毕后设置表格的高度
    this.setTableHeight();
    // 监听屏幕的尺寸,动态设置表格的高度
    window.addEventListener("resize", this.setTableHeight);
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
