import { FC, useState } from "react";
import styles from "./common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import { useTitle } from "ahooks";
import { Spin, Typography } from "antd";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
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

  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const haveMoreData = total > list.length

  function tryLoadMore() {
    console.log("tryLoadMore");
    
  }
  // const { data = {}, loading } = useLoadQuestionListData()
  // const { list = [], total = 0 } = data;
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
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {/* 问卷列表 */}
        {!loading &&
          list.length > 0 &&
          list.map((item: questionList) => {
            const { _id } = item;
            return <QuestionCard key={_id} {...item} />;
          })}
      </div>
      <div className={styles.footer}>loadMore 上滑加载更多</div>
    </>
  );
};

export default List;
