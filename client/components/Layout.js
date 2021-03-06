import Head from "next/head";
import { useRouter } from "next/router";
import clsx from "clsx";
import styles from "@/styles/Layout.module.scss";
import Header from "./Header";
import Footer from "./Footer";
import Showcase from "./Showcase";

export default function Layout({ title, children, description, keywords }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />

      {router.pathname === "/" && <Showcase />}
      <main>
        <div className={clsx(styles.container)}>{children}</div>
      </main>
      <Footer />
    </>
  );
}

Layout.defaultProps = {
  title: "DJ Events | Find the hottest parties",
  description: "Welcome to the DJ Events",
  keywords: "DJ Music Brand edm",
};
