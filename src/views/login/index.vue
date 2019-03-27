<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 登录组件
 * @Date: 2019-03-25 15:26:28
 * @LastEditTime: 2019-03-27 10:10:52
 -->
<template>
  <div class="login">
    <div class="center-box login-box">
      <div class="center-wrap">
        <div class="center-content">
          <el-form
            :model="loginForm"
            status-icon
            :rules="loginRules"
            ref="loginForm"
            class="login-form"
          >
            <el-form-item class="logo-container">
              <img src="./images/logo.png" alt="logo" />
            </el-form-item>
            <el-form-item prop="account">
              <el-input
                placeholder="用户名"
                type="text"
                v-model.number="loginForm.account"
              >
                <svg-icon icon-class="user" slot="prefix"></svg-icon>
              </el-input>
            </el-form-item>
            <el-form-item e prop="password">
              <el-input
                type="password"
                placeholder="密码"
                v-model="loginForm.password"
                @keyup.enter.native="handleLogin"
                autocomplete="off"
              >
                <svg-icon icon-class="password" slot="prefix"></svg-icon
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="width:100%;" type="primary" @click="handleLogin"
                >登&nbsp;&nbsp;录</el-button
              >
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="autoLogin">自动登录</el-checkbox>
              <el-button class="fr" type="text">注册账户</el-button>
              <span class="line fr">&nbsp;|&nbsp;</span>
              <el-button class="fr" type="text">忘记密码</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <copyright class="c-copyright" />
    <button @click="handleLogout">logout</button>
  </div>
</template>

<script>
import { login, logout } from "@/api/login";
import _ from "lodash";
export default {
  name: "Login",
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
    // 账户校验器
    var validateAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账户不能为空"));
      }
      setTimeout(() => {
        let accountRegx = /^[a-zA-Z0-9_]{6,18}$/;
        if (!accountRegx.test(value)) {
          callback(new Error("账户只能是数字,字母,下划线,6~18位"));
        } else {
          callback();
        }
      }, 500);
    };
    // 密码校验器
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        // 6~18字母数字组合
        // let passwordRegx = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
        if (value.length < 6) {
          callback(new Error("密码6~18位"));
        } else {
          callback();
        }
      }
    };

    return {
      // 自动登录
      autoLogin: false,
      loginForm: {
        password: "",
        account: ""
      },
      // 账号密码校验
      loginRules: {
        account: [{ validator: validateAccount, trigger: "change" }],
        password: [{ validator: validatePassword, trigger: "change" }]
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 点击登录,防抖处理,不要使用箭头函数
    handleLogin: _.debounce(async function() {
      console.log(111);
      console.log(this);
      try {
        // 对整个表单进行校验
        let isSuccess = await this.$refs.loginForm.validate();
        let { account, password } = this.loginForm;
        if (isSuccess) {
          let { status } = await login(account, password);
          if (status === 200) {
            // 登录成功
            debugger;
            this.$message({
              message: "登录成功",
              type: "success",
              duration: 1000
            });
            this.$router.replace("/layout");
          }
        }
      } catch (e) {
        console.log(e);
      }
    }),

    //点击登出
    async handleLogout() {
      let token = sessionStorage.getItem("token");
      logout(token)
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang="stylus" scoped>
.login
  position relative
  width 100%
  height 100%
  background url('./images/bg.png') no-repeat 0 0 / 100% 100%

  .login-box
    width 100%
    height 100%

    .svg-icon
      width 20px
      height 20px
      vertical-align middle

    .login-form
      width 500px

      .logo-container
        text-align center

      .line
        color #cccdcf

  // 给copyright组件添加样式
  .c-copyright
    position absolute
    bottom 50px
    left 50%
    transform translateX(-50%)
</style>
