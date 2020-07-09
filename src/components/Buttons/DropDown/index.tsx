import React, { useState, useRef } from "react";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import Button from "@material-ui/core/Button";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import CheckIcon from "@material-ui/icons/Check";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Paper from "@material-ui/core/Paper";

interface item {
  id: number;
  value: any;
}

interface IDropDownProps {
  title: string;
  items: item[];
  multiSelect?: boolean;
}

/*
TODO finish styles:
https://github.com/karlhadwen/react-dropdown-menu/blob/master/src/App.scss
*/

const Dropdown: React.FC<IDropDownProps> = ({
  title,
  items,
  multiSelect = false,
}) => {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState<item[]>([items[0]]);
  const toggle = () => setOpen((prevState) => !prevState);
  const ref = useRef<HTMLDivElement | null>(null);
  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => setOpen(false));

  function handleOnClick(item) {
    if (!selection.some((current) => current.id === item.id)) {
      if (!multiSelect) {
        setSelection([item]);
      } else if (multiSelect) {
        setSelection((preState) => [...preState, item]);
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        (current) => current.id !== item.id
      );
      setSelection([...selectionAfterRemoval]);
    }
  }

  function isItemInSelection(item) {
    if (selection.some((current) => current.id === item.id)) {
      return true;
    }
    return false;
  }

  return (
    <Paper ref={ref} style={{ display: "inline-block" }}>
      <Button
        variant="outlined"
        color="primary"
        style={{ display: "inline-block" }}
        onKeyPress={() => toggle()}
        onClick={() => toggle()}
      >
        {`${title}: ${selection[0].value}`}
        <ExpandMoreIcon />
      </Button>
      {open && (
        <MenuList>
          {items.map((item) => (
            <MenuItem key={item.id} onClick={() => handleOnClick(item)}>
              <span>{item.value}</span>
              <span>{isItemInSelection(item) && <CheckIcon />}</span>
            </MenuItem>
          ))}
        </MenuList>
      )}
    </Paper>
  );
};

export default Dropdown;
