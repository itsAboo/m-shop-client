import CartCard from "../components/cart/CartCard";
import classes from "./styles/Cart.module.css";
import Button from "../components/UI/Button/Button";
import { useNavigate } from "react-router-dom";
import {
  useDeleteCart,
  useGetCart,
  useGetCartItems,
  useUpdateCart,
} from "../hooks/cart.hook";
import { CircularProgress } from "@mui/material";
import { formatCurrency } from "../util/formatting";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Cart() {
  const {
    data: cartItems,
    isLoading: isCartItemsLoading,
    isSuccess: isCartItemsSuccess,
  } = useGetCartItems();
  const { data: cart, isLoading: isCartLoading } = useGetCart();
  const [prodDelete, setProdDelete] = useState<{
    productId: string | number;
    color: string;
    size: string;
  }>({
    productId: "",
    color: "",
    size: "",
  });
  const [isMobile, setIsMobile] = useState(false);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

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

  const { ref, inView } = useInView();

  const navigate = useNavigate();

  const deleteCart = useDeleteCart();
  const updateQuantity = useUpdateCart();

  const handleUpdateQuantity = ({
    productId,
    color,
    size,
    increase,
    decrease,
  }: {
    productId: string | number;
    color: string;
    size: string;
    increase?: boolean | undefined;
    decrease?: boolean | undefined;
  }) => {
    updateQuantity.mutate({ productId, color, size, increase, decrease });
  };

  const handleDelete = ({
    productId,
    color,
    size,
  }: {
    productId: string | number;
    color: string;
    size: string;
  }) => {
    setProdDelete((prev) => ({ ...prev, productId, color, size }));
    deleteCart.mutate({ productId, color, size });
  };

  const handleClick = () => {
    return navigate("/checkout");
  };
  return (
    <div className={classes.container}>
      {isCartLoading ? (
        <CircularProgress color="inherit" />
      ) : (
        <>
          <div className={classes["left-container"]}>
            <div className={classes["left-container-header"]}>
              {isCartItemsSuccess && cartItems?.length === 0 ? (
                <>
                  <h1>YOUR CART IS EMPTY</h1>
                  <p>
                    Once you add something to your cart - it will appear here.
                    Ready to get started?
                  </p>
                  <Button
                    onClick={() => navigate("/products")}
                    className={classes.btn}
                  >
                    GET STARTED &#10142;
                  </Button>
                </>
              ) : (
                <>
                  <h1>YOUR CART</h1>
                  {isCartItemsLoading ? null : (
                    <p className={classes["total-items"]}>
                      TOTAL ({cart?.totalCartItems?.toString()} item
                      {cart?.totalCartItems! > 1 ? "s" : null}){" "}
                      <span>{formatCurrency(Number(cart?.totalPrice))}</span>
                    </p>
                  )}
                </>
              )}
            </div>
            {isCartItemsLoading ? (
              <div className={classes.loader}>
                <CircularProgress color="inherit" />
              </div>
            ) : cartItems ? (
              <motion.div
                variants={{
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { staggerChildren: 0.04 },
                  },
                  hidden: { opacity: 0, x: -30 },
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={classes["card-container"]}
              >
                <AnimatePresence>
                  {cartItems!.map((item) => (
                    <CartCard
                      title={item.name}
                      imageUrl={item.imageUrl}
                      quantity={item.cartItemsQuantity}
                      color={item.color}
                      size={item.size}
                      key={item.productId! + item.size! + item.color!}
                      totalPrice={item.cartItemsTotalPrice}
                      path={`/product/${item.productId}`}
                      isDeletingItems={
                        item.productId === prodDelete.productId &&
                        item.color === prodDelete.color &&
                        item.size === prodDelete.size &&
                        deleteCart.isPending &&
                        !deleteCart.isSuccess
                      }
                      onDelete={() =>
                        handleDelete({
                          productId: item.productId!,
                          color: item.color!,
                          size: item.size!,
                        })
                      }
                      onIncrease={() =>
                        handleUpdateQuantity({
                          productId: item.productId!,
                          color: item.color!,
                          size: item.size!,
                          increase: true,
                        })
                      }
                      onDecrease={() => {
                        handleUpdateQuantity({
                          productId: item.productId!,
                          color: item.color!,
                          size: item.size!,
                          decrease: true,
                        });
                      }}
                      isUpdatingQuantity={updateQuantity.isPending}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <h1>No item in cart</h1>
            )}
          </div>
          {isCartItemsSuccess && cartItems?.length === 0 ? null : (
            <div ref={ref} className={classes["right-container"]}>
              {isCartLoading ? (
                <div className={classes.loader}>
                  <CircularProgress color="inherit" />
                </div>
              ) : (
                <>
                  <h3>ORDER SUMMARY</h3>
                  <div className={classes.flex}>
                    <p>
                      {cart?.totalCartItems} item
                      {cart?.totalCartItems! > 1 ? "s" : null}
                    </p>
                    <p>{formatCurrency(Number(cart?.totalPrice))}</p>
                  </div>
                  <div className={classes.flex}>
                    <p>Delivery</p>
                    <p>Free</p>
                  </div>
                  <div className={`${classes.flex} ${classes.total}`}>
                    <p>Total</p>
                    <p>{formatCurrency(Number(cart?.totalPrice))}</p>
                  </div>
                  <span
                    className={
                      !inView && isMobile
                        ? classes["mobile-checkout-btn"]
                        : undefined
                    }
                  >
                    <Button onClick={handleClick} className={classes.btn}>
                      CHECKOUT <span className={classes.arrow}>&#10142;</span>
                    </Button>
                  </span>
                  <div className={classes.payment}>
                    <p>ACCEPTED PAYMENT METHODS</p>
                    <div className={classes["img-group"]}>
                      <img
                        src="https://www.adidas.co.th/static/checkout/react/2229fee/assets/img/accepted-payment-methods/icon-adidas-mastercard.svg"
                        alt="mastercard-icon"
                      />
                      <img
                        src="https://www.adidas.co.th/static/checkout/react/2229fee/assets/img/accepted-payment-methods/icon-adidas-visa.svg"
                        alt="visa-icon"
                      />
                      <img
                        src="https://www.adidas.co.th/static/checkout/react/2229fee/assets/img/accepted-payment-methods/icon-adidas-paypal.svg"
                        alt="paypal-icon"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
