import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { ApolloProvider } from "@apollo/client";
import { Security, LoginCallback, SecureRoute } from "@okta/okta-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import client from "./graphql/client";
import Layout from "./components/UI/Layout";
import "./App.css";
import StoreProvider from "./store/StoreProvider";
import ThemeProvider from "./hooks/ThemeProvider";

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
import GAListener from "./hooks/GAListener";
import ExoPlanets from "./pages/Visualisations/ExoPlanets";
import GraphqlTest from "./pages/Visualisations/GraphqlTest";

const CALLBACK_PATH = "/implicit/callback";

const config = {
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  issuer: `${process.env.REACT_APP_OKTA_DOMAIN}/oauth2/default`,
  redirectUri: `${process.env.REACT_APP_HOST}${process.env.REACT_APP_OKTA_CALLBACK}`,
  scopes: ["openid", "profile", "email"],
  pkce: true,
};

toast.configure();
const App: React.FC = () => {
  return (
    <StoreProvider>
      <ApolloProvider client={client}>
        <ThemeProvider>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Router>
              <Security {...config}>
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
                      <Route
                        exact
                        path="/visualisations/graphqlTest"
                        component={GraphqlTest}
                      />
                      <SecureRoute
                        exact
                        path="/visualisations/graphqlTestSecure"
                        component={GraphqlTest}
                      />
                      <Route path={CALLBACK_PATH} component={LoginCallback} />
                    </Switch>
                  </Layout>
                </GAListener>
              </Security>
            </Router>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </ApolloProvider>
    </StoreProvider>
  );
};

export default App;
