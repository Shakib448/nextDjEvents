import Layout from "@/components/Layout";
import axiosConfig from "../../config";
import EventItem from "@/components/EventItem";

export default function SearchPage({ events }) {
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

export async function getServerSideProps({ query: { term } }) {
  const { data } = await axiosConfig.get(`/events?name_contains=${term}`);
  return { props: { events: data } };
}
