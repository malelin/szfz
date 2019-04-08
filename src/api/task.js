/*
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 任务api
 * @Date: 2019-04-03 14:45:44
 * @LastEditTime: 2019-04-08 10:08:06
 */
import request from "@/utils/request";
/**
 * @description 获取默认任务列表
 * @param {string} token
 * @returns {Promise<*>} Promise
 */
export function getDefaultTask() {
  let token = sessionStorage.getItem("token");
  return request({
    url: "/v1/taskmanage/tasks",
    method: "get",
    headers: { "Digark-Access-Header": token }
  });
}

/**
 * @description 使用查询条件获取任务列表
 * @export
 * @param {object} params对象
 *  @returns {Promise<*>} Promise
 */
export function getTask(params) {
  let token = sessionStorage.getItem("token");
  return request({
    url: "/v1/taskmanage/tasks",
    method: "get",
    params,
    headers: { "Digark-Access-Header": token }
  });
}
