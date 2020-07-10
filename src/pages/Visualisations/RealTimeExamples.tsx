import React, { useState, useEffect } from "react";
import { VegaLite } from "react-vega";
import data from "vega-datasets";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import RealTimeExampleContainer from "../../components/Charts/Containers/RealTimeExampleContainer";
import DropDown from "../../components/Buttons/DropDown";

interface IDropDownItem {
  id: number;
  display: string;
  value: number;
}

const RealTimeExamples = (props) => {
  const DropDownFrequency = [
    { id: 1, display: "1s", value: 1000 },
    { id: 2, display: "0.5s", value: 500 },
    { id: 3, display: "5s", value: 5000 },
  ];

  const [frequency, setFrequency] = useState<IDropDownItem[]>([
    DropDownFrequency[0],
  ]);

  const DropDownTimeWindow = [
    { id: 1, display: "60s", value: 60 },
    { id: 2, display: "120s", value: 120 },
    { id: 3, display: "240s", value: 240 },
    { id: 4, display: "360s", value: 360 },
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
        <Grid container spacing={4}>
          <Grid item>
            <DropDown
              items={DropDownFrequency}
              title="Frequency"
              onChangeHandler={setFrequency}
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
        {JSON.stringify(frequency)}
        {JSON.stringify(timeWindow)}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <RealTimeExampleContainer
              sensorName="Sensor 1"
              tickInterval={frequency[0].value}
              numberOfRecords={
                timeWindow[0].value * (1000 / frequency[0].value)
              }
              // numberOfRecords={60 * (1000 / 500)}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <RealTimeExampleContainer sensorName="Sensor 2" />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <RealTimeExampleContainer sensorName="Sensor 3" />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <RealTimeExampleContainer sensorName="Sensor 4" />
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default RealTimeExamples;
