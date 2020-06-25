import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

const Search = ({ placeholder = "Search", onSubmit }) => {
  const classes = useStyles();
  const [searchState, setSearchState] = useState();

  const updateSearch = (e) => {
    setSearchState(e.target.value.substr(0, 20));
    e.preventDefault();
  };
  const handleSubmit = (e) => {
    onSubmit(searchState);
    e.preventDefault();
  };

  return (
    <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
      {/* <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton> */}
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        value={searchState}
        onChange={updateSearch}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default Search;
