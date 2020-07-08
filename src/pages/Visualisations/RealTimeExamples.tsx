import React, { useState, useEffect } from "react";
import { VegaLite } from "react-vega";
import data from "vega-datasets";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import RealTimeExampleContainer from "../../components/Charts/Containers/RealTimeExampleContainer";
import DropDown from "../../components/Buttons/DropDown";

const RealTimeExamples = (props) => {
  const [cars, setCars] = useState([]);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await data["cars.json"]();
      console.log("cars :", res[0]);
      setCars(res);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await data["movies.json"]();
      console.log("movies :", res[0]);
      setMovies(res);
    };
    fetchData();
  }, []);

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
        <div>
          <DropDown
            items={[
              { id: 1, value: "yea" },
              { id: 2, value: "nah" },
            ]}
            title="Select n"
          />
        </div>

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
