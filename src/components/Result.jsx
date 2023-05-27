import { useState, useEffect, useContext } from "react";
import AppContext from "../appContext";
import { getResult } from "../helper/calculateExpression";

const Result = () => {
  const [result, setResult] = useState(undefined);
  const { state } = useContext(AppContext);

  useEffect(() => {
    const newResult = getResult(state);
    setResult(newResult);
  }, [state]);

  return <div style={{ marginTop: "20px" }}>Result: {result}</div>;
};

export default Result;
