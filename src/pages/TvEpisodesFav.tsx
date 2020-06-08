import React from "react";
import Store from "../store/Store";
import Grid from "@material-ui/core/Grid";
import { fetchDataAction, toggleFavAction } from "../Actions";
import { IEpisodeProps } from "../interfaces";

const EpisodeList = React.lazy<any>(() => import("../components/EpisodeList"));

const TvEpisodesFav = (): JSX.Element => {
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() => {
    fetchDataAction(dispatch);
  }, []);

  const props: IEpisodeProps = {
    episodes: state.favourites,
    toggleFavAction,
    store: { state, dispatch },
    favourites: state.favourites,
  };

  console.log("fav in fav link: ", state.favourites);

  return (
    <React.Suspense fallback={<div>...loading</div>}>
      <Grid container spacing={2}>
        <EpisodeList {...props} />
      </Grid>
    </React.Suspense>
  );
};

export default TvEpisodesFav;
