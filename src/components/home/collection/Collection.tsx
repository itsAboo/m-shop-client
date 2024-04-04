import { Link } from "react-router-dom";
import classes from "./Collection.module.css";
import CollectionCard from "./CollectionCard";

export default function Collection() {
  return (
    <section className={classes.container}>
      <div className={classes["layout-container"]}>
        <div className={classes.header}>
          <h1>COLLECTION</h1>
          <Link to="/products">
            <p>VIEW ALL</p>
          </Link>
        </div>
        <div className={classes["card-container"]}>
          <CollectionCard
            imageUrl="https://static01.nyt.com/images/2016/12/14/well/move/14physed-running-photo/14physed-running-photo-superJumbo.jpg"
            title="RUNNING"
          />
          <CollectionCard
            title="GOLF"
            imageUrl="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2023%2F10%2Flacoste-fall-winter-golf-collection-interview-1.jpg?cbr=1&q=90"
          />
          <CollectionCard
            title="HIKING"
            imageUrl="https://montane.com/cdn/shop/collections/fastpacking-collection_0c75cb1a-f991-4af5-b8d7-97732e04d56a.jpg?v=1709134862"
          />
          <CollectionCard
            title="FOOTBALL"
            imageUrl="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fwp-content%2Fblogs.dir%2F6%2Ffiles%2F2022%2F03%2Fadidas-stella-mccartney-arsenal-womens-football-team-uniform-1.jpg?cbr=1&q=90"
          />
          <CollectionCard
            title="TRACKSUIT"
            imageUrl="https://static.nike.com/a/images/w_960,c_limit/dc18da36-33b8-4800-b085-5b51f8fa618b/%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B9%80%E0%B8%9B%E0%B8%B4%E0%B8%94%E0%B8%95%E0%B8%B1%E0%B8%A7-jordan-x-union-sweater-tracksuit-and-bucket-hats-collection.png"
          />
          <CollectionCard
            title="VINTAGE"
            imageUrl="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F02%2Fnot-applicable-happy-new-decade-collection-lookbook-drop-info-3.jpg?cbr=1&q=90"
          />
        </div>
      </div>
    </section>
  );
}
