import React, { useState, useEffect } from "react";
import { VegaLite } from "react-vega";
import data from "vega-datasets";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";

const VegaExamples = (props) => {
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
    <section style={{ marginTop: "15px" }}>
      <Container maxWidth="lg">
        <Alert severity="warning">
          Still working on making resizing to mobile device work with vega lite,
          and overlapping charts. Looks like a bug:{" "}
          <span>
            <a href="https://github.com/vega/vega-embed/pull/490">github</a>
          </span>
        </Alert>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Example Vega Page
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={6} lg={6} key={1}>
            <div style={{ width: "100%" }}>
              <VegaLite
                spec={{
                  vconcat: [
                    {
                      mark: { type: "bar" },
                      data: { name: "table" },
                      encoding: {
                        x: {
                          field: "Year",
                          type: "ordinal",
                          timeUnit: "year",
                          axis: { title: null, labelAngle: 0 },
                        },
                        y: {
                          type: "quantitative",
                          aggregate: "count",
                          title: null,
                        },
                        opacity: {
                          condition: {
                            test: { selection: "sel3" },
                            value: 0.9,
                          },
                          value: 0.1,
                        },
                      },
                      selection: {
                        sel3: { type: "interval", encodings: ["x"] },
                      },
                      width: "container",
                      height: 50,
                    },
                    {
                      mark: { type: "point" },
                      data: { name: "table" },
                      encoding: {
                        x: { field: "Horsepower", type: "quantitative" },
                        y: { field: "Miles_per_Gallon", type: "quantitative" },
                        opacity: {
                          condition: {
                            test: { selection: "sel3" },
                            value: 0.9,
                          },
                          value: 0.1,
                        },
                      },
                      width: "container",
                      height: 150,
                    },
                  ],
                }}
                data={{
                  table: cars,
                }}
                style={{ width: "100%" }}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} key={2}>
            <VegaLite
              spec={{
                vconcat: [
                  {
                    mark: { type: "bar", width: 4 },
                    data: { name: "table" },
                    selection: {
                      sel18: { type: "interval", encodings: ["x"] },
                    },
                    encoding: {
                      x: {
                        field: "Release_Date",
                        type: "temporal",
                        timeUnit: "year",
                        title: "Films by Release Year",
                      },
                      y: {
                        type: "quantitative",
                        aggregate: "count",
                        title: null,
                      },
                    },
                    width: "container",
                    height: 50,
                  },
                  {
                    mark: { type: "circle" },
                    data: { name: "table" },
                    encoding: {
                      x: {
                        field: "Rotten_Tomatoes_Rating",
                        type: "quantitative",
                      },
                      y: { field: "IMDB_Rating", type: "quantitative" },
                      tooltip: { field: "Title", type: "nominal" },
                      opacity: {
                        condition: {
                          test: { selection: "sel18" },
                          value: 0.75,
                        },
                        value: 0.05,
                      },
                    },
                    width: "container",
                    height: 400,
                  },
                ],
                spacing: 5,
              }}
              data={{
                table: movies,
              }}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} key={2}>
            <VegaLite
              spec={{
                mark: { type: "bar", width: 4 },
                data: { name: "table" },
                selection: {
                  sel18: { type: "interval", encodings: ["x"] },
                },
                encoding: {
                  x: {
                    field: "Release_Date",
                    type: "temporal",
                    timeUnit: "year",
                    title: "Films by Release Year",
                  },
                  y: {
                    type: "quantitative",
                    aggregate: "count",
                    title: null,
                  },
                },
                width: "container",
                height: 50,
              }}
              data={{
                table: movies,
              }}
              style={{ width: "100%" }}
            />
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default VegaExamples;
