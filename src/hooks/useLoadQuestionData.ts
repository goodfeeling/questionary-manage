import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionService } from "../services/question";
import { useRequest } from "ahooks";

function useLoadQuestionData() {
  const { id = "" } = useParams();

  //   const [questionData, setQuestionData] = useState({});
  //   const [loading, setLoading] = useState<boolean>(true);
  //   useEffect(() => {
  //     async function fn() {
  //       const data = await getQuestionService(id as string);
  //       setLoading(false);
  //       setQuestionData(data);
  //     }
  //     fn();
  //   }, [id]);

  //   return { loading, questionData };
  async function load() {
    const data = await getQuestionService(id);
    return data;
  }
  const { loading, data, error } = useRequest(load);
  return { loading, data, error };
}

export default useLoadQuestionData;
