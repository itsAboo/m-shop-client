import classes from "./ListHeader.module.css";
import CloseIcon from "@mui/icons-material/Close";

export default function ListHeader({
  toggle,
  onClear,
}: {
  toggle: (newOpen: boolean) => void;
  onClear: () => void;
}) {
  return (
    <div className={classes["list-item-header"]}>
      <h1>Filter & Sort</h1>
      <div>
        <button onClick={onClear} className={`${classes.clear} ${classes.btn}`}>
          Clear All
        </button>
        <button
          onClick={() => toggle(false)}
          className={`${classes.close} ${classes.btn}`}
        >
          <CloseIcon color="inherit" />
        </button>
      </div>
    </div>
  );
}
