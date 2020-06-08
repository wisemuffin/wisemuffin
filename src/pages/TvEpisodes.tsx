import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { IEpisode, IAction, IEpisodeProps } from "../interfaces";
import Store from "../store/Store";
import { fetchDataAction, toggleFavAction } from "../Actions";

const EpisodeList = React.lazy<any>(() => import("../components/EpisodeList"));

const TvEpisodes = () => {
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() => {
    fetchDataAction(dispatch);
  }, []);

  const props: IEpisodeProps = {
    episodes: state.episodes,
    toggleFavAction,
    store: { state, dispatch },
    favourites: state.favourites,
  };

  return (
    <section>
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
    </section>
  );
};

export default TvEpisodes;
