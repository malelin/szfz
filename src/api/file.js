/*
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description:  上传下载管理模块
 * @Date: 2019-04-09 10:54:37
 * @LastEditTime: 2019-04-12 10:20:17
 */
import request from "@/utils/request";
/**
 * @description 上传接口
 * @export
 * @param {*} data 表单
 * @returns
 */
export const upload = data =>
  request({
    url: "/v1/filemanage/object",
    method: "post",
    timeout: 200000,
    data,
    headers: {
      "Content-Type": "multipart/form-data",
      "Digark-Access-Header": sessionStorage.getItem("token")
    }
  });
/**
 * @description 上传图片接口
 * @export
 * @param {*} data 表单
 * @returns
 */
export const uploadImg = data =>
  request({
    url: "/v1/filemanage/avatar",
    method: "post",
    timeout: 200000,
    data,
    headers: {
      "Content-Type": "multipart/form-data",
      "Digark-Access-Header": sessionStorage.getItem("token")
    }
  });
