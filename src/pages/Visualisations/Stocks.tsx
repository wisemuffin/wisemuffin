import React from "react";
import Store from "../../store/Store";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import StockMoverShakers from "../../components/Charts/Views/StockMoverShakers";
import StockLineHistoryChartWithUi from "../../components/Charts/Views/StockLineHistoryChartWithUi";

const Stocks = () => {
  const { state, dispatch } = React.useContext(Store);
  const { yahooFinanceApiOff } = state;
  return (
    <section>
      {yahooFinanceApiOff ? (
        <Alert severity="warning">
          Development mode is enabled on this page - live connections to Yahoo
          Finance APIs have been replaced with fake data to save on costs.
          Interactions requiring API calls have been restricted.
        </Alert>
      ) : (
        // <div />
        <div />
      )}

      <StockMoverShakers />
      <Box p={2}>
        <Typography variant={"h2"} color="textPrimary">
          Original amazon chart
        </Typography>
      </Box>
      <Grid container alignItems="center" justify="center" spacing={1}>
        <Grid lg={10} md={12} xs={12} item>
          <StockLineHistoryChartWithUi />
        </Grid>
      </Grid>
    </section>
  );
};

export default Stocks;
