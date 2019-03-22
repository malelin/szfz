<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { login } from "@/api/login";
export default {
  name: "home",
  components: {
    HelloWorld
  },
  created() {
    login()
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
