import React, { useReducer, useContext, useEffect, createContext } from "react";
import Store, { initialState } from "./Store";
import reducer from "./reducer";

const StoreProvider = ({
  children,
}: JSX.ElementChildrenAttribute): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const localData = localStorage.getItem("localWisemuffin");
    return localData ? JSON.parse(localData) : [];
  });
  useEffect(() => {
    localStorage.setItem("localWisemuffin", JSON.stringify(state));
  }, [state]);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

export default StoreProvider;
