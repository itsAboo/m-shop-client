import { useEffect, useState } from "react";
import classes from "./SubHeader.module.css";
import { AnimatePresence, motion } from "framer-motion";

const text = [
  "Free returns within 30 days",
  "Pay on delivery today!",
  "Free delivery for members",
];

export default function SubHeader() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (index < text.length - 1) {
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        setIndex(0);
      }
    }, 3000);
    return () => clearTimeout(timeout);
  }, [index]);
  return (
    <AnimatePresence>
      <motion.div className={classes["sub-header"]}>
        <motion.p
          key={text[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {text[index]}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
