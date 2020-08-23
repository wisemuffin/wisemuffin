import { IState, IEpisode, IAction } from "./types/interfaces";

/**
 * Fetches shows from https://api.tvmaze.com/
 * Use async stream with throttle if observing key presses from search
 * @param dispatch dispatch function from useContext
 * @param search string to be sent to API for fuzi seach
 */
export const fetchShows = async (search = "morty") => {
  const URL = `https://api.tvmaze.com/search/shows?q=:${search}`;
  const data = await fetch(URL);
  const dataJSON = await data.json();
  return dataJSON;
  // dispatch({
  //   type: "ADD_SHOWS",
  //   payload: dataJSON,
  // });
};

export const fetchDataAction = async (dispatch: any) => {
  const URL =
    "https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes";
  const data = await fetch(URL);
  const dataJSON = await data.json();
  return dispatch({
    type: "ADD_EPISODE_DATA",
    payload: dataJSON._embedded.episodes,
  });
};

export const toggleFavAction = (
  state: IState,
  dispatch: any,
  episode: IEpisode | any
): IAction => {
  const episodeInFav = state.favourites.includes(episode);
  let dispatchObj = {
    type: "ADD_FAV",
    payload: episode,
  };
  if (episodeInFav) {
    const favWithoutEpisode = state.favourites.filter(
      (fav: IEpisode) => fav.id !== episode.id
    );
    dispatchObj = {
      type: "REMOVE_FAV",
      payload: favWithoutEpisode,
    };
  }
  return dispatch(dispatchObj);
};
