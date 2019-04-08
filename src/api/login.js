import request from "@/utils/request";
/**
 * @description 登录接口
 * @param {string} account
 * @param {string} password
 * @returns {Promise<*>} Promise对象
 */
export function login(account, password) {
  return request({
    url: "/v1/sysmanage/login",
    method: "put",
    data: {
      account,
      password
    }
  });
}
/**
 * @description 登出接口
 * @param {string} token
 * @returns {Promise<*>} Promise对象
 */
export function logout() {
  let token = sessionStorage.getItem("token");
  return request({
    url: "/v1/sysmanage/logout",
    method: "delete",
    headers: { "Digark-Access-Header": token }
  });
}
