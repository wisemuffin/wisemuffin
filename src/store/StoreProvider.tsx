import React, { useReducer, useContext, useEffect, createContext } from "react";
import Store, { initialState } from "./Store";
import reducer from "./reducer";

const StoreProvider = (props: any): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const localData = localStorage.getItem("localWisemuffin");
    return localData ? JSON.parse(localData) : [];
  });
  useEffect(() => {
    localStorage.setItem("localWisemuffin", JSON.stringify(state));
  }, [state]);
  return (
    <Store.Provider value={{ state, dispatch }}>
      {props.children}
    </Store.Provider>
  );
};

export default StoreProvider;
