import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import ContextProvider from "./storeContext/ContextProvider";
import ThemeProvider from "./hooks/ThemeProvider";
import Layout from "./components/UI/Layout";
import "./App.css";

import Home from "./pages/Home";
import TvEpisodes from "./pages/TvEpisodes";
import TvEpisodesFav from "./pages/TvEpisodesFav";

function App(): JSX.Element {
  return (
    <ContextProvider>
      <ThemeProvider>
        <Router history={history}>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/tvepisodes" component={TvEpisodes} />
              <Route exact path="/tvepisodesfav" component={TvEpisodesFav} />
            </Switch>
          </Layout>
        </Router>
      </ThemeProvider>
    </ContextProvider>
  );
}

export default App;
