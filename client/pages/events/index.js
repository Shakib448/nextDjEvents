import Layout from "@/components/Layout";
import axiosConfig from "../../config";
import EventItem from "@/components/EventItem";

export default function EventPage({ events }) {
  console.log(events);
  return (
    <Layout>
      <h1> Events</h1>
      {events?.length === 0 && <h3>No events to show</h3>}
      {events?.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await axiosConfig.get("/api/events");
  return { props: { events: data }, revalidate: 1 };
}
