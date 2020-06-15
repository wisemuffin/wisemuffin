import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { IAction, IVis, IVisListProps } from "../../interfaces";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

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
                <CardActionArea href={vis.link}>
                  <ChooseMedia />
                  <CardContent>{vis.summary}</CardContent>
                  <CardHeader title={vis.name} />
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