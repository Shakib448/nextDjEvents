import Layout from "@/components/Layout";
import axiosConfig from "../../config";
import EventItem from "@/components/EventItem";
import qs from "qs";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SearchPage({ events }) {
  const router = useRouter();

  return (
    <Layout>
      <Link href="/events">
        <a>Go Back</a>
      </Link>
      <h1>Search Result for {router.query.term}</h1>
      {events?.length === 0 && <h3>No result found</h3>}
      {events?.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performarce_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });
  const { data } = await axiosConfig.get(`/events?${query}`);
  return { props: { events: data } };
}
