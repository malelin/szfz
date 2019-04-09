/*
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description:  上传下载管理模块
 * @Date: 2019-04-09 10:54:37
 * @LastEditTime: 2019-04-09 14:05:45
 */
import request from "@/utils/request";
/**
 * @description 上传接口
 * @export
 * @param {*} data 表单
 * @returns
 */
export function upload(data) {
  return request({
    url: "/v1/filemanage/object",
    method: "post",
    timeout: 200000,
    data,
    headers: {
      "Content-Type": "multipart/form-data",
      "Digark-Access-Header": sessionStorage.getItem("token")
    }
  });
}
