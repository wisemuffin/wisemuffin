import React from "react";
import { IState } from "../interfaces";
import { falsy } from "vega";

export const initialState: IState = {
  showNav: false,
  dark: false,
  episodes: [],
  favourites: [],
  visualisations: [],
  yahooFinanceApiOff: false,
  // TODO turning off currently because so many api calls
  yahooFinanceApiOffChartWithinCard: false,
  yahooFinanceApiOffStockCard: false,
};

const Store = React.createContext<IState | any>(initialState);
export default Store;
