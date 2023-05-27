import { useState } from "react";
import "./App.css";
import "antd/dist/reset.css";
import Arguments from "./components/Arguments";
import Expression from "./components/Expression";
import Result from "./components/Result";
import AppContext, { initialState } from "./appContext";

function App() {
  const [state, setState] = useState(initialState);

  return (
    <AppContext.Provider value={{ state, setState }}>
      <h1 style={{ textAlign: "center" }}>Logical Expression</h1>
      <Arguments />
      <Expression />
      <Result />
    </AppContext.Provider>
  );
}

export default App;
