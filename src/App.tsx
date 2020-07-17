import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import StoreProvider from "./store/StoreProvider";
import ThemeProvider from "./hooks/ThemeProvider";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Layout from "./components/UI/Layout";
import "./App.css";

import Home from "./pages/Home";
import About from "./pages/About";
import ChartLib from "./pages/ChartLib";
import Visualisations from "./pages/Visualisations";
import VegaExamples from "./pages/Visualisations/VegaExamples";
import Stocks from "./pages/Visualisations/Stocks";
import Earthquake from "./pages/Visualisations/Earthquake";
import RealTimeExamples from "./pages/Visualisations/RealTimeExamples";
import TvEpisodes from "./pages/Visualisations/TvEpisodes";

const App: React.FC = () => {
  return (
    <StoreProvider>
      <ThemeProvider>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Router history={history}>
            <Layout>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/chartlib" component={ChartLib} />
                <Route
                  exact
                  path="/visualisations"
                  component={Visualisations}
                />
                <Route
                  exact
                  path="/visualisations/vegaExamples"
                  component={VegaExamples}
                />
                <Route exact path="/visualisations/stocks" component={Stocks} />
                <Route
                  exact
                  path="/visualisations/earthquake"
                  component={Earthquake}
                />
                <Route
                  exact
                  path="/visualisations/realTimeExamples"
                  component={RealTimeExamples}
                />
                <Route
                  exact
                  path="/visualisations/tvepisodes"
                  component={TvEpisodes}
                />
              </Switch>
            </Layout>
          </Router>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;
