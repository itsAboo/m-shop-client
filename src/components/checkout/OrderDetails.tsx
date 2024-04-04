import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../util/formatting";
import { IOrders } from "../../util/interface";
import Button from "../UI/Button/Button";
import classes from "./OrderDetails.module.css";

export default function OrderDetails({ order }: { order: IOrders }) {
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <h1>ORDER CONFIRMED</h1>
      <div className={classes.details}>
        {order.details.map((o) => (
          <div key={o.name + o.color + o.size} className={classes.card}>
            <div className={classes.left}>
              <img src={o.imageUrl.split(" ")[0]} alt={o.name} />
              <div className={classes.desc}>
                <p>{o.name}</p>
                <p>Color : {o.color}</p>
                <p>Size : {o.size}</p>
                <p>x {o.orderItemQuantity}</p>
              </div>
            </div>
            <p>{formatCurrency(Number(o.orderItemTotalPrice))}</p>
          </div>
        ))}
        <p className={classes["total-price"]}>
          Total price : <span>{formatCurrency(Number(order.totalPrice))}</span>
        </p>
        <Button onClick={() => navigate("/products")} className={classes.btn}>
          CONTINUE SHOPPING <span className={classes.arrow}>&#10142;</span>
        </Button>
      </div>
    </div>
  );
}
