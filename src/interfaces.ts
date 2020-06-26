/**
 * all the interfaces
 */

export interface IAction {
  type: string;
  payload: any;
}

export interface IState {
  showNav: boolean;
  dark: boolean;
  episodes: Array<IEpisode>;
  favourites: Array<IEpisode>;
  visualisations: Array<IVis>;
  yahooFinanceApiOff: boolean;
  yahooFinanceApiOffChartWithinCard: boolean;
  yahooFinanceApiOffStockCard: boolean;
}

export interface IEpisode {
  airdate: string;
  airstamp: string;
  airtime: string;
  id: number;
  image: {
    medium: string;
    original: string;
  };
  name: string;
  number: number;
  runtime: number;
  season: number;
  summary: string;
  url: string;
}

export interface IEpisodeProps {
  episodes: Array<IEpisode>;
  toggleFavAction: (state: IState, dispatch: any, episode: IEpisode) => IAction;
  store: { state: IState; dispatch: any };
  favourites: Array<IEpisode>;
}

export type Dispatch = React.Dispatch<IAction>;

export interface IVis {
  createdDate: string;
  id: number;
  mediaType: "video" | "img";
  media: {
    medium: string;
    original: string;
  };
  name: string;
  summary: string;
  link: string;
}

export interface IVisListProps {
  visualisations: Array<IVis>;
  store: { state: IState; dispatch: any };
}

export interface IStockQuote {
  language: string;
  region: string;
  quoteType: string;
  triggerable: boolean;
  exchange: string;
  sourceInterval: number;
  exchangeTimezoneName: string;
  exchangeTimezoneShortName: string;
  gmtOffSetMilliseconds: number;
  esgPopulated: boolean;
  tradeable: boolean;
  exchangeDataDelayedBy: number;
  market: string;
  fullExchangeName: string;
  marketState: string;
  priceHint: number;
  symbol: string;
}

export interface IStock {
  id: string;
  title: string;
  description: string;
  canonicalName: string;
  criteriaMeta: {
    size: number;
    offset: number;
    sortField: string;
    sortType: string;
    quoteType: string;
    topOperator: string;
    criteria: [
      {
        field: string;
        operators: [string];
        values: [number];
        labelsSelected: [string];
      }
    ];
  };
  rawCriteria: string;
  start: number;
  count: number;
  total: number;
  quotes: [IStockQuote];
  predefinedScr: boolean;
  versionId: number;
}
