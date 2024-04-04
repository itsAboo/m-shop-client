import { createPortal } from "react-dom";
import classes from "./CartModal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../Button/Button";
import { useGetCart } from "../../../hooks/cart.hook";
import { CircularProgress } from "@mui/material";
import { formatCurrency } from "../../../util/formatting";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface ICartModal {
  imageUrl: string;
  price: string | number;
  color: string;
  size: string;
  title: string;
  onClose: () => void;
}

export default function CartModal(props: ICartModal) {
  const { data: cart, isLoading } = useGetCart();
  const navigate = useNavigate();
  const handleContinueShopping = () => {
    props.onClose();
    navigate("/products");
  };
  return createPortal(
    <div className={classes.modal}>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ type: "tween", duration: 0.1 }}
        className={classes.content}
      >
        <h1>SUCCESSFULLY ADDED TO CART!</h1>
        <div className={classes.wrap}>
          <div className={classes.left}>
            <img src={props.imageUrl} alt={props.title} />
            <div className={classes.details}>
              <p className={classes.title}>{props.title}</p>
              <p className={classes.price}>
                ฿{Number(props.price).toLocaleString()}
              </p>
              <p>Color : {props.color}</p>
              <p>Size : {props.size}</p>
              <p>Quantity : 1</p>
            </div>
          </div>
          {isLoading ? (
            <CircularProgress color="inherit" />
          ) : (
            <div className={classes.right}>
              <p>Your cart</p>
              <p>{cart?.totalCartItems!} items</p>
              <div className={classes.flex}>
                <p>total price : </p>
                <p>{formatCurrency(Number(cart?.totalPrice))}</p>
              </div>
              <div className={classes.flex}>
                <p>Delivery</p>
                <p>Free</p>
              </div>
              <hr style={{ margin: "5px 0" }} />
              <div className={`${classes.flex} ${classes.price}`}>
                <p>Total : </p>
                <p>{formatCurrency(Number(cart?.totalPrice))}</p>
              </div>
              <p>(inclusive of tax)</p>
              <div className={classes["flex-col"]}>
                <Button
                  onClick={() => navigate("/cart")}
                  className={classes.btn}
                >
                  VIEW CART <span className={classes.arrow}>&#10142;</span>
                </Button>
                <Button
                  onClick={handleContinueShopping}
                  className={classes.btn}
                  outlined
                >
                  CONTINUE SHOPPING{" "}
                  <span className={classes.arrow}>&#10142;</span>
                </Button>
              </div>
            </div>
          )}
        </div>
        <button onClick={props.onClose} className={classes["close-btn"]}>
          <CloseIcon />
        </button>
      </motion.div>
      <div onClick={props.onClose} className={classes.backdrop}></div>
    </div>,
    document.getElementById("modal")!
  );
}
