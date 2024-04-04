import classes from "./Nav.module.css";
import { Link } from "react-router-dom";
import { category } from "../../util/category.ts";
import { useState } from "react";
import React from "react";

export default function Nav({
  onPicked,
  className,
}: {
  onPicked: (cName: string | null) => void;
  className?: string;
}) {
  const [categoryPicked, setCategoryPicked] = useState<string | null>(null);

  const handleHoverTitle = (title: string) => {
    setCategoryPicked(title);
    onPicked(title);
  };
  const handleMouseOut = () => {
    setCategoryPicked(null);
    onPicked(null);
  };

  return (
    <div className={`${classes.nav} ${className ? className : undefined}`}>
      <ul className={classes["nav-list"]}>
        {category.map((e, index) => (
          <React.Fragment key={index}>
            <li
              onMouseOver={() => handleHoverTitle(e.title)}
              onMouseOut={handleMouseOut}
              key={index}
              className={`${classes["nav-item"]} ${
                categoryPicked === e.title ? classes["nav-item-picked"] : null
              }`}
            >
              <Link onClick={handleMouseOut} to="/products">
                {e.title}
              </Link>
            </li>
            {categoryPicked === e.title && e.details && (
              <div
                className={classes["dropdown-container"]}
                onMouseOver={() => handleHoverTitle(e.title)}
                onMouseOut={handleMouseOut}
              >
                <div className={classes.dropdown}>
                  {e.details.map((detail, index) => (
                    <ul key={index} className={classes["dropdown-list"]}>
                      <li
                        className={`${classes["dropdown-item"]} ${classes["dropdown-header"]}`}
                      >
                        <Link onClick={handleMouseOut} to="/">
                          {detail.title}
                        </Link>
                      </li>
                      {detail.item.map((item, index) => (
                        <li key={index} className={classes["dropdown-item"]}>
                          <Link onClick={handleMouseOut} to="/">
                            {item}
                          </Link>
                        </li>
                      ))}
                      <li
                        className={`${classes["dropdown-item"]} ${classes["dropdown-footer"]}`}
                      >
                        <Link onClick={handleMouseOut} to="/">
                          {detail.summary}
                        </Link>
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}
