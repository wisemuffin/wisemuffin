import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardMi from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

const EarthquakeCard = (props) => {
  const { classes, id, title, subheader, cardContent } = props;
  return (
    <CardMi className={classes.card} key={id}>
      <CardHeader
        title={title}
        subheader={subheader}
        titleTypographyProps={{ align: "center" }}
        subheaderTypographyProps={{ align: "center" }}
      />
      {props.children}
      <CardContent className={classes.cardContent}>
        <Typography color="textSecondary" variant="subtitle2">
          {cardContent}
        </Typography>
      </CardContent>
    </CardMi>
  );
};

const styles = (theme) =>
  createStyles({
    root: {
      textAlign: "center",
      paddingTop: theme.spacing(5),
    },
    cardGrid: {
      padding: `${theme.spacing(8)}px 0`,
    },
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignTtems: "center",
      // justifyContent: "center"
    },

    cardContent: {
      display: "flex",
      justifyContent: "center",
      alignItems: "baseline",
      marginBottom: theme.spacing(2),
    },
  });

export default withStyles(styles)(EarthquakeCard);
