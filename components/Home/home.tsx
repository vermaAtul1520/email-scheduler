import React from "react";
import styles from "./Table.module.css";

const items = [
  // Populate with your items
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
    <div className={styles.container}>
      <input className={styles.searchInput} type="text" placeholder="Search" />
      <button className={styles.addButton}>Add</button>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.th}>Title</th>
            <th className={styles.th}>Description</th>
            <th className={styles.th}>Subject</th>
            <th className={styles.th}>Schedule</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className={styles.rowHover}>
              <td className={styles.td}>{item.title}</td>
              <td className={styles.td}>{item.description}</td>
              <td className={styles.td}>{item.subject}</td>
              <td className={styles.td}>{item.schedule}</td>
              <td className={styles.td}>
                <button className={styles.actionButton}>Edit</button>
                <button className={styles.actionButton}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HoDme;