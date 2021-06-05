import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.scss";
import clsx from "clsx";

export default function EventItem({ evt }) {
  return (
    <div className={clsx(styles.event)}>
      <div className={clsx(styles.img)}>
        <Image
          src={evt.image ? evt.image : "/image/event-default.png"}
          width={170}
          height={100}
        />
      </div>
    </div>
  );
}
