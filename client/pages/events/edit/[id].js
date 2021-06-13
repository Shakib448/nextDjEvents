import moment from "moment";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosConfig from "../../../config";
import styles from "@/styles/Form.module.scss";
import Layout from "@/components/Layout";
import clsx from "clsx";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import Modal from "../../../components/Modal";
import ImageUpload from "../../../components/ImageUpload";

export default function EditEventsPage({ evt }) {
  const [values, setValues] = useState({
    name: evt?.name,
    performarce: evt?.performarce,
    venue: evt?.venue,
    address: evt?.address,
    date: evt?.date,
    time: evt?.time,
    description: evt?.description,
  });

  const [imagePreview, setImagePreview] = useState(
    evt.image ? evt.image.formats.thumbnail.url : null
  );
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  const imageUploaded = () => {
    console.log("uploaded");
  };

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
      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}
      <div>
        <button className="btn-secondary" onClick={() => setShowModal(true)}>
          <FaImage /> Set Image
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          evtId={evt.id}
          imageUploaded={imageUploaded}
          // token={token}
        />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const { data } = await axiosConfig.get(`/events/${id}`);
  return {
    props: { evt: data },
  };
}
