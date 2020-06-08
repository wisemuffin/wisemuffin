import React, { useContext } from "react";

import {
  MuiThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";
// import { red, green, white, grey } from "@material-ui/core/colors";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import white from "@material-ui/core/colors/blueGrey";
import grey from "@material-ui/core/colors/grey";
import teal from "@material-ui/core/colors/teal";
import indigo from "@material-ui/core/colors/indigo";
import deepOrange from "@material-ui/core/colors/deepOrange";

import Store from "../store/Store";

const theme = {
  palette: {
    warning: {
      light: red[300],
      main: red[500],
      dark: red[700],
    },
    primary: {
      light: red[300],
      main: "#006AAE",
      dark: "#27214D",
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
    fld: {
      light: teal[300],
      main: teal[500],
      dark: teal[700],
    },
    cc: {
      light: indigo[300],
      main: indigo[500],
      dark: indigo[700],
    },
    csa: {
      light: deepOrange[300],
      main: deepOrange[500],
      dark: deepOrange[700],
    },
    white: white,
    grey: grey,
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
    fontSize: 16,
  },
};

const ThemeProvider = (props) => {
  const { state } = useContext(Store);

  return (
    <MuiThemeProvider
      theme={responsiveFontSizes(
        createMuiTheme({
          ...theme,
          palette: {
            ...theme.palette,
            type: state.dark ? "dark" : "light",
          },
        })
      )}
    >
      {props.children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
