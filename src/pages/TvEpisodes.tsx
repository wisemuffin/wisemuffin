import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { IEpisode, IAction } from "../interfaces";
import Layout from "../components/UI/Layout";
import Context from "../storeContext/Context";

const EpisodeList = React.lazy<any>(() => import("../components/EpisodeList"));

const TvEpisodes = () => {
  const { state, dispatch } = React.useContext(Context);
  const [episodes, setEpisodes] = React.useState([]);

  React.useEffect(() => {
    fetchTV();
  }, []);

  const fetchTV = async () => {
    const URL =
      "https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes";
    const data = await fetch(URL);
    const dataJSON = await data.json();
    return setEpisodes(dataJSON._embedded.episodes);
  };

  const toggleFavAction = (episode: IEpisode): IAction => {
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

  const props = {
    episodes: episodes,
    toggleFavAction,
    favourites: state.favourites,
  };

  return (
    <Layout>
      <Typography variant="h1">
        Tv Shows{" "}
        <span role="img" aria-label="tv emoji">
          📺
        </span>{" "}
      </Typography>
      <Typography variant="caption">
        Favourite Count: {state.favourites.length}
      </Typography>
      <React.Suspense fallback={<div>...loading</div>}>
        <Grid container spacing={2}>
          <EpisodeList {...props} />
        </Grid>
      </React.Suspense>
    </Layout>
  );
};

export default TvEpisodes;
