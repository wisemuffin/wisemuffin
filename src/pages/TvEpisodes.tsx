import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { IEpisode, IAction } from "../interfaces";
import Layout from "../components/UI/Layout";
import Context from "../storeContext/Context";

const TvEpisodes = () => {
  const { state, dispatch } = React.useContext(Context);
  const [episodes, setEpisodes] = React.useState([]);
  console.log("state from context: ", state);

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

  const toggleFav = (episode: IEpisode): IAction => {
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

  console.log(state.favouries);
  console.log("[].length", [].length);
  console.log("check: ", state.favouries);

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
      <Grid container spacing={2}>
        {episodes.length !== 0 &&
          episodes.map((episode: IEpisode) => {
            return (
              <Grid item key={episode.id}>
                <Card>
                  <CardActionArea>
                    <CardContent>
                      <img src={episode.image.medium} alt={episode.summary} />
                    </CardContent>
                    <CardHeader
                      title={episode.name}
                      subheader={`Season: ${episode.season}, Episode: ${episode.number}`}
                    />
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => toggleFav(episode)}
                    >
                      {state.favourites.find(
                        (fav: IEpisode) => fav.id === episode.id
                      )
                        ? "Unfavourite"
                        : "Favourite"}
                    </Button>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Layout>
  );
};

export default TvEpisodes;
