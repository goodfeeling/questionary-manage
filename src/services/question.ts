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
