import classes from "./styles/CheckOut.module.css";
import CheckOutForm from "../components/checkout/CheckOutForm";
import { useGetCart, useGetCartItems } from "../hooks/cart.hook";
import { formatCurrency } from "../util/formatting";
import { useUser } from "../hooks/user.hook";
import CheckOutAddressConfirmed, {
  IConfirmed,
} from "../components/checkout/CheckOutAddressConfirmed";
import { useEffect, useState } from "react";
import PaymentMethod from "../components/checkout/PaymentMethod";
import CheckOutRight from "../components/checkout/CheckOutRight";
import { CircularProgress } from "@mui/material";
import { usePlaceOrder } from "../hooks/order.hook";
import Button from "../components/UI/Button/Button";
import OrderDetails from "../components/checkout/OrderDetails";
import CheckOutSummaryMobile from "../components/checkout/CheckOutSummaryMobile";

export default function CheckOut() {
  const { data: cartItems } = useGetCartItems();
  const { data: cart } = useGetCart();
  const {
    mutate,
    data: order,
    isPending: isPlaceOrderPending,
  } = usePlaceOrder();
  useEffect(() => {
    if (order) {
      window.scrollTo(0, 0);
    }
  }, [order]);
  const [paymentErr, setPaymentErr] = useState({ status: false, text: "" });
  const { data: user } = useUser();
  const [state, setState] = useState("");
  const [personalData, setPersonalData] = useState<IConfirmed>({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const handlePickPaymentMethod = (name: "Paypal" | "Credit/Debit Card") => {
    setPaymentErr((prev) => ({ ...prev, status: false, text: "" }));
    setPaymentMethod(name);
  };
  const handleConfirmDelivery = () => {
    setState((prev) => (prev += ",deliveryConfirm"));
  };
  const handleConfirmData = (data: IConfirmed) => {
    setState("dataConfirm");
    setPersonalData((prev) => ({ ...prev, ...data }));
  };
  const handlePlaceOrder = () => {
    if (paymentMethod !== "Credit/Debit Card" && paymentMethod !== "Paypal") {
      return setPaymentErr((prev) => ({
        ...prev,
        status: true,
        text: "Please select your payment",
      }));
    }
    mutate({ paymentMethod });
  };
  return (
    <div className={classes.container}>
      {order ? (
        <OrderDetails order={order} />
      ) : (
        <>
          <div className={classes.header}>
            <h1>CHECKOUT</h1>
            <p>
              ({cart?.totalCartItems} item
              {cart?.totalCartItems! > 1 ? "s" : null}){" "}
              {formatCurrency(Number(cart?.totalPrice))}
            </p>
          </div>
          <div className={classes.main}>
            <div className={classes["left-container"]}>
              <div className={classes["left-header"]}>
                <h3>CONTACT</h3>
                <p>{user?.email}</p>
              </div>
              <div className={classes["left-desc"]}>
                <h3>ADDRESS</h3>
                <p>Delivery address</p>
              </div>
              {state.includes("dataConfirm") ? null : (
                <CheckOutForm
                  firstName={user?.firstName!}
                  lastName={user?.lastName!}
                  address={user?.address!}
                  onConfirm={handleConfirmData}
                />
              )}
              {state.includes("dataConfirm") ? (
                <CheckOutAddressConfirmed
                  onConfirm={handleConfirmDelivery}
                  isConfirm={state.includes("dataConfirm,deliveryConfirm")}
                  {...personalData}
                />
              ) : null}
              {state.includes("dataConfirm,deliveryConfirm") ? (
                <>
                  <PaymentMethod
                    isErr={paymentErr.status}
                    errTxt={paymentErr.text}
                    paymentPicked={paymentMethod!}
                    onSetPayment={handlePickPaymentMethod}
                  />
                  <CheckOutSummaryMobile
                    className={classes["checkout-summary-mobile"]}
                    quantity={cart?.totalCartItems!}
                    totalPrice={cart?.totalPrice!}
                  />
                  <Button
                    disabled={paymentErr.status}
                    onClick={handlePlaceOrder}
                    className={classes.btn}
                  >
                    PLACE ORDER <span className={classes.arrow}>&#10142;</span>
                  </Button>
                </>
              ) : null}
            </div>
            <CheckOutRight
              className={classes["checkout-right"]}
              cart={cart!}
              cartItems={cartItems!}
            />
          </div>
        </>
      )}
      {isPlaceOrderPending && (
        <div className={classes.loader}>
          <CircularProgress color="inherit" />
        </div>
      )}
    </div>
  );
}
