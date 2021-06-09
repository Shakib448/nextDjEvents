import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.scss";
import clsx from "clsx";

export default function EventItem({ evt }) {
  return (
    <div className={clsx(styles.event)}>
      <div className={clsx(styles.img)}>
        <Image
          src={
            evt.image
              ? evt.image.formats.thumbnail.url
              : "/images/event-default.png"
          }
          width={170}
          height={100}
        />
      </div>
      <div className={clsx(styles.info)}>
        <span>
          {new Date(evt.date).toLocaleDateString("en-US")} at {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>
      <div className={clsx(styles.link)}>
        <Link href={`/events/${evt.slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
}
