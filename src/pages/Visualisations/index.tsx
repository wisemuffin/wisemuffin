import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Store from "../../store/Store";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Search from "../../components/UI/Search";
import VisList from "../../components/VisList";
import { IVis } from "../../interfaces";

const visList: IVis[] = [
  {
    createdDate: `${new Date()}`,
    id: Math.trunc(Math.random() * 10000),
    mediaType: "video",
    media: {
      medium:
        "http://res.cloudinary.com/dkn8xtjbm/video/upload/v1557009747/ipo84yttye4dxxxijzke.mp4",
      original:
        "http://res.cloudinary.com/dkn8xtjbm/video/upload/v1557009747/ipo84yttye4dxxxijzke.mp4",
    },
    link: "/visualisations/earthquake",
    name: "Earthquakes",
    summary: "Visualisations on eathquake magnitude, frequency and location",
  },
  {
    createdDate: `${new Date()}`,
    id: Math.trunc(Math.random() * 10000),
    mediaType: "img",
    media: {
      medium:
        "http://res.cloudinary.com/dkn8xtjbm/image/upload/v1580243748/vugcn3xdvwyilslpbqn5.jpg",
      original:
        "http://res.cloudinary.com/dkn8xtjbm/image/upload/v1580243748/vugcn3xdvwyilslpbqn5.jpg",
    },
    link: "/visualisations/stocks",
    name: "Stocks",
    summary:
      "Using Yahoo's Financial Trading APIs to get insight into the US Stock markets.",
  },
  {
    createdDate: `${new Date()}`,
    id: Math.trunc(Math.random() * 10000),
    mediaType: "img",
    media: {
      medium:
        "https://res.cloudinary.com/dkn8xtjbm/image/upload/v1592263752/vegaExamples.jpg",
      original:
        "https://res.cloudinary.com/dkn8xtjbm/image/upload/v1592263752/vegaExamples.jpg",
    },
    link: "/visualisations/vegaexamples",
    name: "Vega Examples",
    summary: "Testing out Vega for data visualisation.",
  },
];

const Visualisations: React.FC = () => {
  const { state, dispatch } = React.useContext(Store);
  const [searchVis, setSearchVis] = React.useState("");

  const classes = useStyles();

  const filteredVisList =
    visList &&
    (visList.length === 0
      ? visList
      : visList.filter((vis) => {
          return vis.name.toLowerCase().indexOf(searchVis.toLowerCase()) !== -1;
        }));

  return (
    <section>
      <Container maxWidth="lg" className={classes.container}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Visualisation Gallery
        </Typography>
        <Box mb={3}>
          <Grid container spacing={5} justify="center">
            <Grid item>
              <Search
                onSubmit={setSearchVis}
                placeholder="Search Visualisation"
              />
            </Grid>
          </Grid>
        </Box>
        <VisList visualisations={filteredVisList} store={{ state, dispatch }} />
      </Container>
    </section>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default Visualisations;
