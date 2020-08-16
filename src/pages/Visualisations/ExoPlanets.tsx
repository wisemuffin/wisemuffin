import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Skeleton from "@material-ui/lab/Skeleton";

import useFetch from "../../hooks/useFetch";
import * as R from "ramda";
import * as d3 from "d3";
import Alert from "@material-ui/lab/Alert";
import VegaLiteWrapper from "../../components/Charts/VegaLiteWrapper";

const methodsDescriptions = [
  {
    name: "Transit",
    description: `When a planet passes directly between its star and an observer, it dims the star's light by a measurable amount.`,
    img:
      "https://res.cloudinary.com/dkn8xtjbm/image/upload/v1596662596/Nasa/transit.png",
  },
  {
    name: "Radial Velocity",
    description: `Orbiting planets cause stars to wobble in space, causing an observable shift in the color of the star's light.`,
    img:
      "https://res.cloudinary.com/dkn8xtjbm/image/upload/v1596662858/Nasa/radial_velocity.png",
  },
  {
    name: "Microlensing",
    description: `Light from a distant star is bent and focused by gravity as a planet passes between the star and Earth.`,
    img:
      "https://res.cloudinary.com/dkn8xtjbm/image/upload/v1596662857/Nasa/microlensing.png",
  },
  {
    name: "Imaging",
    description: `Astronomers can take pictures of exoplanets using techniques that remove the overwhelming glare of the stars they orbit`,
    img:
      "https://res.cloudinary.com/dkn8xtjbm/image/upload/v1596662857/Nasa/direct_imaging.png",
  },
];

const url_nasa_exoplanets =
  "https://exoplanets.nasa.gov/alien-worlds/ways-to-find-a-planet/";

interface IExoPlanets {
  pl_discmethod: string;
}

interface IExoPlanetsByMethod {
  pl_discmethod: string;
  count_of_exo_planets: number;
  ratio_of_exo_planets_to_total: number;
}

