import React from "react";
import { IState } from "../interfaces";
import { falsy } from "vega";

export const initialState: IState = {
  showNav: false,
  dark: false,
  shows: [],
  episodes: [],
  favourites: [],
  visualisations: [],
  yahooFinanceApiOff: false,
  // TODO turning off currently because so many api calls
  yahooFinanceApiOffChartWithinCard: false,
  yahooFinanceApiOffStockCard: false,
  sensorWebocketsOff: true,
};

const Store = React.createContext<IState | any>(initialState);
export default Store;
