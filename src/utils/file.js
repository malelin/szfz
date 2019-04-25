/*
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 文件相关方法
 * @Date: 2019-04-24 18:07:07
 * @LastEditTime: 2019-04-25 10:03:49
 */
/**
 * @description 判断文件是否有后缀
 * @export
 * @param {*} fileName
 * @returns {boolean}
 */
export function hasSuffix(fileName) {
  return fileName.lastIndexOf(".") === -1 ? false : true;
}
