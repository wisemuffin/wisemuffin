import React, { useState, useEffect, useContext } from "react";
import Store from "../../store/Store";
import { VegaLite } from "react-vega";
import data from "vega-datasets";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import RealTimeExampleContainer from "../../components/Charts/Containers/RealTimeExampleContainer";
import DropDown from "../../components/Buttons/DropDown";

interface IDropDownItem {
  id: number;
  display: string;
  value: number;
}

const RealTimeExamples = (props) => {
  const { state, dispatch } = React.useContext(Store);
  const { sensorWebocketsOff } = state;
  const DropDownFrequency = [
    { id: 1, display: "0.5 sec", value: 500 },
    { id: 2, display: "1 sec", value: 1000 },
    { id: 3, display: "5 sec", value: 5000 },
  ];

  const [frequency, setFrequency] = useState<IDropDownItem[]>([
    DropDownFrequency[1],
  ]);

  const DropDownTimeWindow = [
    { id: 1, display: "1 min", value: 60 },
    { id: 2, display: "2 mins", value: 120 },
    { id: 3, display: "4 mins", value: 240 },
  ];

  const [timeWindow, setTimeWindow] = useState<IDropDownItem[]>([
    DropDownTimeWindow[0],
  ]);

  return (
    <section>
      <Container maxWidth="lg">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Realtime Reporting Examples
        </Typography>
        {sensorWebocketsOff && (
          <Box p={2}>
            <Alert severity="warning">
              Development mode is enabled on this page - live connections to
              websockets have been removed to save costs.
            </Alert>
          </Box>
        )}

        <Grid container spacing={4}>
          <Grid item>
            <DropDown
              items={DropDownFrequency}
              title="Frequency"
              onChangeHandler={setFrequency}
              defaulltItem={1}
            />
          </Grid>
          <Grid item>
            <DropDown
              items={DropDownTimeWindow}
              title="Time Window"
              onChangeHandler={setTimeWindow}
            />
          </Grid>
        </Grid>
        {/* {JSON.stringify(frequency)} */}
        {/* {JSON.stringify(timeWindow)} */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <RealTimeExampleContainer
              sensorName="Sensor 1"
              tickInterval={frequency[0].value}
              history={timeWindow[0].value}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <RealTimeExampleContainer
              sensorName="Sensor 2"
              tickInterval={frequency[0].value}
              history={timeWindow[0].value}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <RealTimeExampleContainer
              sensorName="Sensor 3"
              tickInterval={frequency[0].value}
              history={timeWindow[0].value}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <RealTimeExampleContainer
              sensorName="Sensor 4"
              tickInterval={frequency[0].value}
              history={timeWindow[0].value}
            />
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default RealTimeExamples;
