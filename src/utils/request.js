import axios from "axios";
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
      //错误处理 根据不同的状态码，进行错误处理
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
