import React, { useState } from "react";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";

import { getGamesForPlayer_getGamesForPlayer } from "../../../../../graphql/generated/getGamesForPlayer";

const initialPlayer: getGamesForPlayer_getGamesForPlayer = {
  ID: "",
  name: "",
  playerID: "",
  score: 0,
  __typename: "Player",
};

const AddDataDialog = ({
  addDataHandler,
}: {
  addDataHandler: (data: getGamesForPlayer_getGamesForPlayer) => void;
}) => {
  const [player, setPlayer] = useState(initialPlayer);
  const [open, setOpen] = React.useState(false);

  const [switchState, setSwitchState] = React.useState({
    addMultiple: false,
  });

  const handleSwitchChange = (name) => (event) => {
    setSwitchState({ ...switchState, [name]: event.target.checked });
  };

  const resetSwitch = () => {
    setSwitchState({ addMultiple: false });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetSwitch();
  };

  const handleAdd = async (event) => {
    await addDataHandler(player);
    setPlayer(initialPlayer);
    switchState.addMultiple ? setOpen(true) : setOpen(false);
  };

  const handleChange = (name) => ({ target: { value } }) => {
    setPlayer({ ...player, [name]: value });
  };

  return (
    <div style={{ display: "inline-block" }}>
      <Tooltip title="Add">
        <span>
          <IconButton aria-label="add" onClick={handleClickOpen}>
            <AddIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add player</DialogTitle>
        <DialogContent>
          <DialogContentText>Demo add item to react table.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="ID"
            type="text"
            fullWidth
            value={player.ID}
            onChange={handleChange("ID")}
          />
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={player.name}
            onChange={handleChange("name")}
          />
          <TextField
            margin="dense"
            label="Score"
            type="number"
            fullWidth
            value={player.score}
            onChange={handleChange("score")}
          />

          <TextField
            margin="dense"
            label="Player ID"
            type="text"
            fullWidth
            value={player.playerID}
            onChange={handleChange("playerID")}
          />
        </DialogContent>
        <DialogActions>
          <Tooltip title="Add multiple">
            <Switch
              checked={switchState.addMultiple}
              onChange={handleSwitchChange("addMultiple")}
              value="addMultiple"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          </Tooltip>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddDataDialog;
