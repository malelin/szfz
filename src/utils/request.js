import axios from "axios";
// import { Message } from "element-ui";
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
    if (localStorage.getItem("token")) {
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
  response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    if (response.data.code == "2000") {
      //成功响应，更新token
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
    } else {
      //错误处理 根据不同的状态码，进行错误处理
    }
    return response.data;
  },
  error => {
    console.log("err" + error); // for debug
    // Message({
    //   message: error.message,
    //   type: "error",
    //   duration: 5 * 1000
    // });
    return Promise.reject(error);
  }
);

export default service;
