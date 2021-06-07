import Layout from "@/components/Layout";
import axiosConfig from "../config";
import EventItem from "@/components/EventItem";
import Link from "next/link";

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events?.length === 0 && <h3>No events to show</h3>}
      {events?.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      {events?.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await axiosConfig.get("/events?_sort=date:ASC&_limit=3");
  return { props: { events: data }, revalidate: 1 };
}
