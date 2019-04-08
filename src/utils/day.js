/*
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 时间处理工具函数
 * @Date: 2019-04-03 15:22:02
 * @LastEditTime: 2019-04-04 17:29:32
 */
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
/**
 * @description 转换UTC格式的时间成中国格式的时间
 * @param {string} utcDateString UTC格式时间字符串
 * @returns {string} 中国格式的时间字符串
 */
export function utc2LocalDate(utcDateString) {
  return dayjs.utc(utcDateString).format("YYYY/MM/DD HH:mm:ss");
}
/**
 * @description 中国标准时间 "[native Date Wed Apr 03 2019 00:00:00 GMT+0800 (中国标准时间)]"转换成 2019/04/16 03:11:24
 * @export
 * @param {*} date
 * @returns
 */
export function formatChinese(date) {
  return dayjs(date).format("YYYY/MM/DD HH:mm:ss");
}
