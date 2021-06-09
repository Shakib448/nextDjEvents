import moment from "moment";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosConfig from "../../config";
import styles from "@/styles/Form.module.scss";
import Layout from "@/components/Layout";
import clsx from "clsx";

export default function EditEventsPage({ evt }) {
  console.log(evt);
  const [values, setValues] = useState({
    name: evt?.name,
    performarce: evt?.performarce,
    venue: evt?.venue,
    address: evt?.address,
    date: evt?.date,
    time: evt?.time,
    description: evt?.description,
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      toast.error("Please fill in all fields");
    }
    const res = await axiosConfig.put(`/events/${evt?.id}`, values);
    if (!res.statusText) {
      toast.error("Something Went Wrong");
    } else {
      router.push(`/events/${res.data.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">Go Back</Link>
      <h1>Edit Events</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={clsx(styles.form)}>
        <div className={clsx(styles.grid)}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performarce"
              id="performers"
              value={values.performarce}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={moment(values.date).format("yyyy-MM-DD")}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type="submit" value="Update Event" className="btn" />
      </form>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const { data } = await axiosConfig.get(`/events/${id}`);
  return {
    props: { evt: data },
  };
}
