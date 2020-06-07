import React, { useReducer, useContext, useEffect, createContext } from "react";
import Context, { initialState } from "./Context";
import reducer from "./reducer";

const AppHooks = (props: any): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const localData = localStorage.getItem("localWisemuffin");
    return localData ? JSON.parse(localData) : [];
  });
  useEffect(() => {
    localStorage.setItem("localWisemuffin", JSON.stringify(state));
  }, [state]);
  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};

export default AppHooks;
