import classes from "./ImageShow.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";

export default function ImageShow({ images }: { images: string[] }) {
  const [imgIndex, setImgIndex] = useState(0);
  const handleHoverImage = (index: number) => {
    setImgIndex(index);
  };
  const handleNavigateImg = (direction: "previous" | "next") => {
    switch (direction) {
      case "previous":
        if (imgIndex === 0) {
          return;
        }
        setImgIndex((prevIndex) => prevIndex - 1);
        break;
      case "next":
        if (imgIndex === images?.length! - 1) {
          return;
        }
        setImgIndex((prevIndex) => prevIndex + 1);
        break;
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes["container-left"]}>
        {images?.map((img, index) => (
          <div
            onMouseOver={() => handleHoverImage(index)}
            key={img}
            className={classes["container-left-item"]}
          >
            <img src={img} alt={img} />
            {imgIndex === index && <div className={classes.backdrop}></div>}
          </div>
        ))}
      </div>
      <div className={classes["container-right"]}>
        <img src={images![imgIndex]} alt="sss" />
        <div className={classes["btn-group"]}>
          <button
            disabled={imgIndex === 0}
            onClick={() => handleNavigateImg("previous")}
          >
            <ArrowBackIosNewIcon style={{ fontSize: "16px" }} />
          </button>
          <button
            disabled={imgIndex === images?.length! - 1}
            onClick={() => handleNavigateImg("next")}
          >
            <ArrowForwardIosIcon style={{ fontSize: "16px" }} />
          </button>
        </div>
      </div>
    </div>
  );
}
