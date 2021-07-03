import DashboardEvent from "@/components/DashboardEvent";
import Layout from "@/components/Layout";
import { parseCookie } from "@/helpers/index";
import clsx from "clsx";
import axiosConfig from "../../config";
import styles from "@/styles/Dashboard.module.scss";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function dashboard({ events, token }) {
  const router = useRouter();
  const deleteEvent = async (id) => {
    try {
      await axiosConfig.delete(`/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      toast.error(error.response.data.message);
      router.reload();
    }
    // if (confirm('Are you sure?')) {
    //   const res = await fetch(`${API_URL}/events/${id}`, {
    //     method: 'DELETE',
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })

    //   const data = await res.json()

    //   if (!res.ok) {
    //     toast.error(data.message)
    //   } else {
    //     router.reload()
    //   }
    // }
    console.log("delete");
  };
  return (
    <Layout title="User Dashboard">
      <div className={clsx(styles.dash)}>
        <ToastContainer />
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req);
  const { data } = await axiosConfig.get("/events/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return {
    props: { events: data, token },
  };
}
