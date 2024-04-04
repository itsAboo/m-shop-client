import { formatCurrency } from "../../util/formatting";
import classes from "./CheckOutSummaryMobile.module.css";

export default function CheckOutSummaryMobile({
  quantity,
  totalPrice,
  className,
}: {
  quantity: number;
  totalPrice: number;
  className?: string;
}) {
  return (
    <div
      className={`${classes.container} ${className ? className : undefined}`}
    >
      <h3>ORDER SUMMARY</h3>
      <div className={classes.flex}>
        <p>
          {quantity} item{quantity > 1 ? "s" : null}
        </p>
        <p>{formatCurrency(Number(totalPrice))}</p>
      </div>
      <div className={classes.flex}>
        <p>Delivery</p>
        <p>Free</p>
      </div>
      <div className={`${classes.flex} ${classes.total}`}>
        <p>total</p>
        <p>{formatCurrency(Number(totalPrice))}</p>
      </div>
      <p className={classes.tax}>(inclusive of tax)</p>
    </div>
  );
}
