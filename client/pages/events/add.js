import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axiosConfig from "../../config";
import styles from "@/styles/Form.module.scss";
import Layout from "@/components/Layout";
import clsx from "clsx";

export default function AddEventsPage() {
  const [values, setValues] = useState({
    name: "",
    performance: "",
    venue: "",
    address: "",
    date: "",
    time: "",
    description: "",
  });
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">Go Back</Link>
      <h1>Add Events</h1>

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
        </div>
      </form>
    </Layout>
  );
}
