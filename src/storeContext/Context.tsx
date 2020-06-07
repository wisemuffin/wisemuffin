import React from "react";
import { IState } from "../interfaces";

export const initialState: IState = {
  showNav: false,
  drillDownMetric: {},
  weeklyReportSelected: "",
  dark: false,
  favourites: [],
};

const Context = React.createContext<IState | any>(initialState);
export default Context;
