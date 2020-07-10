import React, { useState, useRef, useEffect } from "react";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import Button from "@material-ui/core/Button";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import CheckIcon from "@material-ui/icons/Check";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Paper from "@material-ui/core/Paper";

interface IDropDownItem {
  id: number;
  display: string;
  value: number;
}

interface IDropDownProps {
  title: string;
  items: IDropDownItem[];
  multiSelect?: boolean;
  onChangeHandler?: React.Dispatch<React.SetStateAction<IDropDownItem[]>>;
  defaulltItem?: number;
}

/**
 * Single Drop down select
 *
 * @TODO multi select
 * @TODO IDropDownItem use typescript generics for more flexability
 */
const Dropdown = ({
  title,
  items,
  multiSelect = false,
  onChangeHandler, // pass state to parent
  defaulltItem = 0,
}: IDropDownProps) => {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState<IDropDownItem[]>([
    items[defaulltItem],
  ]);
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

  useEffect(() => {
    onChangeHandler && onChangeHandler(selection);
  }, [selection]);

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
        {`${title}: ${selection[0].display}`}
        <ExpandMoreIcon />
      </Button>
      {open && (
        <MenuList>
          {items.map((item) => (
            <MenuItem key={item.id} onClick={() => handleOnClick(item)}>
              <span>{item.display}</span>
              <span>{isItemInSelection(item) && <CheckIcon />}</span>
            </MenuItem>
          ))}
        </MenuList>
      )}
    </Paper>
  );
};

export default Dropdown;
