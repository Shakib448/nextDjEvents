import clsx from "clsx";
import Link from "next/link";
import styles from "../styles/Footer.module.scss";

export default function Footer() {
  return (
    <footer className={clsx(styles.footer)}>
      <p>Copyright &copy; DJ Events {new Date().getFullYear()}</p>
      <p>
        <Link href="/about">About This Projects</Link>
      </p>
    </footer>
  );
}
