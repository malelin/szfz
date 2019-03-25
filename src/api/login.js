import request from "@/utils/request";
/**
 * @description 登录接口
 * @param {*} username
 * @param {*} password
 */
export function login(username, password) {
  const data = {
    username,
    password
  };
  return request({
    url: "/login/login",
    method: "post",
    data
  });
}
