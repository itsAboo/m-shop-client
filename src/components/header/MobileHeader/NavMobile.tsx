import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import classes from "./NavMobile.module.css";
import MobileHeaderListItem from "./MobileHeaderListItem";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const list = {
  men: ["New Arrivals", "All Men's", "Shoes", "Clothing", "Accessories"],
  women: ["New Arrivals", "All Women's", "Shoes", "Clothing", "Accessories"],
  kids: ["New Arrivals", "All Kids", "Shoes", "Clothing", "Accessories"],
  sport: ["Football", "Running", "Basketball", "Training", "Golf", "Outdoor"],
};

interface INavMobile {
  className?: string;
  open?: boolean;
  onClose: () => void;
  boxCl?: string;
}

type TItemExpand = "men" | "women" | "kids" | "sport";
export default function NavMobile(props: INavMobile) {
  const [listItemExpand, setListItemExpand] = useState({
    men: false,
    women: false,
    kids: false,
    sport: false,
  });
  const navigate = useNavigate();
  const handleExpand = (name: TItemExpand) => {
    setListItemExpand((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };
  const handleClickNavigate = () => {
    props.onClose();
    navigate("/products");
  };
  return (
    <Drawer
      open={props.open}
      className={`${props.className ? props.className : undefined}`}
      onClose={props.onClose}
    >
      <Box className={props.boxCl} role="presentation">
        <List>
          <div className={classes["list-header"]}>
            <h1>M</h1>
            <button onClick={props.onClose}>
              <CloseIcon />
            </button>
          </div>
          <Divider />
          <MobileHeaderListItem
            onNavigate={handleClickNavigate}
            onExpand={() => handleExpand("men")}
            title="MEN"
            isExpand={listItemExpand.men}
            list={list.men}
          />
          <MobileHeaderListItem
            onNavigate={handleClickNavigate}
            onExpand={() => handleExpand("women")}
            title="WOMEN"
            isExpand={listItemExpand.women}
            list={list.women}
          />
          <MobileHeaderListItem
            onNavigate={handleClickNavigate}
            onExpand={() => handleExpand("kids")}
            title="KIDS"
            isExpand={listItemExpand.kids}
            list={list.kids}
          />
          <MobileHeaderListItem
            onNavigate={handleClickNavigate}
            onExpand={() => handleExpand("sport")}
            title="SPORTS"
            isExpand={listItemExpand.sport}
            list={list.sport}
          />
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={handleClickNavigate}>
              <ListItemText primary="NEW ARRIVALS" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleClickNavigate}>
              <ListItemText primary="TRENDING" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
