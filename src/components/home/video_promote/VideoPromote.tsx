import { useNavigate } from "react-router-dom";
import Button from "../../UI/Button/Button";
import classes from "./VideoPromote.module.css";

export default function VideoPromote() {
  const navigate = useNavigate();
  return (
    <section className={classes.container}>
      <video
        src="https://videos.adidas.com/video/upload/if_w_gt_1920,w_1920/brand_SS_24_multisport_global_hp_mh_apac_d_54df22ab08.mp4"
        playsInline
        autoPlay
        muted
        loop
      ></video>
      <div className={classes.desc}>
        <h1>YOU GOT THIS</h1>
        <p>When you play sport on your own terms,</p>
        <p>pressure doesn't stand a change.</p>
        <Button
          onClick={() => navigate("/products")}
          className={classes.btn}
          outlined
        >
          EXPLORE MORE <span className={classes.arrow}>&#10142;</span>
        </Button>
      </div>
    </section>
  );
}
