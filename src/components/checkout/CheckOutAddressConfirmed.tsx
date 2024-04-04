import Button from "../UI/Button/Button";
import classes from "./CheckOutAddressConfirmed.module.css";

export interface IConfirmed {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  province: string;
  zipCode: string;
  isConfirm?: boolean;
  onConfirm?: () => void;
}

export default function CheckOutAddressConfirmed(props: IConfirmed) {
  return (
    <div className={classes.container}>
      <p>{props.firstName + " " + props.lastName}</p>
      <p>{props.address}</p>
      <p>{`${props.city} ${props.province} ${props.zipCode}`}</p>
      <p className={classes.desc}>
        Your delivery and billing address are the same
      </p>
      <hr style={{ margin: "30px 0" }} />
      <h3>DELIVERY OPTIONS</h3>
      <div className={classes.delivery}>
        <h4>Free</h4>
        <p>DHL eCommerce - Standard</p>
        <p>09:00 - 17.00</p>
      </div>
      {!props.isConfirm ? (
        <Button onClick={props.onConfirm} type="button" className={classes.btn}>
          Next <span className={classes.arrow}>&#10142;</span>
        </Button>
      ) : null}
    </div>
  );
}
