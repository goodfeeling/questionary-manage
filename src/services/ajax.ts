import { message } from "antd";
import axios, { AxiosResponse } from "axios";
import { getToken } from "../utils/user-token";

const instance = axios.create({
  timeout: 10 * 1000,
});

// request 拦截：每次请求都带上token
instance.interceptors.request.use(config => {
  config.headers["Authorization"] = `Bearer ${getToken()}`
  return config
},error => Promise.reject(error))

// response 拦截：统一处理errno和msg
instance.interceptors.response.use(
  (res: AxiosResponse<ResType>) => {
    const resData = res.data || {};
    const { errno, data, msg } = resData;
    
    if (errno !== 0) {
      if (msg) {
        message.error(msg);
      }
      return Promise.reject(new Error(msg || "请求失败"));
    }
    return res;
  },
  (error) => {
    // 处理网络异常等错误
    message.error("网络请求出错");
    return Promise.reject(error);
  }
);

export default instance;

export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};

export type ResDataType = {
  [key: string]: any;
};
