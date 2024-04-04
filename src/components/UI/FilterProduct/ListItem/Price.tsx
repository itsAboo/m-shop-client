import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slider,
} from "@mui/material";

export default function Price({
  isExpand,
  onExpand,
  price,
  onPriceChange,
  min,
  max,
}: {
  isExpand: boolean;
  onExpand: (expName: string) => void;
  price: number[];
  onPriceChange: (_: Event, newValue: number | number[]) => void;
  min: number;
  max: number;
}) {
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={() => onExpand("price")}>
          <ListItemText
            primaryTypographyProps={{ fontWeight: 600, fontSize: "14px" }}
            primary="PRICE"
          />
          {isExpand ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={isExpand} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem style={{ display: "flex", justifyContent: "center" }}>
            <p>
              ฿{price[0]} - ฿{price[1]}
            </p>
          </ListItem>
          <ListItem>
            <Slider
              track={"normal"}
              step={100}
              valueLabelDisplay="auto"
              min={min}
              max={max}
              value={price}
              onChange={(_, newValue) => onPriceChange(_, newValue)}
            />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}
