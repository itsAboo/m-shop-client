import { formatCurrency } from "../../util/formatting";
import classes from "./CheckOutCard.module.css";

interface TCheckOutCard {
  imageUrl: string;
  title?: string;
  totalPrice?: string | number;
  size?: string;
  color?: string;
  quantity?: string | number;
}

export default function CheckOutCard(props: TCheckOutCard) {
  return (
    <div className={classes.card}>
      <div className={classes["card-img"]}>
        <img src={props.imageUrl.split(" ")[0]} alt={props.title} />
      </div>
      <div className={classes["card-right"]}>
        <div className={classes["card-right-header"]}>
          <p>{props.title}</p>
          <p>{formatCurrency(Number(props.totalPrice))}</p>
        </div>
        <div className={classes["card-right-desc"]}>
          <p>Size : {props.size}</p>
          <p>Color : {props.color}</p>
          <p>Quantity : {props.quantity}</p>
        </div>
      </div>
    </div>
  );
}
