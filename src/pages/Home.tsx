import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

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
          Latest News
        </Typography>
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
