import { Link, useLocation, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SubHeader from "./SubHeader";
import Nav from "./Nav";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAnimate, useMotionValueEvent, useScroll } from "framer-motion";
import { useUser } from "../../hooks/user.hook";
import { getToken } from "../../util/auth";
import { useGetCart } from "../../hooks/cart.hook";
import { useWishList } from "../../hooks/wishlist.hook";
import MenuIcon from "@mui/icons-material/Menu";
import NavMobile from "./MobileHeader/NavMobile";
import CloseIcon from "@mui/icons-material/Close";

export default function Header() {
  const [visible, setIsVisible] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [categoryIsPicked, setCategoryIsPicked] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const { pathname } = useLocation();
  const [scope, animate] = useAnimate();
  const { data: user } = useUser();
  const { data: cart } = useGetCart();
  const { data: wishlist } = useWishList();
  const navigate = useNavigate();

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchMobileOpen, setIsSearchMobileOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    animate("div", { y: 0 }, { type: "tween", duration: 0.2, delay: 0.2 });
  }, [pathname, animate, cart, wishlist]);
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > 70 && previous! > latest) {
      setIsVisible(true);
      animate("div", { y: 0 }, { type: "tween", duration: 0.2, delay: 0.2 });
    } else if (latest > 70 && previous! < latest && !categoryIsPicked) {
      animate("div", { y: -100 }, { type: "tween", duration: 0.2, delay: 0.2 });
    }
  });
  const categoryPicked = (cName: string | null) => {
    setCategoryIsPicked(cName);
  };
  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/products/?keyword=${keyword}`);
  };
  const handleCloseNav = () => {
    setIsNavOpen(false);
  };
  return (
    <div ref={scope} className={visible ? classes.visible : undefined}>
      <SubHeader />
      <div className={classes["header-container"]}>
        {isSearchMobileOpen && (
          <form onSubmit={handleSearch} className={classes["search-mobile"]}>
            <div className={classes["search-mobile-btn-group"]}>
              <button className={classes["search-mobile-btn"]} type="submit">
                <SearchOutlinedIcon color="inherit" />
              </button>
              <input
                name="keyword"
                onChange={handleKeywordChange}
                value={keyword}
                placeholder="keyword"
                className={classes["search-mobile-input"]}
                type="text"
              />
              {keyword.length > 0 && (
                <button
                  onClick={() => setKeyword("")}
                  className={classes["search-mobile-clear"]}
                  type="button"
                >
                  <CloseIcon color="inherit" />
                </button>
              )}
            </div>
            <button
              onClick={() => setIsSearchMobileOpen(false)}
              className={classes["search-mobile-cancel"]}
              type="button"
            >
              cancel
            </button>
          </form>
        )}
        <header className={classes.header}>
          <div className={classes["left-mobile"]}>
            <MenuIcon
              color="inherit"
              onClick={() => setIsNavOpen((prev) => !prev)}
              className={classes["menu-icon"]}
            />
            <Link
              className={`${classes.wishlist} ${classes["wishlist-mobile"]}`}
              to={user && !!getToken() ? "/wishlist" : "/signin"}
            >
              <FavoriteBorderIcon color="inherit" />
              {user && wishlist && wishlist.length > 0 ? (
                <span className={classes["mobile-quantity"]}>
                  {wishlist.length}
                </span>
              ) : null}
            </Link>
          </div>
          <NavMobile
            className={classes.drawer}
            boxCl={classes.box}
            open={isNavOpen}
            onClose={handleCloseNav}
          />
          <div className={classes.logo}>
            <Link to="/">
              <h2>M-SHOP</h2>
            </Link>
          </div>
          <Nav className={classes.nav} onPicked={categoryPicked} />
          <div className={classes["nav-right"]}>
            <form onSubmit={handleSearch} className={classes.search}>
              <input
                name="keyword"
                onChange={handleKeywordChange}
                value={keyword}
                type="text"
                placeholder="search"
              />
              <button type="submit">
                <SearchOutlinedIcon color="inherit" />
              </button>
            </form>
            <div className={classes["nav-right-user"]}>
              <ul className={classes["nav-right-user-list"]}>
                <li className={classes["nav-right-user-item"]}>
                  <Link
                    to={user && !!getToken() ? "/myaccount/profile" : "/signin"}
                  >
                    <PermIdentityIcon color="inherit" />
                  </Link>
                </li>
                <li
                  className={`${classes["nav-right-user-item"]} ${classes["search-mobile-icon"]}`}
                >
                  <button onClick={() => setIsSearchMobileOpen(true)}>
                    <SearchOutlinedIcon color="inherit" />
                  </button>
                </li>
                <li
                  className={`${classes["nav-right-user-item"]} ${classes["wishlist-list"]}`}
                >
                  <Link
                    className={classes.wishlist}
                    to={user && !!getToken() ? "/wishlist" : "/signin"}
                  >
                    <FavoriteBorderIcon color="inherit" />
                    {user && wishlist && wishlist.length > 0 ? (
                      <span className={classes.quantity}>
                        {wishlist.length}
                      </span>
                    ) : null}
                  </Link>
                </li>
                <li className={classes["nav-right-user-item"]}>
                  <Link
                    className={classes.cart}
                    to={user && !!getToken() ? "/cart" : "/signin"}
                  >
                    <ShoppingCartOutlinedIcon color="inherit" />
                    {user && cart && cart.totalCartItems! > 0 ? (
                      <span className={classes.quantity}>
                        {cart.totalCartItems}
                      </span>
                    ) : null}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
