import { Link } from "react-router-dom";
import classes from "./CartCard.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { formatCurrency } from "../../util/formatting";
import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";

interface CartCardProps {
  path: string;
  imageUrl?: string;
  title?: string;
  totalPrice?: number;
  quantity?: number;
  color?: string;
  size?: string;
  isUpdatingQuantity?: boolean;
  isDeletingItems?: boolean;
  onDelete: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function CartCard(props: CartCardProps) {
  const [disBtn, setDisBtn] = useState(false);
  return (
    <motion.div
      variants={{
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: -30 },
      }}
      initial="visible"
      animate="visible"
      exit="hidden"
      transition={{ type: "spring", duration: 0.4 }}
      className={classes.card}
    >
      <div className={classes["card-img"]}>
        <Link to={props.path}>
          <img src={props.imageUrl?.split(" ")[0]} alt={props.title} />
        </Link>
      </div>
      <div className={classes["card-body"]}>
        <div>
          <div className={classes["card-body-title"]}>
            <Link to={props.path}>{props.title}</Link>
            <div className={classes["card-body-title-right"]}>
              <p>{formatCurrency(Number(props.totalPrice))}</p>
              <button
                disabled={props.isDeletingItems || disBtn}
                onClick={() => {
                  props.onDelete();
                  setDisBtn(true);
                }}
                className={classes.delete}
              >
                {props.isDeletingItems ? (
                  <CircularProgress color="inherit" size={16} />
                ) : (
                  <CloseIcon />
                )}
              </button>
            </div>
          </div>
          <div className={classes.desc}>
            <p>{props.color?.toLocaleUpperCase()}</p>
            <p className={classes.size}>SIZE : {props.size}</p>
          </div>
        </div>
        <div className={classes["card-body-footer"]}>
          <button
            disabled={props.isUpdatingQuantity || disBtn}
            onClick={() => {
              if (Number(props.quantity) === 1) {
                setDisBtn(true);
              }
              props.onDecrease();
            }}
            className={classes.btn}
          >
            -
          </button>
          <input
            readOnly
            className={classes.input}
            type="number"
            value={props.quantity}
          />
          <button
            disabled={props.isUpdatingQuantity}
            onClick={props.onIncrease}
            className={classes.btn}
          >
            +
          </button>
        </div>
      </div>
    </motion.div>
  );
}
