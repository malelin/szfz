/*
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 项目中所有的正则表达式
 * @Date: 2019-04-01 11:19:26
 * @LastEditTime: 2019-04-01 11:47:36
 */

// 账号验证
export const accountRegx = /^[a-zA-Z0-9_]{4,18}$/;

//昵称验证,数字字母下划线中文
export const usernameRegx = /^[\w\u4e00-\u9fa5]{1,18}$/;
