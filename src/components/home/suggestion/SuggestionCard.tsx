import { useNavigate } from "react-router-dom";
import classes from "./SuggestionCard.module.css";

interface ISuggestionCard {
  title: string;
  imageUrl: string;
}

//New arrivals , HOT ITEM, SALE , ONLY MEMBER
export default function SuggestionCard(props: ISuggestionCard) {
  const navigate = useNavigate();
  return (
    <div className={classes.card} onClick={() => navigate("/products")}>
      <div className={classes["card-img"]}>
        <img src={props.imageUrl} alt={props.title} />
      </div>
      <div className={classes["card-footer"]}>
        <p>{props.title}</p>
      </div>
    </div>
  );
}
