import Layout from "@/components/Layout";
import axiosConfig from "../../config";
import styles from "@/styles/Event.module.scss";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function EventPage({ evt }) {
  const singleEvents = Object.assign({}, ...evt);
  const router = useRouter();

  const deleteEvent = async () => {
    if (confirm("Are you sure you want to delete")) {
      const res = await axiosConfig.delete(`/events/${singleEvents.id}`);
      if (!res.statusText) {
        toast.error(res.data.message);
      } else {
        router.push("/events");
      }
    }
  };

  return (
    <Layout>
      <div className={clsx(styles.event)}>
        <div className={clsx(styles.controls)}>
          <Link href={`/edit/${singleEvents.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={clsx(styles.delete)} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>
        <span>
          {new Date(singleEvents.date).toLocaleDateString("en-US")} at{" "}
          {singleEvents.time}
        </span>
        <h1>{singleEvents.name}</h1>
        <ToastContainer />

        {singleEvents.image && (
          <div className={clsx(styles.image)}>
            <Image
              src={singleEvents.image.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{singleEvents.performarce}</p>
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
