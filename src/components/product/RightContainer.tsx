import { FavoriteBorder } from "@mui/icons-material";
import Button from "../UI/Button/Button";
import classes from "./RightContainer.module.css";
import { Color } from "../UI/FilterProduct/FilterProduct";
import CheckIcon from "@mui/icons-material/Check";
import { IProduct, Size } from "../../util/interface";
import { useUpdateWishList, useWishList } from "../../hooks/wishlist.hook";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useUser } from "../../hooks/user.hook";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const colorsMap = {
  white: "#ffffff",
  black: "#000000",
  blue: "#001aff",
  green: "#00ff00",
  red: "#ff0000",
  yellow: "#fbff00",
};

export default function RightContainer({
  colorPicked,
  onPickedColor,
  sizePicked,
  onSizePicked,
  product,
  onAddToCart,
  isAddToCartLoading,
  isValueNull,
}: {
  colorPicked: Color | null;
  onPickedColor: (color: Color) => void;
  sizePicked: Size | null;
  onSizePicked: (size: Size) => void;
  product: IProduct | null;
  onAddToCart?: ({
    productId,
    color,
    size,
  }: {
    productId: string | number;
    color: string;
    size: string;
  }) => void;
  isAddToCartLoading?: boolean;
  isValueNull?: { size: boolean; color: boolean };
}) {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);
  const { mutate, isPending } = useUpdateWishList();
  const { data: wishlist } = useWishList();
  const { data: user } = useUser();
  const navigate = useNavigate();
  const { ref, inView } = useInView();

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    if (innerWidth < 1024) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [innerWidth]);
  return (
    <>
      <div className={classes.header}>
        <h2>{product?.name}</h2>
        <p>
          {product?.type} {product?.category}
        </p>
        <p className={classes.price}>
          ฿{Number(product?.price).toLocaleString()}
        </p>
      </div>
      {product?.colors?.length! > 0 ? (
        <div className={classes.color}>
          <p>Color</p>
          <div className={classes["color-item-group"]}>
            {product?.colors
              ?.split(",")
              .map((col) => ({
                hex: colorsMap[col as Color],
                color: col,
              }))
              .map((e) => (
                <div
                  onClick={() => onPickedColor(e.color as Color)}
                  key={e.hex}
                  style={{
                    backgroundColor: colorsMap[e.color as Color],
                    border: e.color === "white" ? "1px solid black" : "none",
                  }}
                  className={classes["color-item"]}
                >
                  {colorPicked?.includes(e.color as Color) ? (
                    <CheckIcon
                      style={{
                        color: e.color === "black" ? "white" : "black",
                      }}
                    />
                  ) : null}
                </div>
              ))}
          </div>
          {isValueNull?.color && (
            <p className={classes["err-txt"]}>Please select color</p>
          )}
        </div>
      ) : null}
      <div className={classes.size}>
        <p>Size</p>
        <div className={classes["size-btn-group"]}>
          {product?.size?.split(",").map((s) => (
            <button
              key={s}
              onClick={() => onSizePicked(s as Size)}
              style={{ borderColor: s === sizePicked ? "black" : undefined }}
              className={classes.btn}
            >
              {s}
            </button>
          ))}
        </div>
        {isValueNull?.size && (
          <p className={classes["err-txt"]}>Please select size</p>
        )}
      </div>
      <div ref={ref} className={classes["submit-btn-group"]}>
        <div
          className={`${classes["submit-btn"]} ${
            !inView && isMobile ? classes["mobile-submit-btn"] : undefined
          }`}
        >
          <Button
            isLoading={isAddToCartLoading}
            disabled={
              isValueNull?.color || isValueNull?.size || isAddToCartLoading
            }
            onClick={onAddToCart?.bind(null, {
              productId: product?.productId!,
              color: colorPicked!,
              size: sizePicked!,
            })}
            className={classes.btn}
          >
            Add To Cart
          </Button>
        </div>
        <Button
          disabled={isPending}
          onClick={() => {
            if (!user) {
              return navigate("/signin");
            }
            mutate({ productId: product?.productId! });
          }}
          className={classes.btn}
          outlined
        >
          {wishlist &&
          wishlist?.some((e) => e.productId === product?.productId) ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorder />
          )}
        </Button>
      </div>
    </>
  );
}
