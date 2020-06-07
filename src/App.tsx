import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import ContextProvider from "./storeContext/ContextProvider";
import ThemeProvider from "./hooks/ThemeProvider";
import "./App.css";

import Home from "./pages/Home";
import TvEpisodes from "./pages/TvEpisodes";

function App(): JSX.Element {
  return (
    <ContextProvider>
      <ThemeProvider>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/tvepisodes" component={TvEpisodes} />
          </Switch>
        </Router>
      </ThemeProvider>
    </ContextProvider>
  );
}

export default App;
