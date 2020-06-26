import React, { useReducer, useContext, useEffect, createContext } from "react";
import Store, { initialState } from "./Store";
import reducer from "./reducer";

const StoreProvider = ({
  children,
}: JSX.ElementChildrenAttribute): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const localData = localStorage.getItem("localWisemuffin");
    return localData
      ? { ...initialState, ...JSON.parse(localData) }
      : initialState;
  });
  useEffect(() => {
    // choose which state to store on localstorage
    localStorage.setItem(
      "localWisemuffin",
      JSON.stringify({
        showNav: state.showNav,
        dark: state.dark,
        episodes: state.episodes,
        favourites: state.favourites,
        visualisations: state.visualisations,
      })
    );
  }, [state]);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

export default StoreProvider;
