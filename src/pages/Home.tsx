import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import RealTimeExampleHome from "../components/Charts/Containers/RealTimeExampleHome";
import ReactGa from "react-ga";

const Home: React.FC = (props) => {
  let history = useHistory();
  const classes = useStyles();

  const vizLibClickHandler = () => {
    ReactGa.event({ category: "Button", action: "Click Vis Library" });
    history.push(`/chartlib`);
  };

  return (
    <main className={classes.content}>
      <Container maxWidth="lg" className={classes.container}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Home
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Explore my gallery of visualisations i have built with a range of
          visualisation tools.
        </Typography>
        {/* <PacmanLoader
              size="60"
              color="#6b5ce7"
              css={{ width: "260px !important", height: "130px !important" }}
            /> */}
        <Grid container spacing={1} justify="center" alignContent="center">
          <Grid item>
            <Button
              component={RouterLink}
              to="/visualisations"
              variant="contained"
              color="primary"
            >
              Visualisations
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              onClick={vizLibClickHandler}
            >
              Vis Library
            </Button>
          </Grid>
        </Grid>
        <RealTimeExampleHome />
      </Container>
    </main>
  );
};

const useStyles = makeStyles((theme) => ({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  tableTitle: {
    fontSize: 14,
  },
  tablePos: {
    marginBottom: 12,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    overflow: "auto",
    marginTop: "15px",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default Home;
