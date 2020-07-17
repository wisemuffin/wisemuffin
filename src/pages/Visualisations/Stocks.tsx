import React from "react";
import Store from "../../store/Store";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import StockMoverShakers from "../../components/Charts/Containers/StockMoverShakers";
import StockLineHistoryChartWithUi from "../../components/Charts/Containers/StockLineHistoryChartWithUi";
// const StockMoverShakers = React.lazy(() =>
//   import("../../components/Charts/Views/StockMoverShakers")
// );
// const StockLineHistoryChartWithUi = React.lazy(() =>
//   import("../../components/Charts/Views/StockLineHistoryChartWithUi")
// );

const Stocks = () => {
  const { state, dispatch } = React.useContext(Store);
  const { yahooFinanceApiOff } = state;
  const classes = useStyles();
  return (
    <section style={{ marginTop: "15px" }}>
      <Container maxWidth="lg" className={classes.container}>
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
        <Box p={2}>
          <Typography variant={"h2"} color="textPrimary">
            Day Gainers - USA
          </Typography>
        </Box>
        {/* <React.Suspense fallback={<div>Loading...</div>}> */}
        <StockMoverShakers />
        {/* </React.Suspense> */}
        <Box p={2}>
          <Typography variant={"h2"} color="textPrimary">
            Original amazon chart
          </Typography>
        </Box>
        <Grid container alignItems="center" justify="center" spacing={1}>
          <Grid lg={10} md={12} xs={12} item>
            {/* <React.Suspense fallback={<div>Loading...</div>}> */}
            <StockLineHistoryChartWithUi />
            {/* </React.Suspense> */}
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default Stocks;
