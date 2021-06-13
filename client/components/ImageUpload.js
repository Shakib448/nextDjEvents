import { useState } from "react";
import axiosConfig from "../config";
import styles from "@/styles/Form.module.scss";
import clsx from "clsx";

export default function ImageUpload({ evtId, imageUploaded }) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "events");
    formData.append("refId", evtId);
    formData.append("field", "image");

    const res = await axiosConfig.post("/upload", formData);

    if (res.statusText) {
      imageUploaded();
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className={clsx(styles.form)}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={clsx(styles.file)}>
          <input type="file" onChange={handleFileChange} />
          <input type="submit" value="Upload" className="btn" />
        </div>
      </form>
    </div>
  );
}
