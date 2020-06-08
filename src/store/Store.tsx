import React from "react";
import { IState } from "../interfaces";

export const initialState: IState = {
  showNav: false,
  drillDownMetric: {},
  weeklyReportSelected: "",
  dark: false,
  episodes: [],
  favourites: [],
};

const Store = React.createContext<IState | any>(initialState);
export default Store;
