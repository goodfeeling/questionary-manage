import { FC, useEffect, useMemo, useRef, useState } from "react";
import styles from "./common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import { useDebounce, useDebounceFn, useRequest, useTitle } from "ahooks";
import { Empty, Spin, Typography } from "antd";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import { useSearchParams } from "react-router-dom";
import { log } from "console";
import { getQuestionListService } from "../../services/question";
import { LIST_PAGE_SIZE_NUMBER, LIST_SEARCH_PARAM_KEY } from "../../constant";
interface questionList {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
}

const { Title } = Typography;

const List: FC = () => {
  useTitle("问卷 - 我的问卷");

  const [started, setStarted] = useState(false);
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const haveMoreData = total > list.length;
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";

  useEffect(() => {
    setStarted(false);
    setPage(1);
    setList([]);
    setTotal(0);
  }, [keyword]);

  // 真正的加载
  const { loading, run: load } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE_NUMBER,
        keyword,
      });
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: remoteList = [], total = 0 } = result;
        setList(list.concat(remoteList));
        setTotal(total);
        setPage(page + 1);
      },
    }
  );

  const containerRef = useRef<HTMLDivElement>(null);
  // 触发防抖
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current;
      if (elem === null) return;
      const domRet = elem.getBoundingClientRect();
      if (domRet === null) return;
      const { bottom } = domRet;
      if (bottom <= document.body.clientHeight) {
        load();
        setStarted(true);
      }
    },
    {
      wait: 1000,
    }
  );

  //当页面加载 或者 触发 参数 变化时
  useEffect(() => {
    tryLoadMore();
  }, [searchParams]);

  // 页面滚动时
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener("scroll", tryLoadMore);
    }
    return () => {
      window.removeEventListener("scroll", tryLoadMore);
    };
  }, [ haveMoreData]);

  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />;
    if (total === 0) return <Empty description="暂无数据" />;
    if (!haveMoreData) return <span>没有更多数据了</span>;
    return <span>开始加载下一页</span>;
  }, [started, loading, haveMoreData]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          {" "}
          <ListSearch />{" "}
        </div>
      </div>

      <div className={styles.content}>
        {/* 问卷列表 */}
        {list.length > 0 &&
          list.map((item: questionList) => {
            const { _id } = item;
            return <QuestionCard key={_id} {...item} />;
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  );
};

export default List;
