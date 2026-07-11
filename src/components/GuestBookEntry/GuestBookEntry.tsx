import { Box } from "@/components/Box/Box";
import styles from "./guestBookEntry.module.css";
import classNames from "classnames";

type Props = {
  className?: string;
  name: string;
  message: string;
  createdAt?: string;
};

export const GuestBookEntry = ({
  className,
  name,
  message,
  createdAt,
}: Props) => {
  const [date, time] = createdAt
    ? new Date(createdAt).toLocaleString().split(", ")
    : ["", ""];
  return (
    <Box className={classNames(styles.guestBookEntry, className)}>
      <div className={styles.content}>
        <h2 className="heading3">
          <em>{name}:</em>
        </h2>
        <p className="body2 s-t-sm">{message}</p>
      </div>
      {createdAt && (
        <div className={styles.timestamps}>
          <p className={styles.date}>{date}</p>
          <p className={styles.time}>{time}</p>
        </div>
      )}
    </Box>
  );
};
