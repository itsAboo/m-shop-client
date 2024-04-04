import Slider from "react-slick";
import classes from "./Banner.module.css";
import { useRef } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

type SliderRefType = {
  slickNext: () => void;
  slickPrev: () => void;
};

function Arrow(props: {
  className?: string;
  style?: StyleSheet;
  onClick?: () => void;
}) {
  const { className, onClick, style } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "none",
      }}
      onClick={onClick}
    />
  );
}

export default function Banner() {
  const sliderRef = useRef<SliderRefType | null>(null);
  const next = () => {
    sliderRef.current?.slickNext();
  };
  const prev = () => {
    sliderRef.current?.slickPrev();
  };
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 5000,
    cssEase: "linear",
    dots: true,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
  };
  return (
    <div className={classes.container}>
      <Slider
        ref={(slider) => {
          if (slider) {
            sliderRef.current = slider;
          }
        }}
        className={classes.slider}
        {...settings}
      >
        <div className={classes["img-container"]}>
          <img
            src="https://images.prismic.io/sportsshoesprod/f80f3d28-20b3-4c2a-8806-94039f9e2a0b_Adidas+-+Desktop+Banner+-+Supernova+V4.png?auto=compress,format"
            alt="banner-shoes"
          />
        </div>
        <div className={classes["img-container"]}>
          <img
            src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1824,c_limit/974f0e9b-37f9-42e3-9e80-95d5cfbe464c/%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%82%E0%B8%AD%E0%B8%87-nike.jpg"
            alt="FB-1"
          />
        </div>
        <div className={classes["img-container"]}>
          <img
            src="https://images.prismic.io/sportsshoesprod/fcb931f2-4f17-4405-b3bf-34dc4783228c_INOV8+-+Mudtalon+Banner+-+Desktop.jpg?auto=compress,format"
            alt="FB-2"
          />
        </div>
      </Slider>
      <div className={classes.next}>
        <button className={classes["next-prev-btn"]} onClick={next}>
          <NavigateNextIcon />
        </button>
      </div>
      <div className={classes.prev}>
        <button className={classes["next-prev-btn"]} onClick={prev}>
          <NavigateBeforeIcon />
        </button>
      </div>
    </div>
  );
}