const ExoPlanets = (props) => {
  const [exo_planets, setExo_planets] = React.useState<IExoPlanetsByMethod[]>();
  const [exo_planets_by_method, setExo_planets_by_method] = React.useState<
    IExoPlanetsByMethod[]
  >();

  const exo_planets_raw: IExoPlanets[] = useFetch(
    "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=exoplanets&select=pl_name,pl_orbper,pl_masse,pl_facility,pl_discmethod,pl_publ_date,pl_rade,pl_orbper,pl_bmassj&order=pl_publ_date&format=json"
  );

  React.useEffect(() => {
    if (!exo_planets_raw) return;

    const exo_planets_transformed = R.compose(
      R.map((planet) => ({
        ...planet,
        pl_publ_date: d3.timeParse("%Y-%m")(planet.pl_publ_date),
      }))
    )(exo_planets_raw);

    setExo_planets(exo_planets_transformed);

    const total_exo_planets = exo_planets_raw.length;

    const exo_planets_by_method_trans = R.compose(
      R.sortWith([R.descend(R.prop("count_of_exo_planets"))]),
      R.map((arr) => ({
        pl_discmethod: arr[0],
        count_of_exo_planets: arr[1],
        ratio_of_exo_planets_to_total: arr[1] / total_exo_planets,
      })),
      R.toPairs,
      R.map(R.reduce((acc, curr) => acc + 1, 0)),
      R.groupBy(R.prop("pl_discmethod"))
    )(exo_planets_raw);

    setExo_planets_by_method(exo_planets_by_method_trans);
  }, [exo_planets_raw]);

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <section style={{ marginTop: "15px" }}>
      <Container maxWidth="lg">
        <Typography variant="h3">NASA's Exoplanets</Typography>

        <Alert severity="info">
          find out more at{" "}
          <span>
            <a href={url_nasa_exoplanets}>NASA Exoplanets</a>
          </span>
        </Alert>
        <div style={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} lg={6}>
              <Typography variant="h5" gutterBottom>
                By Discovery Method
              </Typography>
              {!exo_planets_by_method &&
                R.range(1, 5).map((i) => (
                  <Skeleton
                    animation="wave"
                    height={70}
                    width="100%"
                    style={{ marginBottom: 6 }}
                  />
                ))}
              {exo_planets_by_method?.slice(0, 4).map((method) => (
                <Accordion
                  expanded={expanded === method.pl_discmethod}
                  onChange={handleChange(method.pl_discmethod)}
                  key={method.pl_discmethod}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Grid container spacing={1}>
                      <Grid item>
                        <Typography variant="h5">
                          {(method.ratio_of_exo_planets_to_total * 100).toFixed(
                            2
                          )}
                          %
                        </Typography>
                      </Grid>
                      <Grid item>
                        <img
                          src={
                            methodsDescriptions.filter(
                              (meth) =>
                                meth.name.toLocaleLowerCase() ===
                                method.pl_discmethod.toLocaleLowerCase()
                            )[0]?.img
                          }
                        />
                      </Grid>
                      <Grid item>
                        <Typography color="textSecondary">
                          {method.pl_discmethod}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography color="textSecondary">
                          ({method.count_of_exo_planets} planets)
                        </Typography>
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {
                        methodsDescriptions.filter(
                          (meth) =>
                            meth.name.toLocaleLowerCase() ===
                            method.pl_discmethod.toLocaleLowerCase()
                        )[0]?.description
                      }
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
              <Grid container>
                {exo_planets_by_method?.slice(5).map((method) => (
                  <Grid item key={method.pl_discmethod}>
                    <Typography variant="caption">
                      {(method.ratio_of_exo_planets_to_total * 100).toFixed(2)}%{" "}
                      {method.pl_discmethod}{" "}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Typography variant="h5" gutterBottom>
                Exoplanet Discovery Timeline
              </Typography>
              <Paper>
                {!exo_planets && (
                  <Skeleton
                    animation="wave"
                    height={300}
                    variant="rect"
                    style={{ marginTop: 0 }}
                  />
                )}
                {exo_planets && (
                  <VegaLiteWrapper
                    spec={{
                      vconcat: [
                        {
                          mark: { type: "area" },
                          data: { name: "table" },
                          encoding: {
                            x: {
                              field: "pl_publ_date",
                              type: "temporal",
                              title: null,
                              scale: { domain: { selection: "sel33" } },
                            },
                            y: { type: "quantitative", aggregate: "count" },
                          },
                          width: "container",
                        },
                        {
                          mark: { type: "area" },
                          data: { name: "table" },
                          encoding: {
                            x: {
                              field: "pl_publ_date",
                              type: "temporal",
                              title: null,
                            },
                            y: { type: "quantitative", aggregate: "count" },
                          },
                          width: "container",
                          selection: {
                            sel33: {
                              type: "interval",
                              encodings: ["x"],
                              init: {
                                x: [
                                  new Date().getTime() -
                                    10 * 365 * 24 * 60 * 60 * 1000,
                                  Date.now(),
                                ],
                              },
                            },
                          },
                          height: 60,
                        },
                      ],
                    }}
                    data={{
                      table: R.filter((d) => d.pl_publ_date !== null)(
                        exo_planets
                      ),
                    }}
                    style={{ width: "80%", padding: 0 }}
                    renderer="svg"
                    actions={false}
                  />
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Typography variant="h5" gutterBottom>
                How big and how long do planets take to orbit
              </Typography>
              <Typography variant="caption" gutterBottom>
                Features: Zoom & pan
              </Typography>

              <Paper>
                {!exo_planets && (
                  <Skeleton
                    animation="wave"
                    height={300}
                    variant="rect"
                    style={{ marginTop: 0 }}
                  />
                )}
                {exo_planets && (
                  <VegaLiteWrapper
                    spec={{
                      data: { name: "table" },
                      width: "container",
                      mark: { type: "circle" },
                      selection: { sel9: { type: "interval", bind: "scales" } },
                      encoding: {
                        x: {
                          field: "pl_orbper",
                          type: "quantitative",
                          scale: { type: "log" },
                          title: "Orbit Time (days)",
                        },
                        y: {
                          field: "pl_bmassj",
                          type: "quantitative",
                          title: "Mass (1 = Jupyter)",
                        },
                        tooltip: [
                          { field: "pl_name", type: "nominal" },
                          { field: "pl_orbper", type: "nominal" },
                          { field: "pl_bmassj", type: "nominal" },
                          { field: "pl_discmethod", type: "nominal" },
                        ],
                        color: { field: "pl_discmethod", type: "nominal" },
                      },
                      height: 300,
                    }}
                    data={{
                      table: exo_planets,
                    }}
                    style={{ width: "95%", padding: 0 }}
                  />
                )}
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Container>
    </section>
  );
};

export default ExoPlanets;
