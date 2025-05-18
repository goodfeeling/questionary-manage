import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { Input } from "antd";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { LIST_SEARCH_PARAM_KEY } from "../constant";

const { Search } = Input;
const ListSearch: FunctionComponent = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const [value, setValue] = useState("");
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  const [searchParams] = useSearchParams()
  useEffect(()=> {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(curVal)
  },[])

  function handleSearch(value: string) {
    // 跳转页面 ，增加url参数
    nav({ pathname, search: `${LIST_SEARCH_PARAM_KEY}=${value}` });
  }
  return (
    <Search
      placeholder="输入关键字"
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
      style={{ width: "200px" }}
      size="large"
      allowClear
    />
  );
};
export default ListSearch;
