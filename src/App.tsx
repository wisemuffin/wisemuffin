import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import TvShows from "./pages/Visualisations/TvShows";
import CanvasExamples from "./pages/Visualisations/CanvasExamples";
import GAListener from "./util/GAListener";
import ExoPlanets from "./pages/Visualisations/ExoPlanets";

const App: React.FC = () => {
  return (
    <StoreProvider>
      <ThemeProvider>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Router>
            <GAListener trackingId="UA-125075344-1">
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
                  <Route
                    exact
                    path="/visualisations/stocks"
                    component={Stocks}
                  />
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
                    path="/visualisations/tvshows"
                    component={TvShows}
                  />
                  <Route
                    exact
                    path="/visualisations/canvasExamples"
                    component={CanvasExamples}
                  />
                  <Route
                    exact
                    path="/visualisations/exoPlanets"
                    component={ExoPlanets}
                  />
                </Switch>
              </Layout>
            </GAListener>
          </Router>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;
