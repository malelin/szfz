/*
 * @Author: 旺苍扛把子
 * @LastEditors: Please set LastEditors
 * @Description: 任务api
 * @Date: 2019-04-03 14:45:44
 * @LastEditTime: 2019-05-15 11:16:33
 */
import request from "@/utils/request";
/**
 * @description 获取默认任务列表
 * @param {string} token
 * @returns {Promise<*>} Promise
 */
export const getDefaultTask = data => {
  let token = sessionStorage.getItem("token");
  return request({
    url: "/v1/taskmanage/tasks",
    method: "get",
    params: {
      order: "desc",
      ...data
    },
    headers: { "Digark-Access-Header": token }
  });
};

/**
 * @description 使用查询条件获取任务列表
 * @param {Object} params对象
 * @returns {Promise<*>} Promise
 */
export const getTask = data => {
  let token = sessionStorage.getItem("token");
  return request({
    url: "/v1/taskmanage/tasks",
    method: "get",
    params: { ...data, order: "desc" },
    headers: { "Digark-Access-Header": token }
  });
};
/**
 * @description 创建任务
 * @param {object} data
 * @returns {Promise<*>} Promise
 */
export const createTask = data => {
  let token = sessionStorage.getItem("token");
  return request({
    url: "/v1/sysmanage/task",
    method: "post",
    data,
    headers: { "Digark-Access-Header": token }
  });
};
/**
 * @description 修改任务
 * @param {object} data
 * @returns {Promise<*>} Promise
 */
export const modifyTask = config => {
  let token = sessionStorage.getItem("token");
  return request({
    url: "/v1/sysmanage/task",
    method: "put",
    params: { tid: config.tid },
    data: config.req,
    headers: { "Digark-Access-Header": token }
  });
};
/**
 * @description 删除任务
 * @
 * @param {string} tids 任务数组字符串
 * @returns {Promise<*>} Promise
 */
export const deleteTask = tids => {
  let token = sessionStorage.getItem("token");
  return request({
    url: "/v1/sysmanage/task",
    method: "delete",
    params: { tids },
    headers: { "Digark-Access-Header": token }
  });
};
/**
 * @description 执行任务
 * @export
 * @param {string} tids 任务id
 * @returns {Promise<*>} Promise
 */
export const executeTask = tids => {
  let token = sessionStorage.getItem("token");
  return request({
    url: "/v1/sysmanage/task_execute",
    method: "put",
    params: { tids },
    headers: { "Digark-Access-Header": token }
  });
};
/**
 * @description 获取任务详情
 * @export
 * @param {string} tids 任务id
 * @returns {Promise<*>} Promise
 */
export const getTaskDetail = tid => {
  let token = sessionStorage.getItem("token");
  return request({
    url: "/v1/sysmanage/task/detail",
    method: "get",
    params: { tid },
    headers: { "Digark-Access-Header": token }
  });
};
export const getTaskDetailList = tid => {
  let token = sessionStorage.getItem("token");
  return request({
    url: "v1/sysmanage/task/objects",
    method: "get",
    params: { tid },
    headers: { "Digark-Access-Header": token }
  });
};
