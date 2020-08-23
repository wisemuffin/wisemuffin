import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Grid from "@material-ui/core/Grid";
import { IEpisode, IAction, IEpisodeProps } from "../../types/interfaces";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const EpisodeList: React.FC<IEpisodeProps> = ({
  episodes,
  favourites,
  store,
  toggleFavAction,
}) => {
  const { state, dispatch } = store;
  return (
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
                  <IconButton
                    color="primary"
                    onClick={() => toggleFavAction(state, dispatch, episode)}
                  >
                    {favourites.find(
                      (fav: IEpisode) => fav.id === episode.id
                    ) ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default EpisodeList;
