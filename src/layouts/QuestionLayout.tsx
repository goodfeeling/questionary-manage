import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import useLoadUserData from "../hooks/useLoadUserInfo";
import { Spin } from "antd";
const QuestionLayout: FunctionComponent = () => {
   const {waitingUserData} = useLoadUserData()
  return (
    <>
      <p>QuestionLayout header</p>
      <div>
           {waitingUserData ? <div style={{textAlign:"center",marginTop: "60px"}}><Spin /></div> :  <Outlet />}
      </div>
    </>
  );
};

export default QuestionLayout