import React, { useContext } from "react";
import history from "../../../history";
import Context from "../../../store/Store";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import IconButton from "@material-ui/core/IconButton";
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
import TvIcon from "@material-ui/icons/Tv";

import WbSunny from "@material-ui/icons/WbSunny";
import WbSunnyOutlined from "@material-ui/icons/WbSunnyOutlined";
import AssessmentIcon from "@material-ui/icons/Assessment";
import PieChartIcon from "@material-ui/icons/PieChart";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import BarChartIcon from "@material-ui/icons/BarChart";

const drawerWidth = 240;

const drawerItems = [
  { name: "Wisemuffin-charts", link: "/chartlib", icon: AssessmentIcon },
  { name: "TV Episodes", link: "/tvepisodes", icon: TvIcon },
  { name: "TV Fav", link: "/tvepisodesfav", icon: TvIcon },
];

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
                <Link className={classes.link} to="/">
                  Wisemuffin
                </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" className={classes.title}>
                <Button
                  className={classes.link}
                  href="http://docs.wisemuffin.com/"
                >
                  Docs
                </Button>
              </Typography>
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
          ></IconButton>
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
          {drawerItems.map((navItem, index) => {
            const TagName = navItem.icon;
            return (
              <ListItem
                button
                key={navItem.name}
                component={Link}
                to={navItem.link}
              >
                <ListItemIcon>
                  <navItem.icon />
                </ListItemIcon>
                <ListItemText primary={navItem.name} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
};

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

export default NavBar;
