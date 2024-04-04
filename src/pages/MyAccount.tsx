import { Outlet, useLocation, useNavigate } from "react-router-dom";
import classes from "./styles/MyAccount.module.css";
import { useEffect, useState } from "react";
import MyAccountNav from "../components/MyAccount/MyAccountNav";
import MyAccountNavMobile from "../components/MyAccount/MyAccountNavMobile";

export default function MyAccount() {
  const [title, setTitle] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/myaccount") {
      navigate("/myaccount/profile");
    }
    if (location.pathname === "/myaccount/profile") {
      setTitle("Personal Data");
    }
    if (location.pathname === "/myaccount/order") {
      setTitle("Order History");
    }
  }, [location.pathname, navigate]);
  return (
    <div className={classes.container}>
      <h1>{title}</h1>
      <div className={classes["mobile-nav"]}>
        <MyAccountNavMobile />
      </div>
      <div className={classes.wrapper}>
        <div className={classes.nav}>
          <MyAccountNav />
        </div>
        <div className={classes.outlet}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
