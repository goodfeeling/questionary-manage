import { FunctionComponent } from "react";
import styles from "./common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import { useTitle } from "ahooks";
import { Empty, Pagination, Spin, Typography } from "antd";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import ListPage from "../../components/ListPage";

type questionList = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
};

const { Title } = Typography;
const Star: FunctionComponent = () => {
  useTitle("逍遥问卷 - 星标问卷");
  const { data = {}, loading } = useLoadQuestionListData({isStar:true})
  const { list = [], total = 0 } = data;
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          {" "}
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
         {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin/>
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
      <div className={styles.footer}>
        <ListPage total={total}/>
      </div>
    </>
  );
};

export default Star;
