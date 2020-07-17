import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TvEpisodesHome from "../../components/TvEpisodeViews/TvEpisodesHome";
import TvEpisodesFav from "../../components/TvEpisodeViews/TvEpisodesFav";

const TvEpisodes: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <section style={{ marginTop: "15px" }}>
      <Paper style={{ position: "sticky", bottom: "0" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Tv Episode Home" />
          <Tab label="Tv Episode Favourite" />
        </Tabs>
      </Paper>

      {value === 0 && <TvEpisodesHome />}
      {value === 1 && <TvEpisodesFav />}
    </section>
  );
};

export default TvEpisodes;
