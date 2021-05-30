import Head from "next/head";

export default function Layout({ title, children, description, keywords }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <main>{children}</main>
    </>
  );
}

Layout.defaultProps = {
  title: "DJ Events | Find the hottest parties",
  description: "Welcome to the DJ Events",
  keywords: "DJ Music Brand edm",
};
