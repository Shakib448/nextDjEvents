import Layout from "@/components/Layout";
import axiosConfig from "../../config";
import EventItem from "@/components/EventItem";

const PER_PAGE = 2;

export default function EventPage({ events }) {
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

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate State page

  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  const { data } = await axiosConfig.get(
    `/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  return { props: { events: data } };
}
