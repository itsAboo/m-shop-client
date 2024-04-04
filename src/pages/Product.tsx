import { useEffect, useState } from "react";
import ImageShow from "../components/product/ImageShow";
import RightContainer from "../components/product/RightContainer";
import classes from "./styles/Product.module.css";
import { Color } from "../components/UI/FilterProduct/FilterProduct";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../util/productApi";
import { CircularProgress } from "@mui/material";
import { Size } from "../util/interface";
import { useAddCart } from "../hooks/cart.hook";
import { useUser } from "../hooks/user.hook";
import CartModal from "../components/UI/Modal/CartModal";
import { AnimatePresence } from "framer-motion";
import { formatCurrency } from "../util/formatting";

export default function Product() {
  const params = useParams<{ id: string }>();
  const { data: user } = useUser();
  const navigate = useNavigate();
  const [pickedColor, setPickedColor] = useState<Color | null>(null);
  const [pickedSize, setPickedSize] = useState<Size | null>(null);
  const [open, setOpen] = useState(false);
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", params.id],
    queryFn: ({ signal }) => getProduct({ signal, id: params.id }),
    refetchOnWindowFocus: false,
  });
  const [inputErr, setInputErr] = useState({ color: false, size: false });

  const { mutateAsync, isPending, isError } = useAddCart();

  const handleAddToCart = async ({
    productId,
    color,
    size,
  }: {
    productId: string | number;
    color: string;
    size: string;
  }) => {
    if (!color) {
      setInputErr((prev) => ({ ...prev, color: true }));
      return;
    }
    if (!size) {
      setInputErr((prev) => ({ ...prev, size: true }));
      return;
    }
    if (!user) {
      return navigate("/signin");
    }
    await mutateAsync({ productId, color, size });
    setOpen(true);
  };

  useEffect(() => {
    if (isError) {
      return navigate("/signin");
    }
  }, [isError, navigate]);

  const handlePickColor = (color: Color) => {
    setInputErr((prev) => ({ ...prev, color: false }));
    setPickedColor(color);
  };
  const handlePickSize = (size: Size) => {
    setInputErr((prev) => ({ ...prev, size: false }));
    setPickedSize(size);
  };
  const handleCloseModal = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className={classes.container}>
      {isLoading ? (
        <div>
          <CircularProgress color="inherit" />
        </div>
      ) : product ? (
        <>
          <div className={classes["mobile-header"]}>
            <h2>{product.name}</h2>
            <p>
              {product.type} {product.category}
            </p>
            <p>{formatCurrency(Number(product.price), true)}</p>
          </div>
          <div className={classes["container-left"]}>
            <ImageShow images={product?.imageUrl?.split(" ")!} />
          </div>
          <div className={classes["container-right"]}>
            <RightContainer
              product={!isLoading ? product! : null}
              sizePicked={pickedSize}
              onSizePicked={handlePickSize}
              colorPicked={pickedColor}
              onPickedColor={handlePickColor}
              isAddToCartLoading={isPending}
              onAddToCart={handleAddToCart}
              isValueNull={inputErr}
            />
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
      <AnimatePresence>
        {open ? (
          <CartModal
            key={product?.productId}
            title={product?.name!}
            color={pickedColor!}
            imageUrl={product?.imageUrl?.split(" ")[0]!}
            price={product?.price!}
            size={pickedSize!}
            onClose={handleCloseModal}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
