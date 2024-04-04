import { Link } from "react-router-dom";
import classes from "./Footer.module.css";
import { footerCategory } from "../../util/category";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Button from "../UI/Button/Button";
import { useUser } from "../../hooks/user.hook";

export default function Footer() {
  const { data: user } = useUser();
  return (
    <footer className={classes.container}>
      <div
        style={{
          backgroundColor: !user ? undefined : "#929493",
          color: !user ? undefined : "#e6e8e7",
        }}
        className={classes.footer}
      >
        {!user && (
          <div className={classes["member-suggestion"]}>
            <h1>BECOME A MEMBER & GET 15% OFF</h1>
            <Button>
              SIGN UP FOR FREE <span className={classes.arrow}>&#10142;</span>
            </Button>
          </div>
        )}
        <div className={classes["main"]}>
          <div className={classes.content}>
            {footerCategory.map((e) => (
              <React.Fragment key={e.title}>
                <ul className={classes["main-list"]} key={e.title}>
                  <li
                    className={`${classes["main-list-item"]} ${classes["main-list-item-title"]}`}
                  >
                    {e.title}
                  </li>
                  {e.item.map((item) => (
                    <li
                      className={classes["main-list-item"]}
                      key={item.toString()}
                    >
                      <Link
                        style={{ color: !user ? undefined : "#e6e8e7" }}
                        to="/"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </React.Fragment>
            ))}
            <ul className={classes["main-list"]}>
              <li
                className={`${classes["main-list-item"]} ${classes["main-list-item-title"]}`}
              >
                FOLLOW US
              </li>
              <li
                className={`${classes["main-list-item"]} ${classes["main-list-item-follow"]}`}
              >
                <Link to="/">
                  <FacebookIcon />
                </Link>
                <Link to="/">
                  <InstagramIcon />
                </Link>
                <Link to="/">
                  <XIcon />
                </Link>
                <Link to="/">
                  <YouTubeIcon />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes["mobile-main"]}>
          <ul>
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/">Sports</Link>
            </li>
            <li>
              <Link to="/">Collections</Link>
            </li>
            <li>
              <Link to="/">Company info</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/">Support</Link>
            </li>
            <li>
              <Link to="/">Contact us</Link>
            </li>
          </ul>
        </div>
        <div className={classes.copyright}>
          <p>© 2023 M-Shop Thailand Co., Ltd.</p>
        </div>
      </div>
    </footer>
  );
}
