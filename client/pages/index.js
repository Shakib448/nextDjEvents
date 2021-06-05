import Layout from "@/components/Layout";
import axiosConfig from "../config";

export default function HomePage({ events }) {
  console.log(events);
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events?.length === 0 && <h3>No events to show</h3>}
      {events?.map((evt) => (
        <h3 key={evt.id}>{evt.name}</h3>
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await axiosConfig.get("/api/events");
  return { props: { events: data }, revalidate: 1 };
}
