import { FunctionComponent } from "react";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";

const Stat: FunctionComponent = () => {
  const { loading, data } = useLoadQuestionData();
  return (
    <div>
      <p>stat page</p>
      {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}
      <div></div>
    </div>
  );
};

export default Stat;
