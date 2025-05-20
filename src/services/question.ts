import { AxiosResponse } from "axios";
import axios from "./ajax";
import type { ResDataType } from "./ajax";

interface SearchOption {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
  pageSize: number;
  page: number;
}

// 获取单个问卷信息
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = (await axios.get(url)) as AxiosResponse;
  return data.data;
}

export async function createQuestionService(): Promise<ResDataType> {
  const url = "/api/question";
  const data = (await axios.post(url)) as AxiosResponse;
  return data.data.data;
}

export async function getQuestionListService(
  params: Partial<SearchOption> = {}
): Promise<ResDataType> {
  const url = "/api/question";
  const data = (await axios.get(url, { params })) as AxiosResponse;
  return data.data.data;
}

// 更新单个问卷
export async function updateQuestionDataService(
  id: string,
  opt: { [key: string]: any }
) {
  const url = `/api/question/${id}`;
  const data = (await axios.patch(url, opt)) as AxiosResponse;
  return data.data.data;
}

// 复制问卷
export async function duplicateQuestionService(id:string) : Promise<ResDataType>{
  const url = `/api/question/duplicate/${id}`
  const data = (await axios.post(url)) as AxiosResponse
  return data.data.data
}

// 批量删除
export async function deleteQuestionsService(ids: string[]) :Promise<ResDataType>{
  const url = `/api/question`
  const data = (await axios.delete(url,{data: {ids}})) as AxiosResponse
  return data.data.data
}