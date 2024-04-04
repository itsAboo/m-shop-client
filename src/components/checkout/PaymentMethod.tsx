import Button from "../UI/Button/Button";
import classes from "./PaymentMethod.module.css";

export default function PaymentMethod({
  onSetPayment,
  paymentPicked,
  isErr,
  errTxt,
}: {
  isErr: boolean;
  errTxt: string;
  paymentPicked: string;
  onSetPayment: (name: "Credit/Debit Card" | "Paypal") => void;
}) {
  return (
    <div className={classes.container}>
      <hr style={{ marginBottom: "30px" }} />
      <h3>PAYMENT</h3>
      <div className={classes["btn-group"]}>
        <Button
          style={{
            borderColor:
              paymentPicked === "Credit/Debit Card" ? undefined : "#f0f0f0",
          }}
          onClick={() => onSetPayment("Credit/Debit Card")}
          outlined
          className={classes.btn}
        >
          Credit/Debit Card{" "}
          <span>
            <img
              src="https://www.adidas.co.th/static/checkout/react/2229fee/assets/img/accepted-payment-methods/icon-adidas-mastercard.svg"
              alt="mastercard"
            />
          </span>
        </Button>
        <Button
          onClick={() => onSetPayment("Paypal")}
          style={{
            borderColor: paymentPicked === "Paypal" ? undefined : "#f0f0f0",
          }}
          outlined
          className={classes.btn}
        >
          Paypal{" "}
          <span>
            <img
              src="https://www.adidas.co.th/static/checkout/react/2229fee/assets/img/accepted-payment-methods/icon-adidas-paypal.svg"
              alt="paypal"
            />
          </span>
        </Button>
      </div>
      {isErr && <p className={classes["err-text"]}>{errTxt}</p>}
    </div>
  );
}
