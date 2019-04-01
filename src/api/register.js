import request from "@/utils/request";

/**
 * @description 用户注册
 * @param {string} account  账号
 * @param {string} password 密码
 * @param {string} username 昵称
 * @param {string} [remarks] - 申请备注
 * @returns {Promise<*>} Promise对象
 */
export function register(account, password, username, remarks) {
  return request({
    url: "/v1/sysmanage/regist",
    method: "post",
    data: { remarks, username, password, account }
  });
}

/**
 * @description 根据账号或昵称验证账号是否存在
 * @param {string} info 账号或昵称
 * @param {number} model 验证的模式,1是账号,2是昵称
 * @returns {Promise<*>} Promise对象
 */
export function verify(info, model) {
  return request({
    url: "/v1/sysmanage/verify",
    method: "get",
    params: { info, model }
  });
}
