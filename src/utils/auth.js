import Cookies from "js-cookie";

const TokenKey = "Admin-Token";

/**
 * @description 获取token
 * @returns token
 */
export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
