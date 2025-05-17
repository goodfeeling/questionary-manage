import { FunctionComponent } from "react";
import { Button, Divider, Popconfirm, Space, Tag ,Modal} from "antd";
import styles from "./QuestionCard.module.scss";
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  ExclamationCircleOutlined,
  ExclamationOutlined,
  LineChartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

interface QuestionCardProps {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
}

const {confirm} = Modal
const QuestionCard: FunctionComponent<QuestionCardProps> = (
  props: QuestionCardProps
) => {
  const { _id, title, createdAt, answerCount, isPublished, isStar } = props;
  const nav = useNavigate();

  function duplicate() {

  }

  function del() {
    console.log(222);
   confirm({
    title: '是否删除该问卷？',
    icon: <ExclamationCircleFilled />,
    onOk() {
      console.log('确定');
    },
    onCancel() {
      console.log('取消');
    },
  });
  }
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Link
              to={
                isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`
              }
            >
              <Space>
                {isStar && <StarOutlined style={{ color: "red" }} />}
                {title}
              </Space>
            </Link>
          </div>

          <div className={styles.right}>
            <Space>
              {isPublished ? (
                <Tag color="processing">已发布</Tag>
              ) : (
                <Tag>已发布</Tag>
              )}
              <span>答卷：{answerCount}</span>
              <span>{createdAt}</span>
            </Space>
          </div>
        </div>
        <Divider style={{margin: "12px 0"}}/>
        <div className={styles["button-container"]}>
          <div className={styles.left}>
            <Space>
              <Button
                icon={<EditOutlined />}
                type="text"
                size="small"
                onClick={() => nav(`/question/edit/${_id}`)}
              >
                编辑问卷
              </Button>
              <Button
                icon={<LineChartOutlined />}
                type="text"
                size="small"
                onClick={() => nav(`/question/stat/${_id}`)}
                disabled={!isPublished}
              >
                数据统计
              </Button>
            </Space>
          </div>
          <div className={styles.right}>
            <Space>
              <Button type="text" icon={<StarOutlined />} size="small">
                {isStar ? "取消标星" : "标星"}
              </Button>
              <Popconfirm title="确定复制该问卷？" okText="确定" cancelText="取消" onConfirm={duplicate}>
                  <Button type="text" icon={<CopyOutlined />} size="small">
                复制
              </Button>
              </Popconfirm>
            
              <Button type="text" icon={<DeleteOutlined />} size="small" onClick={del}>
                删除
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
