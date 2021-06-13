import Layout from "@/components/Layout";
import axiosConfig from "../../config";
import EventItem from "@/components/EventItem";
import Link from "next/link";

const PER_PAGE = 2;

export default function EventPage({ events, page, total }) {
  const lastPage = Math.ceil(total / PER_PAGE);

  return (
    <Layout>
      <h1> Events</h1>
      {events?.length === 0 && <h3>No events to show</h3>}
      {events?.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className="btn-secondary">Prev</a>
        </Link>
      )}
      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a className="btn-secondary">Next</a>
        </Link>
      )}
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
