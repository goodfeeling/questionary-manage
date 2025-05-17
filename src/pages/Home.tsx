import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { Divider, Space, Typography } from "antd";
import { MANAGE_PATHNAME } from "../router";
import styles from "./Home.module.scss"
const { Title, Paragraph } = Typography;
const Home: FunctionComponent = () => {
  //   const nav = useNavigate();
  // function clickHandler() {
  //   // nav('/login')
  //   nav({
  //       pathname: '/login',
  //       search: "b=22"
  //   })
  // }

  const nav = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>调查问卷 | 在线投票</Title>
        <Paragraph>
          已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份
        </Paragraph>
        <div>
          <Button type="primary" onClick={() => nav(MANAGE_PATHNAME)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
