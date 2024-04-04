import ShopCard from "../components/UI/ShopCard/ShopCard";
import { useWishList } from "../hooks/wishlist.hook";
import classes from "./styles/WishList.module.css";
export default function WishList() {
  const { data: wishlist, isLoading } = useWishList();
  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className={classes.container}>
          <div className={classes.header}>
            <h1>Wishlist</h1>
            <p>
              {wishlist?.length! > 0
                ? `${wishlist?.length} item${wishlist?.length === 1 ? "" : "s"}`
                : null}
            </p>
          </div>
          <div className={classes["card-container"]}>
            {wishlist?.length! > 0 ? (
              wishlist?.map((wl) => (
                <ShopCard
                  productId={wl.productId}
                  className={classes.card}
                  title={wl.name}
                  category={wl.category}
                  key={wl.productId}
                  price={wl.price}
                  imageUrl={wl.imageUrl}
                  path={`/product/${wl.productId}`}
                />
              ))
            ) : (
              <h2>No wishlist</h2>
            )}
          </div>
        </div>
      )}
    </>
  );
}
