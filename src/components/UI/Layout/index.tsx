import React, { useState, useContext } from "react";
import Context from "../../../storeContext/Context";
import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";

import Nav from "../Nav";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    marginTop: 64,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  const { state } = useContext(Context);
  const { showNav } = state;

  return (
    <div className={classes.root}>
      <Nav />
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: showNav,
        })}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
