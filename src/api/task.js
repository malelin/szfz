/*
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 任务api
 * @Date: 2019-04-03 14:45:44
 * @LastEditTime: 2019-04-11 13:48:32
 */
import request from "@/utils/request";
/**
 * @description 获取默认任务列表
 * @param {string} token
 * @returns {Promise<*>} Promise
 */
export function getDefaultTask(data) {
  let token = sessionStorage.getItem("token");
  debugger;
  return request({
    url: "/v1/taskmanage/tasks",
    method: "get",
    params: {
      order: "desc",
      ...data
    },
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
export function createTask(data) {
  let token = sessionStorage.getItem("token");
  console.log(data);
  debugger;
  return request({
    url: "/v1/sysmanage/task",
    method: "post",
    data,
    headers: { "Digark-Access-Header": token }
  });
}
let ss = {
  model: 0, //1 创建 2 创建并执行
  objects: [
    {
      // [杀软引擎参数]
      anti: {
        aids: [0], //调用的虚拟机id
        model: 0, // 模式 1 静态 2 动态
        network: 0, //是否开启网络 1 开启 2 关闭
        param: "string", // [字符串参数]
        time: 0 //时间 1 45s 2 60s 3 90s 4 120s
      },
      //同源分析参数
      homo: {
        model: 0,
        param: "string",
        system: 0,
        time: 0
      },
      md5: "string",
      objectName: "string", //对象名称
      openMorph: 2, //开启工具变形 1 开启 2 关闭
      openSensitivity: 1, // 开启敏感分析引擎 1 开启 2 关闭
      sha1: "string",
      sha256: "string",
      size: 0,
      ssdeep: "string",
      suffix: "string",
      type: "string",
      uploadId: 0,
      url: "string",
      // 验证引擎
      veri: {
        model: 0,
        time: 0,
        veriPackage: 0
      }
    }
  ],
  remarks: "string", //[任务描述]
  taskname: "string" //[任务名称]
};
console.log(ss);
// {
//   "model": 1,
//     "objects": [
//       {
//         "md5": "string",
//         "objectName": "string",

//         "openMorph": 2,
//         "openSensitivity": 1,
//         "sha1": "string",
//         "sha256": "string",
//         "size": 0,
//         "ssdeep": "string",
//         "suffix": "string",
//         "type": "string",
//         "uploadId": 0,
//         "url": "string",

//       }
//     ],
//       "remarks": "string",
//         "taskname": "string"
// }
