import React, { useState } from "react";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {
  DatePicker,
  // TimePicker,
  // DateTimePicker,
} from "@material-ui/pickers";
import moment from "moment";
import StockLineHistoryChart from "../StockLineHistoryChart";

const frequencyCase = (aggregation) => {
  switch (aggregation) {
    case "day":
      return "1d";
    case "week":
      return "1wk";
    case "month":
      return "1mo";
  }
};

const StockLineHistoryChartWithUi = ({ classes }) => {
  const [selectedFromDate, setSelectedFromDate] = useState<any>(
    moment().subtract(12, "weeks").format("X")
  );
  const [selectedToDate, setSelectedToDate] = useState<any>(
    moment().format("X")
  );
  const [aggregation, setAggregation] = useState("week");

  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <Typography variant="h6" color="textPrimary">
            Aggregation :
          </Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item>
              <Button
                onClick={() => setAggregation("day")}
                variant="contained"
                color={aggregation === "day" ? "primary" : "default"}
              >
                Day
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => setAggregation("week")}
                variant="contained"
                color={aggregation === "week" ? "primary" : "default"}
              >
                Week
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => setAggregation("month")}
                variant="contained"
                color={aggregation === "month" ? "primary" : "default"}
              >
                Month
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="h6" color="textPrimary">
                From:
              </Typography>
            </Grid>
            <Grid item>
              <DatePicker
                format="MM/DD/YYYY"
                value={moment.unix(selectedFromDate).format("ll")}
                onChange={(value) =>
                  setSelectedFromDate(moment(value).format("X"))
                }
              />
              {/* <TimePicker value={selectedDate} onChange={setSelectedDate} /> */}
              {/* <DateTimePicker value={selectedDate} onChange={setSelectedDate} /> */}
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="h6" color="textPrimary">
                To :
              </Typography>
            </Grid>
            <Grid item>
              <DatePicker
                format="MM/DD/YYYY"
                value={moment.unix(selectedToDate).format("ll")}
                onChange={(value) =>
                  setSelectedToDate(moment(value).format("X"))
                }
              />
              {/* <TimePicker value={selectedDate} onChange={setSelectedDate} /> */}
              {/* <DateTimePicker value={selectedDate} onChange={setSelectedDate} /> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Paper>
        <div className={classes.card}>
          <StockLineHistoryChart
            stockCode={"AMZN"}
            chartTitle={`Amazon by ${aggregation} from ${moment
              .unix(selectedFromDate)
              .format("ll")} to ${moment.unix(selectedToDate).format("ll")}`}
            ticksDivideBy={1}
            fromDate={selectedFromDate}
            toDate={selectedToDate}
            frequency={frequencyCase(aggregation)}
          />
        </div>
      </Paper>
    </>
  );
};

const styles = (theme) =>
  createStyles({
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignTtems: "strech",
      //   justifyContent: "center",
      padding: `${theme.spacing(3)}px`,
      borderRadius: "15px",
    },
  });

export default withStyles(styles)(StockLineHistoryChartWithUi);
