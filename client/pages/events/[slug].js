import Layout from "@/components/Layout";
import axiosConfig from "../../config";
import styles from "@/styles/Event.module.scss";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

export default function EventPage({ evt }) {
  const singleEvents = Object.assign({}, ...evt);

  const deleteEvent = (e) => {
    console.log(e);
  };

  return (
    <Layout>
      <div className={clsx(styles.event)}>
        <div className={clsx(styles.controls)}>
          <Link href={`/events/edit/${singleEvents.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={clsx(styles.delete)} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>
        <span>
          {singleEvents.date} at {singleEvents.time}
        </span>
        <h1>{singleEvents.name}</h1>

        {singleEvents.image && (
          <div className={clsx(styles.image)}>
            <Image
              src={singleEvents.image.formats.thumbnail.url}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{singleEvents.performers}</p>
        <h3>Description:</h3>
        <p>{singleEvents.description}</p>
        <h3>Venue: {singleEvents.venue}</h3>
        <p>{singleEvents.address}</p>

        <Link href="/events">
          <a className={clsx(styles.back)}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const { data } = await axiosConfig.get(`/events`);

  const paths = data.map((evt) => ({
    params: { slug: evt.slug },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params: { slug } }) {
  const { data } = await axiosConfig.get(`/events?slug=${slug}`);
  return { props: { evt: data }, revalidate: 1 };
}

// export async function getServerSideProps({ query: { slug } }) {
//   const { data } = await axiosConfig.get(`/api/events/${slug}`);
//   return { props: { evt: data } };
// }
