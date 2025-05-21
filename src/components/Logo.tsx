import { FunctionComponent, useEffect, useState } from "react";
import { Divider, Space, Typography } from "antd";
import { FormOutlined } from "@ant-design/icons";
import styles from "./Logo.module.scss";
import { Link } from "react-router-dom";
import useGetUserInfo from "../hooks/useGetUserInfo";
import { HOME_PATHNAME, MANAGE_PATHNAME } from "../router";
const { Title } = Typography;

const Logo: FunctionComponent = () => {
  const {username} = useGetUserInfo()
  const [pathname,setPathname] = useState(HOME_PATHNAME)
  useEffect(() => {
    if (username) {
      setPathname(MANAGE_PATHNAME)
    }
  },[username])
  return (
    <div className={styles.container}>
      <Link to={pathname}>
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
