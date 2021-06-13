import { useState } from "react";
import axiosConfig from "../config";
import styles from "@/styles/Form.module.scss";
import clsx from "clsx";

export default function ImageUpload() {
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    e.preventDefault();
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
