import React from "react";
import { IState } from "../interfaces";

export const initialState: IState = {
  showNav: false,
  dark: false,
  episodes: [],
  favourites: [],
  visualisations: [],
};

const Store = React.createContext<IState | any>(initialState);
export default Store;
