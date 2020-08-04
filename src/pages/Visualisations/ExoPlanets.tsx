import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import useFetch from "../../hooks/useFetch";
import * as R from "ramda";
import Alert from "@material-ui/lab/Alert";

const methodsDescriptions = [
  {
    name: "Transit",
    description: `When a planet passes directly between its star and an observer, it dims the star's light by a measurable amount.`,
  },
  {
    name: "Radial Velocity",
    description: `Orbiting planets cause stars to wobble in space, causing an observable shift in the color of the star's light.`,
  },
  {
    name: "Microlensing",
    description: `Light from a distant star is bent and focused by gravity as a planet passes between the star and Earth.`,
  },
  {
    name: "Imaging",
    description: `Astronomers can take pictures of exoplanets using techniques that remove the overwhelming glare of the stars they orbit`,
  },
];

const url_nasa_exoplanets =
  "https://exoplanets.nasa.gov/alien-worlds/ways-to-find-a-planet/";

const ExoPlanets = (props) => {
  const [exo_planets_by_method, setExo_planets_by_method] = React.useState();

  const exo_planets = useFetch(
    "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=exoplanets&format=json"
  );

  React.useEffect(() => {
    if (!exo_planets) return;

    const total_exo_planets = exo_planets.length;

    const exo_planets_by_method_trans = R.compose(
      R.map((arr) => ({
        pl_discmethod: arr[0],
        count_of_exo_planets: arr[1],
        ratio_of_exo_planets_to_total: arr[1] / total_exo_planets,
      })),
      R.toPairs,
      R.map(R.reduce((acc, curr) => acc + 1, 0)),
      R.groupBy(R.prop("pl_discmethod"))
    )(exo_planets);

    setExo_planets_by_method(exo_planets_by_method_trans);
  }, [exo_planets]);

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
        <Typography variant="h3">NASA's Exo planets</Typography>
        <Typography variant="caption">🚧 under construction 🚧</Typography>
        <Typography variant="caption">
          TODO sort by size, improve layout of acordians, add pics
        </Typography>
        <Alert severity="info">
          find out more at{" "}
          <span>
            <a href={url_nasa_exoplanets}>NASA Exoplanets</a>
          </span>
        </Alert>
        {exo_planets_by_method?.map((method) => (
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Grid container spacing={1}>
                <Grid item>
                  <Typography>{method.pl_discmethod}</Typography>
                </Grid>
                <Grid item>
                  <Typography>{method.count_of_exo_planets}</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {method.ratio_of_exo_planets_to_total.toFixed(2) * 100}%
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

        <p>{JSON.stringify(exo_planets_by_method)}</p>
      </Container>
    </section>
  );
};

export default ExoPlanets;
