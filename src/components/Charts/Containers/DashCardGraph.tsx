import React from "react";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import CardMi from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

import TrendingUp from "@material-ui/icons/TrendingUp";
import TrendingDown from "@material-ui/icons/TrendingDown";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import MiniStockLineHistoryChart from "../MiniStockLineHistoryChart";

const DashCardGraph = (props) => {
  const {
    classes,
    id,
    metricName,
    curretMetricValue,
    units,
    metricChange,
    metricPercentageChange,
    timeUpdated,
  } = props;
  return (
    <CardMi className={classes.card} key={id} style={{ position: "relative" }}>
      <Typography variant={"subtitle1"}>{metricName}</Typography>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-end"
      >
        <Grid item xs={8}>
          <Typography variant={"h3"}>{curretMetricValue}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant={"h5"}>{units}</Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <Grid item>
          {Math.sign(metricChange) === -1 ? (
            <TrendingDown style={{ color: "#DC143C" }} />
          ) : (
            <TrendingUp style={{ color: "#8FBC8F" }} />
          )}
        </Grid>
        <Grid item xs={1} />
        <Grid item>
          <Typography variant={"h5"}>{metricChange}</Typography>
        </Grid>
        <Grid item xs={1} />
        <Grid item>
          <Typography
            variant={"h6"}
            style={
              Math.sign(metricPercentageChange) === -1
                ? { color: "#DC143C" }
                : { color: "#8FBC8F" }
            }
          >
            {metricPercentageChange}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <MiniStockLineHistoryChart
            stockCode={"AMZN"}
            chartTitle={"Amazon over x months"}
            ticksDivideBy={1}
            fromDate={111}
            toDate={111}
            frequency={"1d"}
          />
        </Grid>
      </Grid>
      <Typography variant={"caption"}>{timeUpdated}</Typography>
      {props.children}
    </CardMi>
  );
};

const styles = (theme: Theme) =>
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
      alignTtems: "strech",
      //   justifyContent: "center",
      padding: `${theme.spacing(3)}px`,
      borderRadius: "15px",
    },
    // cardHeader: {
    //   backgroundColor: theme.palette.warning[500],
    //   boxShadow: theme.boxShadow,
    //   marginBottom: theme.spacing(1)
    // },
    title: {
      color: "white",
    },

    // cardContent: {
    //   display: "flex",
    //   justifyContent: "center",
    //   alignItems: "baseline",
    //   marginBottom: theme.spacing(2)
    // }
  });

export default withStyles(styles)(DashCardGraph);
