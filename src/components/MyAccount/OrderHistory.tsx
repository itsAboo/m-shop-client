import { CircularProgress } from "@mui/material";
import { useGetOrder } from "../../hooks/order.hook";
import { formatCurrency, formatDateTime } from "../../util/formatting";
import Button from "../UI/Button/Button";
import classes from "./OrderHistory.module.css";
import { useNavigate } from "react-router-dom";

export default function OrderHistory() {
  const { data: orders, isLoading } = useGetOrder();
  const navigate = useNavigate();
  return (
    <>
      {isLoading ? (
        <div className={classes.loader}>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <>
          {orders?.length! > 0 ? (
            orders!.map((e) => (
              <div className={classes.order} key={e.orderId}>
                <div className={classes["order-header"]}>
                  <p>{formatDateTime(e.createdAt)}</p>
                  <div className={classes.flex}>
                    <p className={classes["delivery-success"]}>
                      The package has been delivered
                    </p>
                    <p className={classes.green}>Success</p>
                  </div>
                </div>
                {e.details.map((order) => (
                  <div
                    className={classes["order-item"]}
                    key={order.productId + order.color + order.size}
                  >
                    <div className={classes.flex}>
                      <img
                        src={order.imageUrl.split(" ")[0]}
                        alt={order.name}
                      />
                      <div className={classes.details}>
                        <p>{order.name}</p>
                        <p>Color : {order.color}</p>
                        <p>Size : {order.size}</p>
                        <p>x {order.orderItemQuantity}</p>
                      </div>
                    </div>
                    <p>{formatCurrency(Number(order.orderItemTotalPrice))}</p>
                  </div>
                ))}
                <div className={classes.footer}>
                  <p>
                    Total price :{" "}
                    <span className={classes["total-price"]}>
                      {" "}
                      {formatCurrency(Number(e.totalPrice))}
                    </span>{" "}
                  </p>
                  <div>
                    <Button
                      onClick={() => navigate("/products")}
                      className={classes.btn}
                    >
                      Buy again
                    </Button>
                    <Button outlined className={classes.btn}>
                      Contact us
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={classes["no-order"]}>
              <h4>You haven't created an order yet.</h4>
              <Button
                onClick={() => navigate("/products")}
                className={classes["shopping-btn"]}
              >
                GO SHOPPING <span className={classes.arrow}>&#10142;</span>
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
}
