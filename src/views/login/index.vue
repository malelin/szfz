<template>
  <div class="login">
    <button @click="handleLogin">login</button>
    <button @click="handleLogout">logout</button>
  </div>
</template>

<script>
import { login, logout } from "@/api/login";
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
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    async handleLogin() {
      login("test002", "123456")
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    },
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
  line-height 1
</style>
