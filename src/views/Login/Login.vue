<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 登录组件
 * @Date: 2019-03-25 15:26:28
 * @LastEditTime: 2019-04-18 11:17:49
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
                placeholder="账号"
                type="text"
                v-model="loginForm.account"
              >
                <svg-icon icon-class="account" slot="prefix"></svg-icon>
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
              <!-- <el-checkbox v-model="autoLogin">自动登录</el-checkbox>-->
              <el-button @click.native="handleToRegister" class="fr" type="text"
                >注册账号</el-button
              >
              <!-- <span class="line fr">&nbsp;|&nbsp;</span> -->
              <!-- <el-button class="fr" type="text">忘记密码</el-button> -->
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <copyright class="c-copyright" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapMutations } = createNamespacedHelpers("layout");
import { login } from "@/api/login";
// 导入正则表达式
import { accountRegx } from "@/regxs";
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
    /**
     * @description 账号校验器
     */
    var validateAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      setTimeout(() => {
        if (!accountRegx.test(value)) {
          callback(new Error("账号只能是数字,字母,下划线,4~18位"));
        } else {
          callback();
        }
      }, 500);
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
    ...mapMutations(["setDefaultActive"]),
    /**
     * @description 点击登录,防抖处理,不要使用箭头函数
     */
    handleLogin: _.debounce(async function() {
      try {
        // 对整个表单进行校验
        let isSuccess = await this.$refs.loginForm.validate();
        debugger;
        let { account, password } = this.loginForm;
        if (isSuccess) {
          let { status, msg } = await login(account, password);
          if (status === 200) {
            this.$router.replace("/layout");
            this.setDefaultActive("1-1");
          } else {
            this.$message({
              type: "warning",
              message: msg
            });
          }
        }
      } catch (e) {
        console.log(e);
      }
    }, 300),

    /**
     * @description 跳转到注册
     */
    handleToRegister() {
      this.$router.push("/register");
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
      vertical-align middle
      font-size 16px

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
