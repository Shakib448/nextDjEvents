import Link from "next/link";
import styles from "@/styles/Header.module.scss";
import clsx from "clsx";
import Search from "./Search";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
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
          {user ? (
            <>
              <li>
                <Link href="/events/add">
                  <a>Add Event</a>
                </Link>
              </li>
              <li>
                <Link href="/account/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <button
                  className="btn-secondary btn-icon"
                  onClick={() => logout()}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/account/login">
                  <a className="btn-secondary btn-icon">
                    <FaSignInAlt /> Login
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
