import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { IEpisode, IAction, IEpisodeProps, IState } from "../../interfaces";
import Store from "../../store/Store";
import { fetchDataAction, toggleFavAction } from "../../Actions";

const EpisodeList = React.lazy<any>(() => import("../EpisodeList"));

const TvEpisodes: React.FC = () => {
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
      <Typography variant="h1" align="center" gutterBottom>
        Episode List{" "}
        <span role="img" aria-label="tv emoji">
          📺
        </span>{" "}
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" paragraph>
        Testing out react lazy, and adding a favourite button.
      </Typography>
      <Typography variant="caption">
        Favourite Count: {state.favourites.length}
      </Typography>
      <React.Suspense fallback={<div>...loading</div>}>
        <EpisodeList {...props} />
      </React.Suspense>
    </section>
  );
};

export default TvEpisodes;
