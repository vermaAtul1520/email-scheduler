import React from "react";
import styles from "./Table.module.css";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

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

const Table = () => {
    return (
        <div className={styles.container}>
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
                                <button className={styles.actionButton}>
                                  <MdModeEditOutline
                                  className={styles.edit}/>
                                </button>
                                <button className={styles.actionButton}>
                                    <RiDeleteBin6Line/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;