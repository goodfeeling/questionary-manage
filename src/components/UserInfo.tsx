import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router";
import { UserOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { removeToken } from "../utils/user-token";
import useGetUserInfo from "../hooks/useGetUserInfo";
import {useDispatch} from 'react-redux'
import {logoutReducer} from "../store/useReducer"
const UserInfo: FunctionComponent = () => {
  const nav = useNavigate()
  const {username,nickname} = useGetUserInfo()
  
  const dispatch = useDispatch()
  function logout() {
    dispatch(logoutReducer())
    removeToken() // 清空token
    message.success("退出成功")
    nav(LOGIN_PATHNAME)
  }

  const UserInfo = (
    <>
      <span style={{color: "#e8e8e8"}}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>退出</Button>
    </>
  )

  const Login = (
    <div>
        <Link to={LOGIN_PATHNAME}> 登录</Link>
    </div>
  )
  return (
    <div>
      {username ? UserInfo : Login}
    </div>
  );
};

export default UserInfo;
