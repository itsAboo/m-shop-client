import { Link } from "react-router-dom";
import classes from "./TrendingCard.module.css";

interface ITrendingCard {
  imageUrl: string;
  title: string;
}

export default function TrendingCard(props: ITrendingCard) {
  return (
    <div className={classes.card}>
      <img src={props.imageUrl} alt={props.title} />
      <div className={classes.desc}>
        <h3>{props.title}</h3>
        <Link to="/products">SHOP NOW</Link>
      </div>
    </div>
  );
}
