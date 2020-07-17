import React from "react";
import Store from "../../store/Store";
import Grid from "@material-ui/core/Grid";
import { fetchDataAction, toggleFavAction } from "../../Actions";
import { IEpisodeProps } from "../../interfaces";
import Typography from "@material-ui/core/Typography";

const EpisodeList = React.lazy<any>(() => import("../EpisodeList"));

const TvEpisodesFav: React.FC = (): JSX.Element => {
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
    <section>
      <Typography variant="h1" align="center" gutterBottom>
        Favourite Episodes{" "}
        <span role="img" aria-label="tv emoji">
          📺
        </span>{" "}
      </Typography>
      <React.Suspense fallback={<div>...loading</div>}>
        <EpisodeList {...props} />
      </React.Suspense>
    </section>
  );
};

export default TvEpisodesFav;
