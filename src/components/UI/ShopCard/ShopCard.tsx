import { useNavigate } from "react-router-dom";
import classes from "./ShopCard.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useUpdateWishList, useWishList } from "../../../hooks/wishlist.hook";
import { useUser } from "../../../hooks/user.hook";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
interface ShopCardProps {
  productId?: string | number;
  className?: string;
  imageUrl?: string;
  price?: number;
  title?: string;
  description?: string;
  colors?: number;
  category?: string;
  subCategory?: string;
  path: string;
}
export default function ShopCard(props: ShopCardProps) {
  const { mutate, isError } = useUpdateWishList();
  const { data: wishlist, isError: isWishListError } = useWishList();
  const { data: user } = useUser();
  const queryClient = useQueryClient();

  const [imgState, setImgState] = useState(0);

  const navigate = useNavigate();

  if (isWishListError) {
    queryClient.setQueriesData({ queryKey: ["user"] }, null);
  }

  const handleAddWishList = () => {
    if (!user || isError) {
      return navigate("/signin");
    }
    mutate({ productId: props.productId! });
  };

  const handleHoverImage = () => {
    if (props.imageUrl?.split(" ").length === 1) {
      return;
    }
    setImgState(1);
  };
  const handleMouseOutImage = () => {
    if (props.imageUrl?.split(" ").length === 1) {
      return;
    }
    setImgState(0);
  };
  return (
    <div
      onMouseOver={handleHoverImage}
      onMouseOut={handleMouseOutImage}
      className={`${classes.card} ${
        props.className ? props.className : undefined
      }`}
    >
      <div className={classes["card-img"]}>
        <img
          onClick={() => navigate(props.path)}
          src={props.imageUrl?.split(" ")[imgState]}
          alt={props.title}
        />
        <p>฿{Number(props.price).toLocaleString()}</p>
        <button onClick={handleAddWishList}>
          {user &&
          wishlist &&
          wishlist.some((wl) => wl.productId === props.productId) ? (
            <FavoriteIcon className={classes["fav-icon"]} />
          ) : (
            <FavoriteBorderIcon className={classes["fav-icon"]} />
          )}
        </button>
      </div>
      <div
        onClick={() => navigate(props.path)}
        className={classes["card-footer"]}
      >
        <p className={classes.title}>{props.title}</p>
        <p className={classes.category}>{props.subCategory}</p>
        {props.colors && <p className={classes.desc}>{props.colors} colors</p>}
      </div>
    </div>
  );
}
