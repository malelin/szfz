import request from "@/utils/request";
/**
 * @description 登录接口
 * @param {string} account
 * @param {string} password
 */
export function login(account, password) {
  const data = {
    account,
    password
  };
  return request({
    url: "/v1/sysmanage/login",
    method: "put",
    data
  });
}
/**
 * @description 登出接口
 * @param {string} token
 */
export function logout(token) {
  return request({
    url: "/v1/sysmanage/logout",
    method: "delete",
    headers: { "Digark-Access-Header": token }
  });
}
