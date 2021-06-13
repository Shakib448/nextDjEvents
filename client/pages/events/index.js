import Layout from "@/components/Layout";
import axiosConfig, { PER_PAGE } from "../../config";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";

export default function EventPage({ events, page, total }) {
  return (
    <Layout>
      <h1> Events</h1>
      {events?.length === 0 && <h3>No events to show</h3>}
      {events?.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      <Pagination page={page} total={total} PER_PAGE={PER_PAGE} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate State page

  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch Total
  const totalRes = await axiosConfig.get(`/events/count`);

  // Fetch events
  const { data } = await axiosConfig.get(
    `/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );

  return { props: { events: data, page: +page, total: totalRes.data } };
}
