import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { IEpisode, IAction } from "../../interfaces";

function EpisodeList(props: any): JSX.Element[] {
  const { episodes, toggleFavAction, favourites } = props;
  return (
    episodes.length !== 0 &&
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
                onClick={() => toggleFavAction(episode)}
              >
                {favourites.find((fav: IEpisode) => fav.id === episode.id)
                  ? "Unfavourite"
                  : "Favourite"}
              </Button>
              <Button size="small" color="primary">
                TODO
              </Button>
            </CardActions>
          </Card>
        </Grid>
      );
    })
  );
}

export default EpisodeList;
