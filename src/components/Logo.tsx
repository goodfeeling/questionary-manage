import { FunctionComponent } from "react";
import { Divider, Space, Typography } from "antd";
import { FormOutlined } from "@ant-design/icons";
import styles from "./Logo.module.scss";
import { Link } from "react-router-dom";

const { Title } = Typography;

const Logo: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <Link to="/">
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>逍遥问卷</Title>
        </Space>
      </Link>
    </div>
  );
};

export default Logo;
