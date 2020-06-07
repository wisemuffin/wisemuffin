import React, { useReducer, useContext, useEffect } from "react";
import Context from "./Context";
import reducer from "./reducer";

const AppHooks = (props: any): JSX.Element => {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const localData = localStorage.getItem("localOdin");
    return localData ? JSON.parse(localData) : [];
  });
  useEffect(() => {
    localStorage.setItem("localOdin", JSON.stringify(state));
  }, [state]);
  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};

export default AppHooks;
