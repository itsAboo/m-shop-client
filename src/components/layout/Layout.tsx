import { Outlet, useLocation } from "react-router-dom";
import Header from "../header/Header";
import classes from "./Layout.module.css";
import Footer from "../footer/Footer";
import { useEffect } from "react";

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className={classes.container}>
      <Header />
      <div className={classes["outlet-container"]}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
