import axios, { AxiosResponse } from "axios";
import { ResDataType } from "./ajax";

// 获取用户信息
export async function getUserInfoService():Promise<ResDataType> {
    const url = `/api/user/info`
    const data = (await axios.get(url)) as AxiosResponse
    return data.data.data
}

// 注册用户
export async function registerService(username:string,password:string,nickname?:string) :Promise<ResDataType> {
    const url = `/api/user/register`
    const reqData = {username,password,nickname:nickname ||username}
    const data = (await axios.post(url,{reqData})) as AxiosResponse
    return data.data.data
}

// 登录
export async function loginService(username:string,password:string):Promise<ResDataType> {
    const url = `/api/user/login`
    const reqData = {username,password}
    const data = (await axios.post(url,{reqData})) as AxiosResponse
    return data.data.data
}