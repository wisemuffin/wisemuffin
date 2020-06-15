import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import StoreProvider from "./store/StoreProvider";
import ThemeProvider from "./hooks/ThemeProvider";
import Layout from "./components/UI/Layout";
import "./App.css";

import Home from "./pages/Home";
import TvEpisodes from "./pages/TvEpisodes";
import TvEpisodesFav from "./pages/TvEpisodesFav";
import ChartLib from "./pages/ChartLib";
import Visualisations from "./pages/Visualisations";
import VegaExamples from "./pages/Visualisations/VegaExamples";

const App: React.FC = () => {
  return (
    <StoreProvider>
      <ThemeProvider>
        <Router history={history}>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/tvepisodes" component={TvEpisodes} />
              <Route exact path="/tvepisodesfav" component={TvEpisodesFav} />
              <Route exact path="/chartlib" component={ChartLib} />
              <Route exact path="/visualisations" component={Visualisations} />
              <Route
                exact
                path="/visualisations/vegaExamples"
                component={VegaExamples}
              />
            </Switch>
          </Layout>
        </Router>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;
