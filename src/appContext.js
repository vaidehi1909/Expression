import { createContext } from "react";

export const initialState = {
  args: [{ label: "myArg", value: false }],
  expressions: [[{ type: "" }]],
};
export default createContext(initialState);
