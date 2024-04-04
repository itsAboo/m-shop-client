import classes from "./Suggestion.module.css";
import SuggestionCard from "./SuggestionCard";

export default function Suggestion() {
  return (
    <section className={classes.container}>
      <div className={classes["card-container"]}>
        <SuggestionCard
          title="NEW ARRIVALS"
          imageUrl="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/02e9bfd9edcd4f379932f7437eaf407d_9366/SL_72_RS_Shoes_Green_IG2133_01_standard.jpg"
        />
        <SuggestionCard
          title="HOT ITEMS"
          imageUrl="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/66d03d4a-36b8-4e2c-bc2a-de8b126eeb53/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%81%E0%B8%88%E0%B9%87%E0%B8%84%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%AD%E0%B8%A1%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%97%E0%B8%AD%E0%B8%82%E0%B8%99%E0%B8%B2%E0%B8%94%E0%B9%82%E0%B8%AD%E0%B9%80%E0%B8%A7%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B9%84%E0%B8%8B%E0%B8%AA%E0%B9%8C%E0%B8%9C%E0%B8%B9%E0%B9%89-air-vPH4k6.png"
        />
        <SuggestionCard
          title="SALE"
          imageUrl="https://pbs.twimg.com/media/FXJlMttXgAAfOdB?format=jpg&name=900x900"
        />
        <SuggestionCard
          title="ONLY MEMBER"
          imageUrl="https://www.prodirectsport.com/-/media/prodirect/project/en/app/membership/pro-member-benefits/3.png"
        />
      </div>
    </section>
  );
}
