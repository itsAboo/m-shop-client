import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import classes from "./AdminProduct.module.css";
import Button from "../components/UI/Button/Button";
import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../util/productApi";

export type ProductInputForm = {
  name: string;
  description?: string;
  imageUrl?: string;
  price: number;
  type?: "men" | "women";
  category?: "shoes" | "clothing" | "accessories";
  subCategory?: string;
  colors?: string;
};

export default function AdminProduct() {
  const [inputForm, setInputForm] = useState<ProductInputForm>({
    name: "",
    description: "",
    imageUrl: "",
    price: 0,
    type: "men",
    category: "shoes",
    subCategory: "",
    colors: "",
  });
  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
  });
  const handleInputChange =
    (name: keyof ProductInputForm) => (e: ChangeEvent<HTMLInputElement>) => {
      setInputForm((prevInput) => ({
        ...prevInput,
        [name]: e.target.value,
      }));
    };
  const handleSelectChange =
    (name: keyof ProductInputForm) => (e: SelectChangeEvent) => {
      setInputForm((prevInput) => ({ ...prevInput, [name]: e.target.value }));
    };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate({ inputForm });
  };
  return (
    <div className={classes.container}>
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit} className={classes.form}>
        <FormControl className={classes["form-control"]}>
          <TextField
            required
            value={inputForm.name}
            onChange={handleInputChange("name")}
            id="name"
            label="Name"
          />
        </FormControl>
        <FormControl className={classes["form-control"]}>
          <TextField
            value={inputForm.description}
            onChange={handleInputChange("description")}
            id="description"
            label="Description"
          />
        </FormControl>
        <FormControl className={classes["form-control"]}>
          <TextField
            value={inputForm.imageUrl}
            onChange={handleInputChange("imageUrl")}
            id="img-url"
            label="Image URL"
          />
        </FormControl>
        <FormControl className={classes["form-control"]}>
          <TextField
            required
            value={inputForm.price}
            onChange={handleInputChange("price")}
            id="price"
            label="Price"
            type="number"
          />
        </FormControl>
        <FormControl className={classes["form-control"]}>
          <InputLabel id="type">Type</InputLabel>
          <Select
            value={inputForm.type}
            onChange={handleSelectChange("type")}
            labelId="type"
            id="type-select"
            label="Type"
          >
            <MenuItem value="men">MEN</MenuItem>
            <MenuItem value="women">WOMEN</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes["form-control"]}>
          <InputLabel id="category">Type</InputLabel>
          <Select
            value={inputForm.category}
            onChange={handleSelectChange("category")}
            labelId="category"
            id="category-select"
            label="Category"
          >
            <MenuItem value="shoes">Shoes</MenuItem>
            <MenuItem value="clothing">Clothing</MenuItem>
            <MenuItem value="accessories">Accessories</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes["form-control"]}>
          <TextField
            value={inputForm.subCategory}
            onChange={handleInputChange("subCategory")}
            id="sub-category"
            label="Sub Category"
          />
        </FormControl>
        <FormControl className={classes["form-control"]}>
          <TextField
            value={inputForm.colors}
            onChange={handleInputChange("colors")}
            id="colors"
            label="Colors"
          />
        </FormControl>
        <Button className={classes.btn}>
          {isPending ? <CircularProgress size="32px" /> : "Add Product"}
        </Button>
      </form>
    </div>
  );
}
