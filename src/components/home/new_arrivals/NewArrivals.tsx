import { Link } from "react-router-dom";
import classes from "./NewArrivals.module.css";
import ShopCard from "../../UI/ShopCard/ShopCard";
import { useQuery } from "@tanstack/react-query";
import { getProductNewest } from "../../../util/productApi";

export default function NewArrivals() {
  const { data: products, isPending } = useQuery({
    queryKey: ["newest-product"],
    queryFn: ({ signal }) => getProductNewest({ signal, limit: 4 }),
  });
  return (
    <section className={classes.container}>
      <div className={classes["layout-container"]}>
        <div className={classes.header}>
          <h1>NEW ARRIVALS</h1>
          <Link to="/products">
            <p>VIEW ALL</p>
          </Link>
        </div>
        <div className={classes["card-container"]}>
          {isPending ? (
            <p>Loading...</p>
          ) : (
            products?.map((prod) => (
              <ShopCard
                key={prod.productId}
                className={classes.card}
                title={prod.name}
                category={prod.category}
                price={Number(prod.price?.toLocaleString())}
                imageUrl={prod.imageUrl}
                path={`/product/${prod.productId}`}
                colors={prod.colors?.split(",").length}
                productId={prod.productId}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
