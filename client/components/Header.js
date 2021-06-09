import Link from "next/link";
import styles from "@/styles/Header.module.scss";
import clsx from "clsx";
import Search from "./Search";

export default function Header() {
  return (
    <header className={clsx(styles.header)}>
      <div className={clsx(styles.logo)}>
        <Link href="/">
          <a>DJ Events</a>
        </Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>
          <li>
            <Link href="/events/add">
              <a>Add Event</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
