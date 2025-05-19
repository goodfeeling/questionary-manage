import { useTitle } from "ahooks";
import { FunctionComponent, useState } from "react";
import styles from "./common.module.scss";
import {
  Empty,
  Typography,
  Table,
  Tag,
  Button,
  Space,
  Modal,
  Spin,
} from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import ListPage from "../../components/ListPage";
const { Title } = Typography;
const { confirm } = Modal;
type questionItem = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
};

const Trash: FunctionComponent = () => {
  useTitle("逍遥问卷 - 回收站");
  const { data = {}, loading } = useLoadQuestionListData({ isDeleted: true });
  const { list = [], total = 0 } = data;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const tableColumns = [
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "是否发布",
      dataIndex: "isPublished",
      render: (isPublished: boolean) => {
        return isPublished ? (
          <Tag color="processing">已发布</Tag>
        ) : (
          <Tag>未发布</Tag>
        );
      },
    },
    {
      title: "答卷",
      dataIndex: "answerCount",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
    },
  ];

  function del() {
    confirm({
      title: "是否彻底删除该问卷？",
      icon: <ExclamationCircleFilled />,
      onOk() {
        console.log("确定", JSON.stringify(selectedIds));
      },
      onCancel() {
        console.log("取消");
      },
    });
  }

  const TableElement = (
    <>
      <div style={{ marginBottom: "15px" }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={tableColumns}
        pagination={false}
        rowKey={(q) => q._id}
        rowSelection={{
          type: "checkbox",
          onChange: (
            selectedRowKeys: React.Key[],
            selectedRows: questionItem[]
          ) => {
            setSelectedIds(selectedRowKeys as string[]);
          },
        }}
      />
    </>
  );

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {!loading && list.length > 0 && TableElement}
      </div>
      <div className={styles.footer}>
        <ListPage total={total}/>
      </div>
    </>
  );
};

export default Trash;
