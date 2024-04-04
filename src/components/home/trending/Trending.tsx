import { Link } from "react-router-dom";
import classes from "./Trending.module.css";
import TrendingCard from "./TrendingCard";

export default function Trending() {
  return (
    <section className={classes.container}>
      <div className={classes["layout-container"]}>
        <div className={classes.header}>
          <h1>TRENDING</h1>
          <Link to="/products">
            <p>VIEW ALL</p>
          </Link>
        </div>
        <div className={classes["card-container"]}>
          <TrendingCard
            title="Jordan Flight Essentials"
            imageUrl="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b919b48e-a0be-4784-8442-f438a77da57d/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%A2%E0%B8%B7%E0%B8%94%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%82%E0%B8%99%E0%B8%B2%E0%B8%94%E0%B9%82%E0%B8%AD%E0%B9%80%E0%B8%A7%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B9%84%E0%B8%8B%E0%B8%AA%E0%B9%8C-jordan-flight-essentials-C7XVkQ.png"
          />
          <TrendingCard
            title="Nike Bliss"
            imageUrl="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/365f6e26-a7c3-408b-a88a-e49fc9b68769/%E0%B8%81%E0%B8%B2%E0%B8%87%E0%B9%80%E0%B8%81%E0%B8%87%E0%B8%82%E0%B8%B2%E0%B8%A2%E0%B8%B2%E0%B8%A7-dri-fit-%E0%B8%9C%E0%B8%B9%E0%B9%89-bliss-Vbz39D.png"
          />
          <TrendingCard
            title="Argentina 2024 Uniforms"
            imageUrl="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiquj_JzRh89KJUlWZLdligIJAnjsT_EShxoGb5R0ckaSnF8W6aw0woqAiDpBtHUcEQjqFueHc-A4VfTJtTSFm83kZtWk6PRuxrs536T4cpNfixzLXW0TVkfLqUT9emMw4zvnfmF-sLHdSlYPgZxcexeKjLfcoh_lu7rSKycz9-2QhPVw6YPNNEQSLZxd3f/s1600/argentina%202024%20away%20kit%20%281%29.jpg"
          />
          <TrendingCard
            title="Jordan Rise Cap"
            imageUrl="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b8401d72-bda0-4e68-8036-aa63dbc073ab/%E0%B8%AB%E0%B8%A1%E0%B8%A7%E0%B8%81%E0%B8%9B%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%84%E0%B8%94%E0%B9%89-jordan-rise-cap-2fsSH0.png"
          />
        </div>
      </div>
    </section>
  );
}
