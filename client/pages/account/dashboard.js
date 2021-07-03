import Layout from "@/components/Layout";
import { parseCookie } from "@/helpers/index";
import axiosConfig from "../../config";

export default function dashboard({ events }) {
  console.log(events);
  return (
    <Layout title="User Dashboard">
      <h1>Dashboard</h1>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req);
  const { data } = await axiosConfig.get("/events/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return {
    props: { events: data },
  };
}
