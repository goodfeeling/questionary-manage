import { Pagination } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_NUMBER,
  LIST_PAGE_SIZE_PARAM_KEY,
} from "../constant";
import { useNavigate, useSearchParams } from "react-router-dom";

interface PropsType {
  total: number;
}
const ListPage: FunctionComponent<PropsType> = (props: PropsType) => {
  const nav = useNavigate();
  const { total } = props;

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE_NUMBER);

  // 从url参数中找到page pageSize ,并且同步刀pagination
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1;
    setCurrent(page);
    const pageSize =
      parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") ||
      LIST_PAGE_SIZE_NUMBER;
    setPageSize(pageSize);
  }, [searchParams]);

  // 分页变化时更新url参数
  const handlePageChange = (page: number, pageSize?: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    if (pageSize !== undefined) {
      newParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());
      setPageSize(pageSize);
    }
    nav(`?${newParams.toString()}`);
    setCurrent(page);
  };

  return (
    <Pagination
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={handlePageChange}
    />
  );
};

export default ListPage;
