// axios
// 项目的基建工作
// 小组长来完成
// 工具库
// 组件库 ——> 工具方法库
// 写内部的框架
import axios from "axios";
import store from "../store";
import router from "../router";

export const http = axios.create({
  timeout: 8000,
  baseURL: "/api",
});

// 响应拦截器
http.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    // status
    // 通用的
    if (err.response.status === 401) {
      // 调整到 login 页面
      router.replace({
        name: "Login",
      });
    }
  }
);

// 请求拦截器
// token
http.interceptors.request.use((config) => {
  // 先获取 token
  const token = store.state.token;

  if (token) {
    config.headers.authorization = "Bearer " + token;
  }

  return config;
});
