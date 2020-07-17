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
  shows: Array<IShow>;
  episodes: Array<IEpisode>;
  favourites: Array<IEpisode>;
  visualisations: Array<IVis>;
  yahooFinanceApiOff: boolean;
  yahooFinanceApiOffChartWithinCard: boolean;
  yahooFinanceApiOffStockCard: boolean;
  sensorWebocketsOff: boolean;
}

export interface IShow {
  score: number;
  show: {
    id: number;
    url: string; //www.tvmaze.com/shows/216/rick-and-morty;
    name: string;
    type: string;
    language: string;
    genres: Array<string>;
    status: string;
    runtime: number;
    premiered: string;
    officialSite: string;
    schedule: {
      time: string;
      days: Array<string>;
    };
    rating: {
      average: number;
    };
    weight: number;
    network: {
      id: number;
      name: string;
      country: {
        name: string;
        code: string;
        timezone: string;
      };
    };
    webChannel: string;
    externals: {
      tvrage: number;
      thetvdb: number;
      imdb: string;
    };
    image: {
      medium: string;
      original: string;
    };
    summary: HTMLElement;
    updated: number;
    _links: {
      self: {
        href: string;
      };
      previousepisode: {
        href: string;
      };
    };
  };
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

export interface IEarthquake {
  type: string;
  metadata: {
    generated: number;
    url: string;
    title: string;
    status: number;
    api: string;
    count: number;
  };
  features: [
    {
      type: string;
      properties: {
        mag: number;
        place: string;
        time: number;
        updated: number;
        tz: string;
        url: string;
        detail: string;
        felt: string;
        cdi: string;
        mmi: number;
        alert: string;
        status: string;
        tsunami: number;
        sig: number;
        net: string;
        code: string;
        ids: string;
        sources: string;
        types: string;
        nst: string;
        dmin: number;
        rms: number;
        gap: number;
        magType: string;
        type: string;
        title: string;
      };
      geometry: {
        type: string;
        coordinates: [number, number];
      };
      id: string;
    }
  ];
  bbox: [number];
}

export interface IRealTimeChartData {
  date: number;
  value: number;
}

export interface ILineAreaChartData {
  x: Date;
  y: number;
}
