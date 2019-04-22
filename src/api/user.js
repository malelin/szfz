/*
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description 用户相关接口
 * @Date: 2019-04-08 16:11:59
 * @LastEditTime: 2019-04-12 10:20:52
 */
import request from "@/utils/request";
/**
 * @description 获取当前用户信息
 * @returns {Promise<*>} Promise对象
 */
export const getUserInfo = () =>
  request({
    url: "/v1/sysmanage/user/current",
    method: "get",
    headers: { "Digark-Access-Header": sessionStorage.getItem("token") }
  });

/**
 * @description 修改用户昵称、头像或密码
 * @export
 * @param {*} data
 * @returns
 */
export const updateUserInfo = data =>
  request({
    url: "/v1/sysmanage/user/current",
    method: "put",
    timeout: 200000,
    data,
    headers: {
      "Digark-Access-Header": sessionStorage.getItem("token")
    }
  });

/**
 * @description 获得已注册用户列表
 * @export
 * @param {*} params
 * @returns
 */
export const getUserList = params =>
  request({
    url: "/v1/sysmanage/users",
    method: "get",
    params: {
      ...params
    },
    headers: {
      "Digark-Access-Header": sessionStorage.getItem("token")
    }
  });

/**
 * @description 获得申请用户列表
 * @export
 * @param {*} data
 * @returns
 */
export const getApplyUserList = params =>
  request({
    url: "/v1/sysmanage/users_apply",
    method: "get",
    params: {
      ...params
    },
    headers: {
      "Digark-Access-Header": sessionStorage.getItem("token")
    }
  });

/**
 * @description 修改用户高级信息
 * @export
 * @param {*} data
 * @returns
 */
export const putUserAdvanceInfo = data =>
  request({
    url: "/v1/sysmanage/users",
    method: "put",
    data,
    headers: {
      "Digark-Access-Header": sessionStorage.getItem("token")
    }
  });
