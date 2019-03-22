import request from "@/utils/request";
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
