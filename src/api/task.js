/*
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 任务api
 * @Date: 2019-04-03 14:45:44
 * @LastEditTime: 2019-04-03 15:00:56
 */
import request from "@/utils/request";
/**
 * @description 获取默认任务列表
 * @param {string} token
 * @returns {Promise<*>} Promise
 */
export function getDefaultTask(token) {
  return request({
    url: "/v1/taskmanage/tasks",
    method: "get",
    headers: { "Digark-Access-Header": token }
  });
}
