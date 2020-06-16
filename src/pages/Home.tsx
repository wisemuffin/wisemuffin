import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const Home: React.FC = (props) => {
  const classes = useStyles();
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
          Visualisations
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
              component={RouterLink}
              to="/chartlib"
              variant="outlined"
              color="primary"
            >
              Vis Library
            </Button>
          </Grid>
        </Grid>
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
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default Home;
