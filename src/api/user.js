/*
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description 用户相关接口
 * @Date: 2019-04-08 16:11:59
 * @LastEditTime: 2019-04-09 09:24:08
 */
import request from "@/utils/request";
/**
 * @description 获取当前用户信息
 * @returns {Promise<*>} Promise对象
 */
export function getUserInfo() {
  return request({
    url: "/v1/sysmanage/user/current",
    method: "get",
    headers: { "Digark-Access-Header": sessionStorage.getItem("token") }
  });
}
