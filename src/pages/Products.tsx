import { useState } from "react";
import Button from "../components/UI/Button/Button";
import FilterProduct from "../components/UI/FilterProduct/FilterProduct";
import ShopCard from "../components/UI/ShopCard/ShopCard";
import classes from "./styles/Products.module.css";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Skeleton } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../util/productApi";
import { useQuery } from "@tanstack/react-query";
import FilterListIcon from "@mui/icons-material/FilterList";

const pd = [1, 2, 3, 4, 5, 6, 7, 8];

let skeleton = pd.map((e) => (
  <Skeleton key={e}>
    <ShopCard path="/" className={classes.card} />
  </Skeleton>
));

export default function Products() {
  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const { data: products, isLoading } = useQuery({
    queryKey: ["product", Object.fromEntries(searchParams)],
    queryFn: ({ signal }) =>
      getProducts({ signal, query: Object.fromEntries(searchParams) }),
  });
  const toggleFilter = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  return (
    <div className={classes.container}>
      <h1>All Product</h1>
      <div className={`${classes.flex} ${classes["top-bar"]}`}>
        <p>Products</p>
        <Button
          onClick={() => toggleFilter(true)}
          className={classes.btn}
          outlined
        >
          Sort By
          <span>
            <FilterAltIcon />
          </span>
        </Button>
        <button
          onClick={() => toggleFilter(true)}
          className={classes["mobile-filter-btn"]}
        >
          <FilterListIcon />
        </button>
      </div>
      <div className={classes["card-container"]}>
        {isLoading ? (
          skeleton
        ) : products?.length! > 0 ? (
          products?.map((product) => (
            <ShopCard
              key={product.productId}
              className={classes.card}
              title={product?.name}
              price={product?.price}
              category={product?.subCategory}
              colors={product?.colors?.split(",").length}
              imageUrl={product?.imageUrl}
              path={`/product/${product.productId}`}
              productId={product?.productId}
            />
          ))
        ) : (
          <h1>No Product</h1>
        )}
      </div>
      <FilterProduct toggle={toggleFilter} open={open} />
    </div>
  );
}
