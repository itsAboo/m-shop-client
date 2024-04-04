import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import classes from "./ColorListItem.module.css";
import CheckIcon from "@mui/icons-material/Check";
import { Color } from "../FilterProduct";

const hexColors = [
  "#ffffff",
  "#000000",
  "#001aff",
  "#00ff00",
  "#ff0000",
  "#fbff00",
];

export default function ColorListItem({
  isExpand,
  onExpand,
  colorOptions,
  colorPicked,
  onPickedColor,
}: {
  isExpand: boolean;
  onExpand: (expName: string) => void;
  colorOptions: { hex: string; color: string }[];
  colorPicked: Color[] | null;
  onPickedColor: (color: Color) => void;
}) {
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={() => onExpand("color")}>
          <ListItemText
            primaryTypographyProps={{ fontWeight: 600, fontSize: "14px" }}
            primary="COLOR"
          />
          {isExpand ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={isExpand} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem>
            {colorOptions.map((colorOption, index) => (
              <div
                onClick={() => onPickedColor(colorOption.color as Color)}
                className={classes.color}
                key={colorOption.hex}
                style={{
                  backgroundColor: hexColors[index],
                  border: index === 0 ? "1px solid black" : "none",
                }}
              >
                {colorPicked?.includes(colorOption.color as Color) ? (
                  <CheckIcon
                    style={{
                      color: colorOption.color === "black" ? "white" : "black",
                    }}
                  />
                ) : null}
              </div>
            ))}
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}
