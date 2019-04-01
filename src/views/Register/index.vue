<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 注册组件
 * @Date: 2019-04-01 09:24:10
 * @LastEditTime: 2019-04-01 16:04:16
 -->
<template>
  <div class="register center-box">
    <div class="center-wrap">
      <div class="center-content">
        <el-form
          :model="registerForm"
          status-icon
          :rules="registerRules"
          ref="registerForm"
          class="register-form"
        >
          <el-form-item class="logo-container">
            <img src="./images/logo.png" alt="logo" title="logo" />
          </el-form-item>
          <el-form-item>
            <h1>注册</h1>
          </el-form-item>
          <el-form-item prop="username">
            <el-input
              placeholder="昵称"
              type="text"
              v-model="registerForm.username"
              ><svg-icon
                icon-class="username"
                slot="prefix"
              ></svg-icon> </el-input
          ></el-form-item>

          <el-form-item prop="account">
            <el-input
              placeholder="账号"
              type="text"
              v-model="registerForm.account"
              ><svg-icon icon-class="account" slot="prefix"></svg-icon>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" placeholder="6-16位密码,区分大小写">
            <el-input
              type="password"
              v-model="registerForm.password"
              autocomplete="off"
              placeholder="密码"
            >
              <svg-icon icon-class="password" slot="prefix"></svg-icon
            ></el-input>
          </el-form-item>
          <el-form-item prop="repeatPassword">
            <el-input
              type="password"
              v-model="registerForm.repeatPassword"
              autocomplete="off"
              placeholder="确认密码"
              @keyup.enter.native="handleRegister"
            >
              <svg-icon icon-class="password" slot="prefix"></svg-icon
            ></el-input>
          </el-form-item>
          <el-form-item prop="remarks"
            ><el-input
              type="textarea"
              :rows="2"
              placeholder="请输入备注内容,可选"
              v-model="registerForm.remarks"
            >
            </el-input
          ></el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width:30%"
              title="注册"
              @click.native="handleRegister"
              >注&nbsp;&nbsp;册</el-button
            >
            <el-button @click.native="handleLoginByUser" class="fr" type="text"
              >使用已有账号登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { register, verify } from "@/api/register";
import _ from "lodash";
// 导入正则表达式
import { usernameRegx, accountRegx } from "@/regxs";
export default {
  name: "Register",
  components: {},
  props: {},
  data() {
    /**
     * @description 昵称校验器
     */
    var validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("昵称不能为空"));
      } else {
        if (!usernameRegx.test(value)) {
          callback(new Error("昵称只能是中文、字母、下划线,不超过18位"));
        } else {
          // 判断用户名是否存在;
          verify(value, 1)
            .then(({ status }) => {
              if (status === 202) {
                callback(new Error("用户名已经存在"));
              } else if (status === 203) {
                callback();
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    };
    /**
     * @description 账号校验器
     */
    var validateAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else {
        if (!accountRegx.test(value)) {
          callback(new Error("账号只能是数字,字母,下划线,4~18位"));
        } else {
          // 判断用户名是否存在;
          verify(value, 2)
            .then(({ status }) => {
              if (status === 202) {
                callback(new Error("账号已经存在"));
              } else if (status === 203) {
                callback();
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    };
    /**
     * @description 密码校验器
     */
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        // 6~18字母数字组合
        // let passwordRegx = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
        if (value.length < 6 || value.length > 18) {
          callback(new Error("密码6~18位"));
        } else {
          if (this.registerForm.repeatPassword !== "") {
            this.$refs.registerForm.validateField("repeatPassword");
          }
          callback();
        }
      }
    };
    /**
     * @description 确认密码校验器
     */
    var validateRepeatPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 注册表单
      registerForm: {
        username: "",
        account: "",
        password: "",
        repeatPassword: "",
        remarks: ""
      },
      // 注册表单验证规则
      registerRules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        account: [{ validator: validateAccount, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "change" }],
        repeatPassword: [
          { validator: validateRepeatPassword, trigger: "change" }
        ]
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    /**
     * @description 使用已有账号登录
     */
    handleLoginByUser() {
      this.$router.push("/login");
    },
    /**
     * @description 注册,防抖处理,防止用户多次点击
     */
    handleRegister: _.debounce(async function() {
      try {
        // 对整个表单进行校验
        let isSuccess = await this.$refs.registerForm.validate();
        debugger;
        if (isSuccess) {
          let { username, account, password, remarks } = this.registerForm;
          let { status } = await register(account, password, username, remarks);
          // 根据不同的状态码执行不同的操作
          switch (status) {
            case 200:
              this.$message({
                message: "注册成功",
                type: "success",
                duration: 1000
              });
              this.$router.push("/login");
              break;
            case 400:
              break;
            default:
              break;
          }
        }
      } catch (e) {
        console.log(e);
      }
    })
  },
  created() {},
  mounted() {}
};
</script>

<style lang="stylus" scoped>
.register
  width 100%
  height 100%
  line-height 1

  .register-form
    width 500px

    .svg-icon
      vertical-align middle
      font-size 16px

    .logo-container
      text-align center
</style>
