import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Checkbox,
  Collapse,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Checked } from "../FilterProduct";

export default function ProductCategory({
  isExpand,
  onExpand,
  checked,
  onChecked,
}: {
  isExpand: boolean;
  onExpand: (expName: string) => void;
  checked: { shoes: boolean; clothing: boolean; accessories: boolean };
  onChecked: (name: Checked, value: boolean) => void;
}) {
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={() => onExpand("category")}>
          <ListItemText
            primaryTypographyProps={{ fontWeight: 600, fontSize: "14px" }}
            primary="PRODUCT CATEGORY"
          />
          {isExpand ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={isExpand} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem>
            <FormControlLabel
              label="Clothing"
              control={
                <Checkbox
                  color="default"
                  checked={checked.clothing}
                  onChange={(e) => onChecked("clothing", e.target.checked)}
                />
              }
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              label="Shoes"
              control={
                <Checkbox
                  color="default"
                  checked={checked.shoes}
                  onChange={(e) => onChecked("shoes", e.target.checked)}
                />
              }
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              label="Accessories"
              control={
                <Checkbox
                  color="default"
                  checked={checked.accessories}
                  onChange={(e) => onChecked("accessories", e.target.checked)}
                />
              }
            />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}
