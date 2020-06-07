import React, { useState, useContext, Fragment } from "react";
import history from "../../../history";
import Context from "../../../storeContext/Context";
// import { withStyles } from "@material-ui/core/styles";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import IconButton from "@material-ui/core/IconButton";
import BugReport from "@material-ui/icons/BugReport";
import Timeline from "@material-ui/icons/Timeline";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";

import CssBaseline from "@material-ui/core/CssBaseline";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

// import SearchIcon from "@material-ui/icons/Search";
// import InputBase from "@material-ui/core/InputBase";
// import Badge from "@material-ui/core/Badge";
// import MoreIcon from "@material-ui/icons/MoreVert";
// import MailIcon from "@material-ui/icons/Mail";
// import NotificationsIcon from "@material-ui/icons/Notifications";
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
import WbSunny from "@material-ui/icons/WbSunny";
import WbSunnyOutlined from "@material-ui/icons/WbSunnyOutlined";

import { fade } from "@material-ui/core/styles/colorManipulator";

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    "justify-content": "start",
  },
  title: {
    flexGrow: 1,
  },
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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

const drawerWidth = 240;

const NavBar = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { state, dispatch } = useContext(Context);
  const { showNav } = state;

  const handleDrawerOpen = () => {
    dispatch({
      type: "SHOW_NAV",
      payload: true,
    });
  };

  const handleDrawerClose = () => {
    dispatch({
      type: "SHOW_NAV",
      payload: false,
    });
  };

  const handleToggleDarkTheme = (event) => {
    console.log("clicked dark theme");
    dispatch({ type: "TOGGLE_DARK_THEME", payload: event });
  };

  const handleWeeklyReportType = (event) => {
    dispatch({ type: "WEEKLY_REPORT_SELECTED", payload: event });
    history.push(`/WeeklyReports`);
  };

  const handleDrillDown = (metric, e) => {
    // e.preventDefault();
    dispatch({
      type: "DRILL_DOWN_METRIC",
      payload: null,
    });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        className={clsx(classes.appBar, {
          [classes.appBarShift]: showNav,
        })}
      >
        <Toolbar className={classes.toolbar}>
          {/* <div className={classes.grow} /> */}
          <IconButton
            color="inherit"
            edge="start"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, showNav && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <Grid container spacing={1}>
            <Grid item>
              <Typography variant="h6" className={classes.title}>
                <Link className={classes.link} to="/" onClick={handleDrillDown}>
                  Odin
                </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" href="/about">
                About
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleWeeklyReportType("neoWeekly")}
              >
                NEO Consol
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" href="/example">
                Example
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" href="/exampleVega">
                Example Vega
              </Button>
            </Grid>
          </Grid>

          <IconButton onClick={handleToggleDarkTheme} color="inherit">
            {state.dark ? <WbSunny /> : <WbSunnyOutlined />}
          </IconButton>
          <IconButton
            color="inherit"
            edge="start"
            aria-label="Report an Issue"
            href="/raiseIssue"
            // onClick={() => console.log("TODO add side menu")}
          >
            <BugReport />
          </IconButton>
          <IconButton
            color="inherit"
            edge="start"
            aria-label="Timeline - what are we working on"
            href="/pipeline"
            // onClick={() => console.log("TODO add side menu")}
          >
            <Timeline />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={showNav}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[
            { name: "About", link: "/about" },
            { name: "Metrics", link: "/metrics" },

            { name: "Example", link: "/example" },
            { name: "ExampleVega", link: "/exampleVega" },
          ].map((navItem, index) => {
            return (
              <ListItem
                button
                key={navItem.name}
                component={Link}
                to={navItem.link}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={navItem.name} />
              </ListItem>
            );
          })}
        </List>

        <Divider />
        <List>
          <ListItem button onClick={() => handleWeeklyReportType("csaWeekly")}>
            <ListItemText primary={"CSA Exceed"} />
          </ListItem>
          <ListItem button onClick={() => handleWeeklyReportType("fldWeekly")}>
            <ListItemText primary={"FLD Scorecard"} />
          </ListItem>
          <ListItem button onClick={() => handleWeeklyReportType("ccWeekly")}>
            <ListItemText primary={"CC Weekly"} />
          </ListItem>
          <ListItem button onClick={() => handleWeeklyReportType("neoWeekly")}>
            <ListItemText primary={"NEO Consol"} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default NavBar;
