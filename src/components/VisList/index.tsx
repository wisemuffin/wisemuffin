import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import AccessTime from "@material-ui/icons/AccessTime";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { IAction, IVis, IVisListProps } from "../../interfaces";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import distanceFromWordsToNow from "date-fns/distance_in_words_to_now";

const VisList: React.FC<IVisListProps> = ({ store, visualisations }) => {
  const { state, dispatch } = store;
  return (
    <Grid container spacing={2}>
      {visualisations.length !== 0 &&
        visualisations.map((vis: IVis) => {
          const ChooseMedia: React.FC<any> = () =>
            vis.mediaType === "video" ? (
              <CardMedia
                src={vis.media.medium}
                title={vis.summary}
                component={"video"}
                autoPlay={true}
                loop={true}
              />
            ) : (
              <CardMedia
                title={vis.summary}
                image={vis.media.medium}
                component={"img"}
              />
            );

          return (
            <Grid item key={vis.id} xl={3} md={6} sm={12}>
              <Card>
                <CardActionArea component={RouterLink} to={vis.link}>
                  <ChooseMedia />
                  <CardHeader title={vis.name} />

                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      gutterBottom
                    >
                      {vis.summary}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item>
                        <AccessTime />
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="subtitle2"
                          color="inherit"
                          gutterBottom
                        >
                          {distanceFromWordsToNow(vis.createdDate) + " ago"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardActionArea>
                {/* <CardActions>
                  <IconButton
                    color="primary"
                    onClick={() => toggleFavAction(state, dispatch, vis)}
                  >
                    {favourites.find((fav: IVis) => fav.id === vis.id) ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                </CardActions> */}
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default VisList;
