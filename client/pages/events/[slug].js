import Layout from "@/components/Layout";
import axiosConfig from "../../config";
import styles from "@/styles/Event.module.scss";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import clsx from "clsx";

export default function EventPage({ evt }) {
  const singleEvents = Object.assign({}, ...evt);
  return (
    <Layout>
      <div className={clsx(styles.event)}>
        <div className={clsx(styles.controls)}>
          <Link href={`/events/edit/${singleEvents.id}`}>
            <a>
              <FaPencilAlt />
            </a>
          </Link>
        </div>
      </div>
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
