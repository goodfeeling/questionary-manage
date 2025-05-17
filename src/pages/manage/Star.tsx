import { FunctionComponent, useState } from "react";
import styles from "./common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import { useSearchParams } from "react-router-dom";
import { useTitle } from "ahooks";
import { Empty, Typography } from "antd";

type questionList = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
};
const rawQuestionList:questionList[] = [
//   {
//     _id: "q1",
//     title: "问卷1",
//     isPublished: true,
//     isStar: true,
//     answerCount: 3,
//     createdAt: "3月11日 22:20",
//   },
//   {
//     _id: "q2",
//     title: "问卷2",
//     isPublished: true,
//     isStar: false,
//     answerCount: 8,
//     createdAt: "3月11日 22:20",
//   },
//   {
//     _id: "q3",
//     title: "问卷3",
//     isPublished: false,
//     isStar: true,
//     answerCount: 6,
//     createdAt: "3月11日 22:20",
//   },
//   {
//     _id: "q4",
//     title: "问卷4",
//     isPublished: true,
//     isStar: true,
//     answerCount: 11,
//     createdAt: "3月11日 22:20",
//   },
];

const { Title } = Typography;
const Star: FunctionComponent = () => {
  useTitle("逍遥问卷 - 星标问卷");
  const [questionList, setQuestionList] =
    useState<questionList[]>(rawQuestionList);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}> (搜索) </div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 &&
          questionList.map((item) => {
            const { _id } = item;
            return <QuestionCard key={_id} {...item} />;
          })}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  );
};

export default Star;
