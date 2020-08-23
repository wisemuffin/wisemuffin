import React from "react";
import { IState, IAction } from "../types/interfaces";
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
  auth: null,
  user: null,
};

const Store = React.createContext<{
  state: IState;
  dispatch: React.Dispatch<IAction>;
}>({
  state: initialState,
  dispatch: () => {
    return {};
  },
});

export default Store;
