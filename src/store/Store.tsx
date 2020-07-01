import React from "react";
import { IState } from "../interfaces";
import { falsy } from "vega";

export const initialState: IState = {
  showNav: false,
  dark: false,
  episodes: [],
  favourites: [],
  visualisations: [],
  yahooFinanceApiOff: true,
  // TODO turning off currently because so many api calls
  yahooFinanceApiOffChartWithinCard: true,
  yahooFinanceApiOffStockCard: true,
};

const Store = React.createContext<IState | any>(initialState);
export default Store;
