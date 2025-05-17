import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";

const QuestionLayout: FunctionComponent = () => {
  return (
    <>
      <p>QuestionLayout header</p>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default QuestionLayout