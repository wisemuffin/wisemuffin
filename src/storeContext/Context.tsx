import { createContext } from "react";

export interface IState {
  showNav: boolean;
  drillDownMetric: {};
  weeklyReportSelected: string;
  dark: boolean;
}

export const initialState: IState = {
  showNav: false,
  drillDownMetric: {},
  weeklyReportSelected: "",
  dark: false,
};

const Context = createContext<IState | any>(initialState);
export default Context;
