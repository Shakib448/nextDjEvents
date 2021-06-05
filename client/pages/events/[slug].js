import Layout from "@/components/Layout";
import axiosConfig from "../../config";

export default function EventPage({ evt }) {
  const singleEvents = Object.assign({}, ...evt);
  return (
    <Layout>
      <h1>{singleEvents.name}</h1>
    </Layout>
  );
}

export async function getStaticPaths() {
  const { data } = await axiosConfig.get(`/api/events`);

  const paths = data.map((evt) => ({
    params: { slug: evt.slug },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params: { slug } }) {
  const { data } = await axiosConfig.get(`/api/events/${slug}`);
  return { props: { evt: data }, revalidate: 1 };
}

// export async function getServerSideProps({ query: { slug } }) {
//   const { data } = await axiosConfig.get(`/api/events/${slug}`);
//   return { props: { evt: data } };
// }
