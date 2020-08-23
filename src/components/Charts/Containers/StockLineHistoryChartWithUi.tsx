import React, { useState, useContext, useEffect } from "react";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import Store from "../../../store/Store";
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
import LineAreaChart from "../LineAreaChart";
import { ILineAreaChartData } from "../../../types/interfaces";

const frequencyCase = (aggregation): string => {
  switch (aggregation) {
    case "day":
      return "1d";
    case "week":
      return "1wk";
    case "month":
      return "1mo";
    default:
      return "1d";
  }
};

const StockLineHistoryChartWithUi = ({ classes }) => {
  const { state } = useContext(Store);

  const { yahooFinanceApiOff } = state;
  const [selectedStockCode, setSelectedStockCode] = useState("AMZN");

  const [selectedFromDate, setSelectedFromDate] = useState<any>(
    moment().subtract(12, "weeks").format("X")
  );
  const [selectedToDate, setSelectedToDate] = useState<any>(
    moment().format("X")
  );
  const [aggregation, setAggregation] = useState("week");

  const [data, setData] = useState<ILineAreaChartData[]>([
    // { x: new Date(), y: 1000 },
  ]);

  const getYahooFinance = async () => {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-historical-data?frequency=${frequencyCase(
      aggregation
    )}&filter=history&period1=${selectedFromDate}&period2=${selectedToDate}&symbol=${selectedStockCode}`;
    try {
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_YAHOOFINANCE!,
        },
      });
      const data = await resp.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getDataAndDraw = async () => {
      const preData = yahooFinanceApiOff ? fakeData : await getYahooFinance();
      let clonedPreData = {
        ...preData,
        prices: [...preData?.prices],
        timeZone: { ...preData?.timeZone },
        eventsData: [...preData?.eventsData],
      };
      clonedPreData.prices.reverse();
      const transformedData = clonedPreData.prices.map((price) => ({
        x: price.date * 1000,
        y: price.close,
      }));

      setData(transformedData);
    };
    getDataAndDraw();
  }, [aggregation, selectedToDate, selectedFromDate]);

  useEffect(() => console.log("transformedData: ", data), [data]);

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
        <LineAreaChart
          stockCode={selectedStockCode}
          chartTitle={`${selectedStockCode} by ${aggregation} from ${moment
            .unix(selectedFromDate)
            .format("ll")} to ${moment.unix(selectedToDate).format("ll")}`}
          ticksDivideBy={1}
          data={data}
          xAccessor={(d) => d.x}
          yAccessor={(d) => d.y}
        />
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

const fakeData = {
  prices: [
    {
      date: 1562074200,
      open: 1919.3800048828125,
      high: 1934.7900390625,
      low: 1906.6300048828125,
      close: 1934.31005859375,
      volume: 2645900,
      adjclose: 1934.31005859375,
    },
    {
      date: 1561987800,
      open: 1922.97998046875,
      high: 1929.8199462890625,
      low: 1914.6600341796875,
      close: 1922.18994140625,
      volume: 3203300,
      adjclose: 1922.18994140625,
    },
    {
      date: 1561728600,
      open: 1909.0999755859375,
      high: 1912.93994140625,
      low: 1884,
      close: 1893.6300048828125,
      volume: 3037400,
      adjclose: 1893.6300048828125,
    },
    {
      date: 1561642200,
      open: 1902,
      high: 1911.239990234375,
      low: 1898.0400390625,
      close: 1904.280029296875,
      volume: 2141700,
      adjclose: 1904.280029296875,
    },
    {
      date: 1561555800,
      open: 1892.47998046875,
      high: 1903.800048828125,
      low: 1887.3199462890625,
      close: 1897.8299560546875,
      volume: 2441900,
      adjclose: 1897.8299560546875,
    },
    {
      date: 1561469400,
      open: 1911.8399658203125,
      high: 1916.3900146484375,
      low: 1872.4200439453125,
      close: 1878.27001953125,
      volume: 3012300,
      adjclose: 1878.27001953125,
    },
    {
      date: 1561383000,
      open: 1912.6600341796875,
      high: 1916.8599853515625,
      low: 1901.300048828125,
      close: 1913.9000244140625,
      volume: 2283000,
      adjclose: 1913.9000244140625,
    },
  ],
  isPending: false,
  firstTradeDate: 863683200,
  id: "1d15464484001562086800",
  timeZone: { gmtOffset: -18000 },
  eventsData: [],
};
