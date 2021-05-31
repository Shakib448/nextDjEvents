import styles from "@/styles/Showcase.module.scss";
import clsx from "clsx";

export default function Showcase() {
  return (
    <div className={clsx(styles.showcase)}>
      <h1>Welcome To The Party!</h1>
      <h2>Find the hottest DJ events</h2>
    </div>
  );
}
