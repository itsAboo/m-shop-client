import { Drawer } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import classes from "./FilterProduct.module.css";
import { useState } from "react";
import SortBy from "./ListItem/SortBy";
import ListHeader from "./ListItem/ListHeader";
import ProductCategory from "./ListItem/ProductCategory";
import ColorListItem from "./ListItem/ColorListItem";
import Price from "./ListItem/Price";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

type FilterProductProps = {
  open: boolean;
  toggle: (newOpen: boolean) => void;
};

type FilterList = "sortBy" | "category" | "color" | "price";

export type Checked = "shoes" | "clothing" | "accessories";

export type Color = "white" | "black" | "blue" | "green" | "red" | "yellow";

const colors = ["white", "black", "blue", "green", "red", "yellow"];
const hexColors = [
  "#ffffff",
  "#000000",
  "#001aff",
  "#00ff00",
  "#ff0000",
  "#fbff00",
];
const colorOptions = colors.map((color, index) => {
  return {
    color,
    hex: hexColors[index],
  };
});

export default function FilterProduct({ open, toggle }: FilterProductProps) {
  const [filter, setFilter] = useState<{
    category: string[];
    colors: string[];
    price: number[];
  }>({
    category: [],
    colors: [],
    price: [0, 20000],
  });
  const [listItemExpand, setListItemExpand] = useState({
    sortBy: true,
    category: false,
    color: false,
    price: false,
  });
  const [checked, setChecked] = useState({
    shoes: false,
    clothing: false,
    accessories: false,
  });
  const [price, setPrice] = useState<number[]>([0, 20000]);
  const [colorPicked, setColorPicked] = useState<Color[] | null>(null);
  const navigate = useNavigate();
  const handleExpand = (name: FilterList) => {
    setListItemExpand((prevList) => ({ ...prevList, [name]: !prevList[name] }));
  };
  const handleChecked = (name: Checked, value: boolean) => {
    setChecked((prevCheck) => ({ ...prevCheck, [name]: value }));
    setFilter((prevFilter) => {
      if (prevFilter.category.includes(name)) {
        return {
          ...prevFilter,
          category: [...prevFilter.category.filter((cat) => cat !== name)],
        };
      }
      return { ...prevFilter, category: [...prevFilter.category, name] };
    });
  };
  const handlePickColor = (color: Color) => {
    setColorPicked((prevColor) => {
      if (prevColor === null) {
        return [color];
      }
      if (prevColor.includes(color)) {
        return prevColor.filter((col) => col !== color);
      }
      return [...prevColor, color];
    });
    setFilter((prevFilter) => {
      if (prevFilter.colors.includes(color)) {
        return {
          ...prevFilter,
          colors: prevFilter.colors.filter((col) => col !== color),
        };
      }
      return { ...prevFilter, colors: [...prevFilter.colors, color] };
    });
  };
  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    setPrice(newValue as number[]);
    setFilter((prevFilter) => {
      return { ...prevFilter, price: newValue as number[] };
    });
  };
  const handleSubmit = (sort: string | null) => {
    let path = `/products?sort=${sort || "newest"}`;
    let query = "";
    if (filter.category.length > 0) {
      query += `&category=${filter.category.join(",")}`;
    }
    if (filter.colors.length > 0) {
      query += `&colors=${filter.colors.join(",")}`;
    }
    if (filter.price) {
      query += `&min=${filter.price[0]}&max=${filter.price[1]}`;
    }
    path += query.replace(" ", "&");
    toggle(false);
    navigate(path);
  };
  const handleClear = () => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      category: [],
      colors: [],
      price: [0, 20000],
    }));
    setChecked((prevChecked) => ({
      ...prevChecked,
      shoes: false,
      accessories: false,
      clothing: false,
    }));
    setColorPicked([]);
    setPrice([0, 20000]);
  };
  return (
    <Drawer
      className={classes.drawer}
      open={open}
      anchor="right"
      onClose={() => toggle(false)}
    >
      <Box className={classes.box} role="presentation">
        <List>
          <ListHeader onClear={handleClear} toggle={() => toggle(false)} />
          <Divider />
          <SortBy
            onClick={handleSubmit}
            isExpand={listItemExpand.sortBy}
            onExpand={handleExpand.bind(null, "sortBy")}
          />
          <Divider />
          <ProductCategory
            checked={checked}
            onChecked={(name, value) => handleChecked(name, value)}
            isExpand={listItemExpand.category}
            onExpand={handleExpand.bind(null, "category")}
          />
          <Divider />
          <ColorListItem
            colorOptions={colorOptions}
            colorPicked={colorPicked}
            isExpand={listItemExpand.color}
            onExpand={handleExpand.bind(null, "color")}
            onPickedColor={(color) => handlePickColor(color)}
          />
          <Divider />
          <Price
            isExpand={listItemExpand.price}
            onExpand={handleExpand.bind(null, "price")}
            min={0}
            max={20000}
            price={price}
            onPriceChange={handlePriceChange}
          />
          <Button onClick={() => handleSubmit(null)} className={classes.btn}>
            Submit
          </Button>
        </List>
      </Box>
    </Drawer>
  );
}
