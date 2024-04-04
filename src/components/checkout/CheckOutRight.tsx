import { Link } from "react-router-dom";
import { formatCurrency } from "../../util/formatting";
import { ICart, ICartItems } from "../../util/interface";
import CheckOutCard from "./CheckOutCard";
import classes from "./CheckOutRight.module.css";

interface CheckOutRightProps {
  cart: ICart;
  cartItems: ICartItems[];
  className?: string;
}

export default function CheckOutRight({
  cart,
  cartItems,
  className,
}: CheckOutRightProps) {
  return (
    <div
      className={`${classes["right-container"]} ${
        className ? className : undefined
      }`}
    >
      <div className={classes.flex}>
        <h3>YOUR CART</h3>
        <Link to="/cart">EDIT</Link>
      </div>
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
      <div className={classes["card-container"]}>
        {cartItems?.map((cartItem) => (
          <CheckOutCard
            key={cartItem.productId! + cartItem.color! + cartItem.size}
            title={cartItem.name}
            imageUrl={cartItem.imageUrl!}
            color={cartItem.color}
            size={cartItem.size}
            totalPrice={cartItem.cartItemsTotalPrice}
            quantity={cartItem.cartItemsQuantity}
          />
        ))}
      </div>
    </div>
  );
}
