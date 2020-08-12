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
    createdDate: `${new Date("2020-08-12")}`,
    id: Math.trunc(Math.random() * 10000),
    mediaType: "img",
    media: {
      medium:
        "https://res.cloudinary.com/dkn8xtjbm/image/upload/v1597230942/Nasa/NASA-Logo.png",
      original:
        "https://res.cloudinary.com/dkn8xtjbm/image/upload/v1597230942/Nasa/NASA-Logo.png",
    },
    link: "/visualisations/exoPlanets",
    name: "Exoplanets",
    summary: "Explore exoplants from NASA's API",
  },
  {
    createdDate: `${new Date("2020-07-11")}`,
    id: Math.trunc(Math.random() * 10000),
    mediaType: "video",
    media: {
      medium:
        "https://res.cloudinary.com/dkn8xtjbm/video/upload/v1594072662/2020-07-07_07-56-50.mp4",
      original:
        "https://res.cloudinary.com/dkn8xtjbm/video/upload/v1594072662/2020-07-07_07-56-50.mp4",
    },
    link: "/visualisations/realTimeExamples",
    name: "Realtime Examples",
    summary: "Testing realtime graphing with websockets",
  },
  {
    createdDate: `${new Date("2020-04-24")}`,
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
    createdDate: `${new Date("2020-03-15")}`,
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
    createdDate: `${new Date("2020-02-20")}`,
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
  {
    createdDate: `${new Date("2020-01-05")}`,
    id: Math.trunc(Math.random() * 10000),
    mediaType: "img",
    media: {
      medium:
        "https://res.cloudinary.com/dkn8xtjbm/image/upload/v1594418663/TvShows.jpg",
      original:
        "https://res.cloudinary.com/dkn8xtjbm/image/upload/v1594418663/TvShows.jpg",
    },
    link: "/visualisations/tvshows",
    name: "Tv Shows",
    summary: "Building out episode cards with like button",
  },
  {
    createdDate: `${new Date("2020-01-05")}`,
    id: Math.trunc(Math.random() * 10000),
    mediaType: "img",
    media: {
      medium:
        "https://res.cloudinary.com/dkn8xtjbm/image/upload/v1555039455/sample.jpg",
      original:
        "https://res.cloudinary.com/dkn8xtjbm/image/upload/v1555039455/sample.jpg",
    },
    link: "/visualisations/canvasExamples",
    name: "Canvas Exampes",
    summary: "🚧 Under Construction 🚧 ",
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
    <section style={{ marginTop: "15px" }}>
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
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Search
                onChange={setSearchVis}
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
