// 涉及到所有和后端交互的接口 统统放这里
// 单一职责
import { http } from "../utils/http";

export function apiLogin({ username, password }) {
  // login -> post
  // promise
  return http.post("/login", {
    username,
    password,
  });
}

// 获取图片信息
export function apiGetPhotos() {
  return http.get("/getPhotos");
}

export function apiUpload(file, { onUploadProgress }) {
  const formData = new FormData();
  formData.append("img", file);

  return http.post("/upload", formData, {
    onUploadProgress,
  });
}
