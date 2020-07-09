import React, { useState, useEffect } from "react";
import { VegaLite } from "react-vega";
import data from "vega-datasets";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import RealTimeExampleContainer from "../../components/Charts/Containers/RealTimeExampleContainer";
import DropDown from "../../components/Buttons/DropDown";

const RealTimeExamples = (props) => {
  const [frequency, setFrequency] = useState([]);

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
              items={[
                { id: 1, value: "0.1s" },
                { id: 2, value: "0.25s" },
                { id: 3, value: "0.5s" },
                { id: 4, value: "1s" },
              ]}
              title="Frequency"
            />
          </Grid>
          <Grid item>
            <DropDown
              items={[
                { id: 1, value: "60s" },
                { id: 2, value: "120s" },
                { id: 3, value: "240s" },
                { id: 4, value: "360s" },
              ]}
              title="Time Window"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <RealTimeExampleContainer sensorName="Sensor 1" />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <RealTimeExampleContainer sensorName="Sensor 2" xTicks={5} />
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
