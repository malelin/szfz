<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 头部栏,包含搜索,注销,消息
 * @Date: 2019-03-27 10:03:36
 * @LastEditTime: 2019-04-28 10:09:45
 -->
<template>
  <div class="navbar">
    <svg-icon
      icon-class="collapse"
      class-name="svg-collapse"
      @click.native="toggleISCollapse"
    ></svg-icon>
    <el-input
      placeholder="搜索IP、域名、文件HASH、邮箱"
      v-model="searchText"
      class="search-box"
    >
      <el-button slot="append" type="primary">搜&nbsp;索</el-button>
    </el-input>
    <div class="operation-box">
      <span class="username" v-text="userInfo.username"></span>
      <img :src="userInfo.avatar" alt="头像" class="avatar" />
      <el-badge :value="12" class="badge-message">
        <svg-icon icon-class="message" class-name="svg-message"></svg-icon>
      </el-badge>
      <el-tooltip content="注销" placement="bottom" effect="light">
        <svg-icon
          icon-class="logout"
          @click.native="handleLogout"
          class-name="svg-logout"
        ></svg-icon>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapMutations } = createNamespacedHelpers("layout");
import { logout } from "@/api/login";
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
      userInfo: {},
      // websocket对象
      ws: null
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
        if (status === 200) {
          this.$message({
            type: "success",
            message: "注销成功"
          });
          this.ws.close();
          this.$router.push("/login");
          // 清空sessionStorage
          sessionStorage.clear();
        }
      } catch (e) {
        console.log(e);
      }
    }, 300),

    /**
     * @description 创建websocket
     */
    createWs() {
      let token = sessionStorage.getItem("token");
      this.ws = new WebSocket(
        "ws://192.168.2.112:8081/v1/ws/user_state/" + token
      );
      this.ws.onopen = () => {
        console.log("open");
        this.ws.send("hello");
      };
      this.ws.onmessage = event => {
        let userInfo = JSON.parse(event.data);
        if (userInfo.isLogin === 2) {
          this.$router.replace("/login");
          this.ws.close();
        }
        if (userInfo.isLogin === 1) {
          this.userInfo = Object.assign({}, this.userInfo, userInfo);
        }
      };
      this.ws.onclose = () => {
        console.log("WebSocketClosed!");
        // 注销
        this.handleLogout();
      };
      this.ws.onerror = event => {
        console.log(event);
        console.log("WebSocketError!");
      };
    }
  },
  created() {
    // 创建websocket
    this.createWs();
  },
  mounted() {}
};
</script>
<style>
/* 重写element-ui样式 */
.search-box {
  margin-right: auto;
  margin-left: 40px;
  padding-right: 40px;
}
/* 强制改变搜索按钮背景颜色 */
/* .navbar .el-button--primary {
  background-color: #409eff !important;
  color: #fff !important;
} */
.navbar .el-input-group__append {
  background-color: #409eff;
  color: #fff;
}
.navbar .el-input-group__append:hover {
  background-color: #66b1ff;
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
