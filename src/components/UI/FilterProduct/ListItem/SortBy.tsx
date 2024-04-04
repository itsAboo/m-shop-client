import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export default function SortBy({
  isExpand,
  onExpand,
  onClick,
}: {
  isExpand: boolean;
  onExpand: (expName: string) => void;
  onClick: (sort: string) => void;
}) {
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={() => onExpand("sortBy")}>
          <ListItemText
            primaryTypographyProps={{ fontWeight: 600, fontSize: "14px" }}
            primary="SORT BY"
          />
          {isExpand ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={isExpand} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton>
            <ListItemText
              onClick={() => onClick("asc")}
              primary="PRICE (LOW-HIGH)"
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemText onClick={() => onClick("newest")} primary="NEWEST" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText
              onClick={() => onClick("desc")}
              primary="PRICE (HIGH-LOW)"
            />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
}
