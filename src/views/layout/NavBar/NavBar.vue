<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 头部栏,包含搜索,注销,消息
 * @Date: 2019-03-27 10:03:36
 * @LastEditTime: 2019-04-09 10:16:23
 -->
<template>
  <div class="navbar">
    <svg-icon
      icon-class="collapse"
      class-name="svg-collapse"
      @click.native="toggleISCollapse"
    ></svg-icon>
    <el-breadcrumb separator="|">
      <el-breadcrumb-item :to="{ path: '/' }">数字方舟</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-input
      placeholder="搜索IP、域名、文件HASH、邮箱"
      v-model="searchText"
      class="search-box"
    >
      <el-button slot="append" type="primary">搜&nbsp;索</el-button>
    </el-input>
    <div class="operation-box">
      <span class="username" v-text="username"></span>
      <img src="./images/avatar.gif" alt="头像" class="avatar" />
      <el-badge :value="12" class="badge-message">
        <svg-icon icon-class="message" class-name="svg-message"></svg-icon>
      </el-badge>
      <svg-icon
        title="注销"
        icon-class="logout"
        @click.native="handleLogout"
        class-name="svg-logout"
      ></svg-icon>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapMutations } = createNamespacedHelpers("layout");
import { logout } from "@/api/login";
import { getUserInfo } from "@/api/user";
import _ from "lodash";
export default {
  name: "NavBar",
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
      searchText: "",
      username: ""
    };
  },
  computed: {},
  watch: {},
  methods: {
    //映射是否折叠侧边栏
    ...mapMutations(["toggleISCollapse"]),
    /**
     * @description 注销登录
     */
    handleLogout: _.debounce(async function() {
      try {
        let token = sessionStorage.getItem("token");
        let { status } = await logout(token);
        debugger;
        if (status === 200) {
          this.$message({
            type: "success",
            message: "注销成功"
          });
          this.$router.push("/login");
          // 清空sessionStorage
          sessionStorage.clear();
        }
      } catch (e) {
        console.log(e);
      }
    }, 300),
    /**
     * @description 数据初始化
     */
    async init() {
      try {
        let {
          status,
          data: { username }
        } = await getUserInfo();
        if (status === 200) {
          this.username = username;
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  created() {
    this.init();
  },
  mounted() {}
};
</script>
<style>
/* 重写elementui样式 */
.search-box {
  margin-right: auto;
  margin-left: 50px;
  width: 600px;
  padding-right: 40px;
}
/* 强制改变搜索按钮背景颜色 */
.el-button--primary {
  background-color: #409eff !important;
  color: #fff !important;
}
/* 重写消息徽章 */
.badge-message {
  margin-right: 15px;
}
</style>

<style lang="stylus" scoped>
.navbar
  display flex
  align-items center
  padding 0 20px
  height 60px
  background-color #fff
  box-shadow 0 1px 3px #ccc
  line-height 1

.operation-box
  display flex
  align-items center
  margin-right -15px

  .username
    margin-right 8px
    color #66b1ff
    font-size 18px

  .avatar
    margin-right 15px
    width 35px
    height 35px
    border-radius 50%

.svg-icon
  margin-right 15px
  vertical-align middle
  font-size 30px
  cursor pointer

  &.svg-logout
    font-size 35px

  &.svg-collapse
    font-size 30px

  &.svg-message
    margin-right 0
</style>
