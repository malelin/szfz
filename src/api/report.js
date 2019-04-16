/*
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 报告管理模块相关接口
 * @Date: 2019-04-16 10:08:49
 * @LastEditTime: 2019-04-16 19:16:06
 */
import request from "@/utils/request";

/**
 * @description 通过对象id获得可能有的报告信息
 * @export
 * @param {string} oid 对象id
 * @returns
 */
export function getReportList(oid) {
  let token = sessionStorage.getItem("token");
  return request({
    url: "/v1/report",
    method: "get",
    params: { oid },
    headers: {
      "Digark-Access-Header": token
    }
  });
}
/**
 * @description 通过报告id获得报告元数据
 * @export
 * @param {string} rid 报告id
 * @returns
 */
export function getReportMeta(rid) {
  let token = sessionStorage.getItem("token");
  return request({
    url: "/v1/report/meta",
    method: "get",
    params: { rid },
    headers: {
      "Digark-Access-Header": token
    }
  });
}
/**
 * @description 通过报告id获得报告基础信息
 * @export
 * @param {string} rid 报告id
 * @returns
 */
export function getReportBasic(rid) {
  let token = sessionStorage.getItem("token");
  return request({
    url: "/v1/report/basic",
    method: "get",
    params: { rid },
    headers: {
      "Digark-Access-Header": token
    }
  });
}
/**
 * @description 通过报告id获得敏感检测信息
 * @export
 * @param {string} rid
 * @returns
 */
export function getReportSensi(rid) {
  let token = sessionStorage.getItem("token");
  return request({
    url: "/v1/report/sensi",
    method: "get",
    params: { rid },
    headers: {
      "Digark-Access-Header": token
    }
  });
}
