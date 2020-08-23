import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TvEpisodesHome from "../../components/TvEpisodeViews/TvEpisodesHome";
import TvEpisodesFav from "../../components/TvEpisodeViews/TvEpisodesFav";
import Search from "../../components/UI/Search";
import { fetchShows } from "../../Actions";
import { IShow } from "../../types/interfaces";
import ShowCard from "../../components/ShowCard";
import Store from "../../store/Store";
import { BehaviorSubject, from } from "rxjs";
import {
  filter,
  debounceTime,
  distinctUntilChanged,
  mergeMap,
} from "rxjs/operators";
import useObservable from "../../hooks/useObservable";

let searchSubject = new BehaviorSubject("");

let searchResultObservable = searchSubject.pipe(
  filter((val) => val.length > 1),
  debounceTime(750),
  distinctUntilChanged(),
  mergeMap((val) => from(fetchShows(val)))
);

const TvShows: React.FC = () => {
  const { state, dispatch } = React.useContext(Store);
  const [value, setValue] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [showResults, setShowResults] = React.useState<IShow[]>([]);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useObservable(searchResultObservable, setShowResults);

  const handleSearchChange = (val) => {
    setSearch(val);
    searchSubject.next(val);
  };

  return (
    <section style={{ marginTop: "15px" }}>
      <Paper style={{ position: "sticky", bottom: "0" }}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Tv Episode Home" />
          <Tab label="Tv Episode Favourite" />
        </Tabs>
      </Paper>
      <Typography variant="h1" align="center" gutterBottom>
        Tv Shows{" "}
        <span role="img" aria-label="tv emoji">
          📺
        </span>{" "}
      </Typography>
      <Box mb={3}>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Search onChange={handleSearchChange} placeholder="Search Shows" />
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        {showResults.length > 0 &&
          showResults.map(({ show, score }) => {
            return (
              <Grid item lg={2} xl={1}>
                <ShowCard show={show} score={score} />
              </Grid>
            );
          })}
      </Grid>

      {value === 0 && <TvEpisodesHome />}
      {value === 1 && <TvEpisodesFav />}
    </section>
  );
};

export default TvShows;
