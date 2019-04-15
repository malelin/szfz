/*
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 首页统计api
 * @Date: 2019-04-15 16:55:55
 * @LastEditTime: 2019-04-15 17:30:39
 */
import request from "@/utils/request";
/**
 * @description 获取检测结果统计
 * @export
 * @returns {Promise<*>} Promise
 */
export function getDetectRes() {
  return request({
    url: "/v1/indexManage/detect",
    method: "get",
    headers: { "Digark-Access-Header": sessionStorage.getItem("token") }
  });
}
/**
 * @description 获得威胁类型分布
 * @export
 * @returns 
  * antiType: 0 仿真分析
    developType: 12 开发痕迹
    homoType: 0 同源信息
    iocType: 0 IOC风险
    otherType: 0 其它
    relateType: 19 涉我信息
    total: 31
 */
export function getThreatRes() {
  return request({
    url: "/v1/indexManage/threat",
    method: "get",
    headers: { "Digark-Access-Header": sessionStorage.getItem("token") }
  });
}
