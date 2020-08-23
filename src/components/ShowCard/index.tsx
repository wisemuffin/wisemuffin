import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import { IShow } from "../../types/interfaces";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const ShowCard = ({ show, score }: IShow) => {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <img src={show.image?.medium} />
        </CardContent>
        <CardHeader
          title={show.name}
          //   subheader={`Season: ${show.season}, Episode: ${show.number}`}
        />
      </CardActionArea>
      <CardActions>
        {/* <IconButton
          color="primary"
          onClick={() => toggleFavAction(state, dispatch, show)}
        >
          {favourites.find((fav: IShow) => fav.id === show.id) ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton> */}
      </CardActions>
    </Card>
  );
};

export default ShowCard;
