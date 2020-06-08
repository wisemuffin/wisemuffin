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
