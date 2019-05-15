import axios from "axios";
import router from "@/router";
import { Message } from "element-ui";
// import store from "@/store";
// import { getToken } from "@/utils/auth";
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, //获取环境变量里的BASE_API
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // 给头添加token
    if (sessionStorage.getItem("token")) {
      //存在token,加入头
      config.headers.authorization = localStorage.getItem("token");
    }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  ({ data }) => {
    if (data.status === 200) {
      //成功响应，更新token
      if (data.data && data.data.token) {
        sessionStorage.setItem("token", data.data.token);
      }
    } else {
      //没有成功就显示每次返回的状态码
      // Message({
      //   message: data.status + "   :   " + data.msg,
      //   type: "info",
      //   duration: 5 * 1000
      // });
      if (data.msg.trim() === "认证过期，请重新登入") {
        console.log(this);
        setTimeout(() => {
          router.push({ path: "/login" });
        }, 1000);
      }
    }
    return data;
  },
  error => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
