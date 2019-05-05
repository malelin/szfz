/*
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 杀软管理模块
 * @Date: 2019-04-29 10:53:28
 * @LastEditTime: 2019-05-05 14:31:18
 */
import request from "@/utils/request";

/**
 * @description 获取杀软列表
 * @export
 */
export function getAntiList() {
  let token = sessionStorage.getItem("token");
  return request({
    url: "/v1/antimanage",
    method: "get",
    headers: { "Digark-Access-Header": token }
  });
}
/**
 * @description 获取单个杀软的信息
 * @export
 * @param {number} aid 杀软aid
 */
export function getAntiInfo(aid) {
  let token = sessionStorage.getItem("token");
  return request({
    url: "/v1/antimanage/anti",
    method: "get",
    params: { aid },
    headers: { "Digark-Access-Header": token }
  });
}
