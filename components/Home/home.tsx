import React from "react";
import styles from "./Home.module.css";
import Body from "../Body/body";

const items = [
  // Populate with your items
  {
    title: "Sample title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    subject: "Sample subject",
    schedule: "Daily at 10:00AM",
  },
  {
    title: "Sample title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    subject: "Sample subject",
    schedule: "Daily at 10:00AM",
  },
  {
    title: "Sample title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    subject: "Sample subject",
    schedule: "Daily at 10:00AM",
  },
  // ... add more items as needed
];

const HoDme = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}></div>
      <Body/>
    </div>
  );
};

export default HoDme;