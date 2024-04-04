import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

interface IMobileHeaderListItem {
  title?: string;
  onExpand?: () => void;
  isExpand?: boolean;
  list?: string[];
  onNavigate?: () => void;
}

export default function MobileHeaderListItem({
  title,
  isExpand,
  onExpand,
  list,
  onNavigate,
}: IMobileHeaderListItem) {
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={onExpand}>
          <ListItemText
            primaryTypographyProps={{ fontWeight: 600, fontSize: "14px" }}
            primary={title}
          />
          {isExpand ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={isExpand} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {list?.map((l) => (
            <ListItemButton onClick={onNavigate} key={l}>
              <ListItemText primary={l} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
}
