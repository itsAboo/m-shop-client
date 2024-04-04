import { useNavigate } from "react-router-dom";
import classes from "./CollectionCard.module.css";

interface ICollectionCard {
  imageUrl: string;
  title: string;
}

export default function CollectionCard(props: ICollectionCard) {
  const navigate = useNavigate();
  return (
    <div className={classes.card} onClick={() => navigate("/products")}>
      <img src={props.imageUrl} alt={props.title} />
      <div className={classes.desc}>
        <p>{props.title}</p>
      </div>
    </div>
  );
}
