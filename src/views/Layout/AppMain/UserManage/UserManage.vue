<!--
 * @Author: 旺苍扛把子
 * @LastEditors: malelin
 * @Description: 用户管理组件
 * @Date: 2019-04-02 13:37:27
 * @LastEditTime: 2019-04-18 10:44:52
 -->
<template>
  <div class="user-manage">
    <!-- 重置密码弹出框 -->
    <modal
      name="resetPassword"
      class="c-modal"
      transition="fade"
      height="auto"
      @before-open="beforeModalOpen"
      @opened="onModalOpened"
      @closed="onModalClosed"
    >
      <div class="modal-header">
        <h2 class="modal-title">重置密码</h2>
        <svg-icon
          icon-class="close"
          @click.native="handleModalClose"
        ></svg-icon>
      </div>
      <div class="modal-body">
        <el-form
          :model="passwordInfo"
          :rules="passwordInfoRules"
          ref="passwordInfoForm"
          class="passwordInfo-Form"
          label-width="100px"
        >
          <el-row type="flex" justify="center">
            <el-form-item label="新密码 ：" prop="passwordNew">
              <el-input
                style="width: 240px;"
                placeholder="请输入新密码"
                v-model="passwordInfo.passwordNew"
                type="password"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row type="flex" justify="center">
            <el-form-item label="密码确认 ：" prop="passwordNewVeri">
              <el-input
                style="width: 240px;"
                placeholder="请再次输入新密码"
                v-model="passwordInfo.passwordNewVeri"
                type="password"
              ></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <div class="modal-footer">
        <el-button size="mini" @click.native="handleSave" type="primary"
          >确认</el-button
        >
        <el-button size="mini" @click.native="handleCancel">取消</el-button>
      </div>
    </modal>
    <el-tabs v-model="webSetting.activeName" @tab-click="handleClick">
      <el-tab-pane label="用户列表" name="userList">
        <div class="form-container">
          <el-form
            :model="userListForm"
            ref="userListForm"
            label-position="left"
            class="user-list-form"
          >
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="用户昵称 ：" prop="username">
                  <el-input
                    style="width:60%;"
                    placeholder="请输入查询用户昵称"
                    v-model.trim="userListForm.username"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="用户账号 ：" prop="account">
                  <el-input
                    style="width:60%;"
                    placeholder="请输入查询用户昵称"
                    v-model.trim="userListForm.account"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label-width="30px">
                  <el-button type="primary" @click.native="handleSearch">
                    查&nbsp;询
                  </el-button>
                  <el-button @click.native="resetForm('userListForm')">
                    清&nbsp;空
                  </el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="最后登录时间段 ：" prop="loginTimeRange">
                  <el-date-picker
                    v-model="userListForm.loginTimeRange"
                    type="datetimerange"
                    style="width: 60%;"
                    start-placeholde="起始时间"
                    end-placeholde="结束时间"
                    :default-time="['00:00:00']"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <el-form-item label="状态 ：" prop="status">
                  <el-select
                    v-model="userListForm.status"
                    placeholder="状态"
                    style="width: 50%"
                  >
                    <el-option label="全部" value=" "></el-option>
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="锁定" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="登录状态 ：" prop="loginStatus">
                  <el-select
                    v-model="userListForm.loginStatus"
                    placeholder="登录状态"
                    style="width: 50%"
                  >
                    <el-option label="全部" value=" "></el-option>
                    <el-option label="在线" value="1"></el-option>
                    <el-option label="离线" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="table-container" ref="tableContainer">
          <el-table
            ref="userListTable"
            :data="userTable.list"
            tooltip-effect="dark"
            style="width: 100%"
            class="c-el-table"
          >
            <el-table-column align="center" type="selection" width="55">
            </el-table-column>
            <el-table-column
              align="center"
              label="用户id"
              width="80"
              prop="uid"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="用户名"
              prop="account"
            ></el-table-column>
            <el-table-column
              align="center"
              label="昵称"
              prop="username"
            ></el-table-column>
            <el-table-column align="center" label="角色" prop="role">
              <template slot-scope="{ row }">
                <span>{{ row.role | roleToText }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="状态" prop="status">
              <template slot-scope="{ row }">
                <span>{{ row.status | statusToText }}</span>
              </template></el-table-column
            >
            <el-table-column align="center" label="登录状态" prop="isLogin">
              <template slot-scope="{ row }">
                <span>{{ row.isLogin | isLoginToText }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="最后登录时间"
              prop="lastTime"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="operate"
              label="操作"
              min-width="120px;"
            >
              <template slot-scope="{ row }">
                <el-button
                  @click.native="handleResetPassword(row)"
                  size="mini"
                  type="primary"
                  >重置密码</el-button
                >
                <el-button
                  size="mini"
                  v-if="row.isLogin === 1"
                  type="warning"
                  @click.native="handleUserOffLine(row)"
                  >下线</el-button
                >
                <el-button
                  size="mini"
                  v-if="row.status === 1"
                  style="margin-top:5px;"
                  type="danger"
                  @click.native="handleUserLock(row)"
                  >锁定</el-button
                >
                <el-button
                  size="mini"
                  v-if="row.status === 2"
                  style="margin-top:5px;"
                  type="success"
                  @click.native="handleUserUnlock(row)"
                  >解锁</el-button
                >
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pagination.currentPage"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="pagination.size"
            layout="sizes, prev, pager, next"
            :total="userTable.total"
            style="float: right;margin: 10px 0;"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="申请列表" name="applyUserList"
        ><div class="form-container">
          <el-form
            :model="userApplyListForm"
            ref="userApplyListForm"
            label-position="left"
            class="user-apply-list-form"
          >
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="用户昵称 ：" prop="username">
                  <el-input
                    style="width:60%;"
                    placeholder="请输入查询用户昵称"
                    v-model.trim="userApplyListForm.username"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="用户账号 ：" prop="account">
                  <el-input
                    style="width:60%;"
                    placeholder="请输入查询用户昵称"
                    v-model.trim="userApplyListForm.account"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label-width="30px">
                  <el-button type="primary" @click.native="handleSearchApply">
                    查&nbsp;询
                  </el-button>
                  <el-button @click.native="resetForm('userApplyListForm')">
                    清&nbsp;空
                  </el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="申请时间段 ：" prop="applyTimeRange">
                  <el-date-picker
                    v-model="userApplyListForm.applyTimeRange"
                    type="datetimerange"
                    style="width: 60%;"
                    start-placeholde="起始时间"
                    end-placeholde="结束时间"
                    :default-time="['00:00:00']"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="table-container" ref="tableContainer">
          <el-table
            ref="userApplyListTable"
            :data="userApplyTable.list"
            tooltip-effect="dark"
            style="width: 100%"
            class="c-el-table"
          >
            <el-table-column align="center" type="selection" width="55">
            </el-table-column>
            <el-table-column
              align="center"
              label="用户id"
              width="80"
              prop="uid"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="用户名"
              prop="account"
            ></el-table-column>
            <el-table-column
              align="center"
              label="昵称"
              prop="username"
            ></el-table-column>
            <el-table-column align="center" label="申请时间" prop="applyTime">
            </el-table-column>
            <el-table-column
              align="center"
              label="申请备注"
              prop="remark"
              min-width="220px"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="operate"
              label="操作"
              min-width="120px"
            >
              <template slot-scope="{ row }">
                <el-button
                  @click.native="handleApprove(row)"
                  size="mini"
                  type="success"
                  >批准</el-button
                >
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            @size-change="handleSizeChangeApply"
            @current-change="handleCurrentChangeApply"
            :current-page.sync="paginationApply.currentPage"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="paginationApply.size"
            layout="sizes, prev, pager, next"
            :total="userApplyTable.total"
            style="float: right;margin: 10px 0;"
          ></el-pagination></div
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getUserList, putUserAdvanceInfo, getApplyUserList } from "@/api/user";
import { formatChinese } from "@/utils/day";
export default {
  name: "UserMange",
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
    /**
     * @description 密码校验器
     */
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      if (value.length < 6 || value.length > 18) {
        callback(new Error("密码6~18位"));
      }
      callback();
    };
    /**
     * @description 确认密码校验器
     */
    var validatePasswordVeri = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      }
      if (value !== this.passwordInfo.passwordNew) {
        callback(new Error("两次输入密码不一致!"));
      }
      callback();
    };
    return {
      //页面配置
      webSetting: {
        activeName: "userList",
        row: ""
      },
      //用户列表表单
      userListForm: {
        username: "",
        account: "",
        status: "",
        loginStatus: "",
        loginTimeRange: []
      },
      //用户申请列表表单
      userApplyListForm: {
        username: "",
        account: "",
        applyTimeRange: []
      },
      //用户列表数据
      userTable: {
        list: []
      },
      //申请用户列表数据
      userApplyTable: {
        list: []
      },
      //用户列表分页组件
      pagination: {
        size: 10,
        currentPage: 1
      },
      //申请列表分页组件
      paginationApply: {
        size: 10,
        currentPage: 1
      },
      //密码重置
      passwordInfo: {
        passwordNew: "",
        passwordNewVeri: ""
      },
      //密码信息校验规则
      passwordInfoRules: {
        passwordNew: [{ validator: validatePassword, trigger: "blur" }],
        passwordNewVeri: [
          { validator: validatePasswordVeri, trigger: "change" }
        ]
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    /**
     * @description 批准用户注册
     */
    handleApprove(row) {
      this.$confirm("确定批准该用户注册？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = {
            status: 1,
            uid: row.uid
          };
          putUserAdvanceInfo(data)
            .then(res => {
              if (res.status === 200) {
                this.$message({
                  type: "success",
                  message: "操作成功"
                });
                getUserList()
                  .then(res => {
                    if (res.status === 200) {
                      this.userApplyTable = res.data;
                      this.paginationApply = {
                        size: 10,
                        currentPage: 1
                      };
                    } else {
                      this.$message({
                        type: "warning",
                        message: res.msg
                      });
                    }
                  })
                  .catch(err => console.log(err));
              } else {
                this.$message({
                  type: "warning",
                  message: res.msg
                });
              }
            })
            .catch(err => console.log(err));
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    /**
     * @description 解锁用户
     */
    handleUserUnlock(row) {
      this.$confirm("确定解锁该用户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = {
            status: 1,
            uid: row.uid
          };
          putUserAdvanceInfo(data)
            .then(res => {
              if (res.status === 200) {
                this.$message({
                  type: "success",
                  message: "操作成功"
                });
                getUserList()
                  .then(res => {
                    if (res.status === 200) {
                      this.userTable = res.data;
                      this.pagination = {
                        size: 10,
                        currentPage: 1
                      };
                    } else {
                      this.$message({
                        type: "warning",
                        message: res.msg
                      });
                    }
                  })
                  .catch(err => console.log(err));
              } else {
                this.$message({
                  type: "warning",
                  message: res.msg
                });
              }
            })
            .catch(err => console.log(err));
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    /**
     * @description 锁定用户
     */
    handleUserLock(row) {
      this.$confirm("确定锁定该用户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = {
            status: 2,
            uid: row.uid
          };
          putUserAdvanceInfo(data)
            .then(res => {
              if (res.status === 200) {
                this.$message({
                  type: "success",
                  message: "操作成功"
                });
                getUserList()
                  .then(res => {
                    if (res.status === 200) {
                      this.userTable = res.data;
                      this.pagination = {
                        size: 10,
                        currentPage: 1
                      };
                    } else {
                      this.$message({
                        type: "warning",
                        message: res.msg
                      });
                    }
                  })
                  .catch(err => console.log(err));
              } else {
                this.$message({
                  type: "warning",
                  message: res.msg
                });
              }
            })
            .catch(err => console.log(err));
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    /**
     * @description 设置用户下线
     */
    handleUserOffLine(row) {
      this.$confirm("确定将该用户下线？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = {
            loginStatus: 2,
            uid: row.uid
          };
          putUserAdvanceInfo(data)
            .then(res => {
              if (res.status === 200) {
                this.$message({
                  type: "success",
                  message: "操作成功"
                });
                getUserList()
                  .then(res => {
                    if (res.status === 200) {
                      this.userTable = res.data;
                      this.pagination = {
                        size: 10,
                        currentPage: 1
                      };
                    } else {
                      this.$message({
                        type: "warning",
                        message: res.msg
                      });
                    }
                  })
                  .catch(err => console.log(err));
              } else {
                this.$message({
                  type: "warning",
                  message: res.msg
                });
              }
            })
            .catch(err => console.log(err));
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    /**
     * @description 设置弹窗确认保存按钮
     */
    handleSave() {
      let isSuccessPromise = this.$refs.passwordInfoForm.validate();
      console.log(isSuccessPromise);
      isSuccessPromise
        .then(() => {
          let data = {
            password: this.passwordInfo.passwordNew,
            uid: this.webSetting.row.uid
          };
          putUserAdvanceInfo(data)
            .then(res => {
              if (res.status === 200) {
                this.$refs.passwordInfoForm.resetFields();
                this.$message({
                  type: "success",
                  message: "密码重置成功"
                });
                this.$modal.hide("resetPassword");
              } else {
                this.$message({
                  type: "warning",
                  message: res.msg
                });
              }
              getUserList()
                .then(res => {
                  if (res.status === 200) {
                    this.userTable = res.data;
                    this.pagination = {
                      size: 10,
                      currentPage: 1
                    };
                  } else {
                    this.$message({
                      type: "warning",
                      message: res.msg
                    });
                  }
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    },
    /**
     * @description 设置弹窗取消按钮
     */
    handleCancel() {
      this.$modal.hide("resetPassword");
    },
    /**
     * @description modal打开之前,获取数据
     */
    beforeModalOpen() {},
    /**
     * @description modal打开之后
     */
    onModalOpened() {},
    /**
     * @description modal关闭之前
     */
    onModalClosed() {
      this.passwordInfo = {
        passwordNew: "",
        passwordNewVeri: ""
      };
      this.webSetting.row = "";
    },
    /**
     * @description 关闭modal
     */
    handleModalClose() {
      this.$modal.hide("resetPassword");
    },
    /**
     * @description 重置密码
     */
    handleResetPassword(row) {
      this.webSetting.row = row;
      this.$modal.show("resetPassword");
    },
    /**
     * @description 当前页改变
     */
    async handleCurrentChange(pageIndex) {
      try {
        let res = await getUserList({
          page: pageIndex,
          rows: this.pagination.size
        });
        console.log(res);
        this.userTable = res.data;
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * @description 当前申请页改变
     */
    async handleCurrentChangeApply(pageIndex) {
      try {
        let res = await getApplyUserList({
          page: pageIndex,
          rows: this.paginationApply.size
        });
        console.log(res);
        this.userApplyTable = res.data;
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * @description 切换每页显示条数
     */
    async handleSizeChange(size) {
      this.pagination.size = size;
      try {
        let res = await getUserList({
          page: this.pagination.currentPage,
          rows: size
        });
        this.userTable = res.data;
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * @description 切换申请每页显示条数
     */
    async handleSizeChangeApply(size) {
      this.paginationApply.size = size;
      try {
        let res = await getApplyUserList({
          page: this.pagination.currentPage,
          rows: size
        });
        this.userApplyTable = res.data;
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * @description 根据表单查询，获取申请用户列表
     */
    handleSearchApply() {
      let params = {
        username: this.userApplyListForm.username,
        account: this.userApplyListForm.account
      };
      if (
        this.userApplyListForm.applyTimeRange !== null &&
        this.userApplyListForm.applyTimeRange.length > 0
      ) {
        params.applyTimeStart = formatChinese(
          this.userApplyListForm.applyTimeRange[0]
        );
      }
      if (
        this.userApplyListForm.applyTimeRange !== null &&
        this.userApplyListForm.applyTimeRange.length > 1
      ) {
        params.applyTimeEnd = formatChinese(
          this.userApplyListForm.applyTimeRange[1]
        );
      }
      getApplyUserList(params)
        .then(res => {
          if (res.status === 200) {
            this.userApplyTable = res.data;
            this.paginationApply = {
              size: 10,
              currentPage: 1
            };
          } else {
            this.$message({
              type: "warning",
              message: res.msg
            });
          }
        })
        .catch(err => console.log(err));
    },
    /**
     * @description 根据表单查询，获取用户列表
     */
    handleSearch() {
      let params = {
        username: this.userListForm.username,
        account: this.userListForm.account,
        status: this.userListForm.status,
        loginStatus: this.userListForm.loginStatus
      };
      if (
        this.userListForm.loginTimeRange !== null &&
        this.userListForm.loginTimeRange.length > 0
      ) {
        params.loginTimeStart = formatChinese(
          this.userListForm.loginTimeRange[0]
        );
      }
      if (
        this.userListForm.loginTimeRange !== null &&
        this.userListForm.loginTimeRange.length > 1
      ) {
        params.loginTimeEnd = formatChinese(
          this.userListForm.loginTimeRange[1]
        );
      }
      getUserList(params)
        .then(res => {
          if (res.status === 200) {
            this.userTable = res.data;
            this.pagination = {
              size: 10,
              currentPage: 1
            };
          } else {
            this.$message({
              type: "warning",
              message: res.msg
            });
          }
        })
        .catch(err => console.log(err));
    },
    /**
     * @description 点击标签页的方法
     */
    handleClick(tab, event) {
      console.log(tab, event);
    },
    /**
     * @description 清空表单
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
      console.log(this.userListForm.loginTimeRange);
    }
  },
  created() {
    //请求已注册用户
    getUserList()
      .then(res => {
        if (res.status === 200) {
          this.userTable = res.data;
          this.pagination = {
            size: 10,
            currentPage: 1
          };
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          });
        }
      })
      .catch(err => console.log(err));
    //请求未注册用户
    getApplyUserList()
      .then(res => {
        if (res.status === 200) {
          this.userApplyTable = res.data;
          this.paginationApply = {
            size: 10,
            currentPage: 1
          };
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          });
        }
      })
      .catch(err => console.log(err));
  },
  mounted() {},
  filters: {
    roleToText: function(num) {
      switch (num) {
        case 1:
          return "管理员";
        case 2:
          return "普通用户";
      }
    },
    statusToText: function(num) {
      switch (num) {
        case 1:
          return "正常";
        case 2:
          return "锁定";
      }
    },
    isLoginToText: function(num) {
      switch (num) {
        case 1:
          return "在线";
        case 2:
          return "离线";
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.user-manage {
  display: flex;
  flex-direction: column;
  padding: 15px 15px 0;
  background-color: #fff;
  line-height: 1;

  .c-modal {
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      padding: 0 20px;
      border: 1px solid #ccc;
      line-height: 40px;
    }

    .modal-body {
      width: 500px;
      overflow: hidden;
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      padding: 20px 20px 20px 0;
    }

    .svg-icon {
      &:hover {
        color: #409EFF;
        cursor: pointer;
      }
    }
  }

  .table-container {
    position: relative;
    flex: 1;
    overflow: hidden;
  }
}
</style>
