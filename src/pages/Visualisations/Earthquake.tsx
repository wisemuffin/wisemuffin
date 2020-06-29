import React, { Fragment, useEffect, useState } from "react";
import { IEarthquake } from "../../interfaces";
import Typography from "@material-ui/core/Typography";
import ResponsiveEmbed from "react-responsive-embed";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Map from "../../components/Map";
import EarthquakeCard from "../../components/EarthquakeCard";
// import "react-table/react-table.css";
import EarthquakeTable from "../../components/Tables/EarthquakeTable";
import Grid from "@material-ui/core/Grid";
import moment from "moment";

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
function SliderColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={filterValue || min}
        onChange={(e) => {
          setFilter(parseInt(e.target.value, 10));
        }}
      />
      <button onClick={() => setFilter(undefined)}>Off</button>
    </>
  );
}

const Earthquake = (props) => {
  const [sigEarthquake, setSigEarthquake] = useState<IEarthquake>();
  const [earthquakeSigPastMonth, setEarthquakeSigPastMonth] = useState<
    IEarthquake
  >();
  const { classes } = props;

  const getSigEarthquake = async () => {
    const url =
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";
    const resp = await fetch(url, { method: "GET" });
    const data = await resp.json();
    setSigEarthquake(data);
  };

  const getEarthquakeSigPastMonth = async () => {
    const url =
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
    const resp = await fetch(url, { method: "GET" });
    const data = await resp.json();
    setEarthquakeSigPastMonth(data);
  };

  useEffect(() => {
    getSigEarthquake();
  }, []);

  useEffect(() => {
    getEarthquakeSigPastMonth();
  }, []);

  return (
    <section>
      <div className={classes.root}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Earthquakes
        </Typography>

        {sigEarthquake?.features && (
          <>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              paragraph
            >
              {sigEarthquake.metadata.title}
            </Typography>

            {/* <GalleryCarousel> */}
            <Grid container alignContent="center" justify="center" spacing={2}>
              {sigEarthquake.features.map((card) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
                  <EarthquakeCard
                    title={`Magnitude ${card.properties.mag}`}
                    id={card.id}
                    subheader={`${card.properties.type}`}
                    cardContent={`${card.properties.place} ${new Date(
                      card.properties.time
                    ).toDateString()} ${new Date(
                      card.properties.time
                    ).toLocaleTimeString()}`}
                  >
                    <Map
                      markerPosition={{
                        lat: card.geometry.coordinates[1],
                        lng: card.geometry.coordinates[0],
                      }}
                      radius={5000 * card.properties.mag}
                      id={"sig" + card.id}
                      width={"100%"}
                      height={"300px"}
                      zoom={8}
                    />
                  </EarthquakeCard>
                </Grid>
              ))}
            </Grid>

            {/* </GalleryCarousel> */}
            <Typography
              // varient="body1"
              align="center"
              color="textSecondary"
              paragraph
            >
              Earthquake’s magnitude is measured in logarithmic scale. Which
              means an earthquake with magnitude 5 is 10 times stronger than one
              with magnitude 4.
            </Typography>
          </>
        )}

        <Typography variant="h2" align="center" color="textSecondary" paragraph>
          Where do earthquakes occur?
        </Typography>
        <Typography
          variant="body1"
          align="left"
          color="textSecondary"
          paragraph
        >
          Time map:2018 {">="}4 mag, source:
          <Link href="https://earthquake.usgs.gov">earthquake.usgs.gov</Link>
        </Typography>
        <Grid container justify="center">
          <Grid item xs={12} md={12} lg={10}>
            <ResponsiveEmbed
              src="https://public.flourish.studio/visualisation/188234/embed"
              frameBorder="0"
              scrolling="no"
            />
          </Grid>
        </Grid>

        <Typography
          variant="body1"
          align="left"
          color="textSecondary"
          paragraph
        >
          Earthquake’s magnitude is measured in logarithmic scale. Which means
          an earthquake with magnitude 5 is 10 times stronger than one with
          magnitude 4. Source: USGS:
          https://earthquake.usgs.gov/earthquakes/search/
        </Typography>

        {earthquakeSigPastMonth?.features && (
          <>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              paragraph
            >
              {earthquakeSigPastMonth.metadata.title}
            </Typography>
            <EarthquakeTable
              data={earthquakeSigPastMonth.features}
              columns={[
                {
                  Header: "Name",
                  columns: [
                    // {
                    //   Header: "Type",
                    //   accessor: "properties.type"
                    // },
                    {
                      Header: "Location",
                      accessor: "properties.place",
                      minWidth: 200,
                    },
                    {
                      Header: "Time",
                      accessor: "properties.time",
                      Cell: (row) =>
                        moment(row.value).format("Do MMM YYYY, h a"),
                    },
                    {
                      Header: "Magnitude",
                      accessor: "properties.mag",
                      Filter: SliderColumnFilter,
                      aggregate: "average",
                      Aggregated: ({ value }) => `${value} (avg)`,
                      Cell: (row) => (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#dadada",
                            borderRadius: "2px",
                          }}
                        >
                          <div
                            style={{
                              width: `${row.value * 10}%`, // mag out of 10
                              height: "100%",
                              backgroundColor:
                                row.value < 4.5
                                  ? "#85cc00"
                                  : row.value < 6.5
                                  ? "#ffbf00"
                                  : "#ff2e00",
                              borderRadius: "2px",
                              transition: "all .2s ease-out",
                            }}
                          >
                            {row.value}
                          </div>
                        </div>
                      ),
                    },
                    {
                      Header: "Mag Type",
                      accessor: "properties.magType",
                    },
                  ],
                },
              ]}
            />

            <Grid container justify="center" spacing={2}>
              {earthquakeSigPastMonth.features.map((card) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
                  <EarthquakeCard
                    title={`Magnitude ${card.properties.mag}`}
                    id={card.id}
                    subheader={`${card.properties.type}`}
                    cardContent={`${card.properties.place} ${new Date(
                      card.properties.time
                    ).toDateString()} ${new Date(
                      card.properties.time
                    ).toLocaleTimeString()}`}
                  >
                    <Map
                      markerPosition={{
                        lat: card.geometry.coordinates[1],
                        lng: card.geometry.coordinates[0],
                      }}
                      radius={5000 * card.properties.mag}
                      id={"sipPastMonth" + card.id}
                      width={"100%"}
                      height={"300px"}
                      zoom={8}
                    />
                  </EarthquakeCard>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </div>
    </section>
  );
};

const styles = (theme) =>
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
      alignTtems: "center",
      // justifyContent: "center"
    },
    cardHeader: {
      backgroundColor: theme.palette.warning[500],
      boxShadow: theme.boxShadow,
      marginBottom: theme.spacing(1),
    },
    title: {
      color: "white",
    },

    cardContent: {
      display: "flex",
      justifyContent: "center",
      alignItems: "baseline",
      marginBottom: theme.spacing(2),
    },
  });

export default withStyles(styles)(Earthquake);
