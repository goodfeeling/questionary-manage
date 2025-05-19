import { useSearchParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { getQuestionListService } from "../services/question";
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_NUMBER, LIST_PAGE_SIZE_PARAM_KEY, LIST_SEARCH_PARAM_KEY } from "../constant";

interface OptionType {
  isStar: boolean;
  isDeleted: boolean;
}
function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isStar = false, isDeleted = false } = opt;

  const [searchParams] = useSearchParams();
  const { data, loading, error } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
      const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE_NUMBER
      const data = await getQuestionListService({ keyword, isStar, isDeleted ,page,pageSize});
      return data;
    },
    {
      refreshDeps: [searchParams],
    }
  );
  return { data, loading, error };
}

export default useLoadQuestionListData;
