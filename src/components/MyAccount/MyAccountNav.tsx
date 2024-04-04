import { Link, useLocation } from "react-router-dom";
import classes from "./MyAccountNav.module.css";
import { useSignOut } from "../../hooks/user.hook";

export default function MyAccountNav() {
  const location = useLocation();
  const signOut = useSignOut();
  return (
    <nav className={classes.nav}>
      <ul className={classes["nav-list"]}>
        <li className={classes["nav-list-items"]}>
          <Link
            className={`${
              location.pathname === "/myaccount/profile"
                ? classes.active
                : undefined
            }`}
            to="/myaccount/profile"
          >
            Personal Data
          </Link>
        </li>
        <li className={classes["nav-list-items"]}>
          <Link
            className={`${
              location.pathname === "/myaccount/order"
                ? classes.active
                : undefined
            }`}
            to="/myaccount/order"
          >
            Order history
          </Link>
        </li>
        <li className={classes["nav-list-items"]}>
          <Link to="/cart">My cart</Link>
        </li>
        <li className={classes["nav-list-items"]}>
          <Link to="/wishlist">My favorite</Link>
        </li>
        <li className={classes["nav-list-items"]}>
          <Link onClick={() => signOut()} to="/">
            Sign out
          </Link>
        </li>
      </ul>
    </nav>
  );
}
