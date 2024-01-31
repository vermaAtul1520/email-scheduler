import React, { useEffect, useState } from "react";
import styles from "./Table.module.css";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { usePopupContext } from "@/context/popupcontext";

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
  const { data,getData } = usePopupContext();
  // const [data, setData] = useState("");
  useEffect(() => {
    getData();
  }, []);
  // async function getData() {
  //   const data = await fetch(`http://localhost:3000/api/schedule`, {
  //     method: "GET", // Specify the request method
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   setData(await data.json());
  // }

  async function deleteData(id) {
    const data = await fetch(`http://localhost:3000/api/schedule/${id}`, {
      method: "Delete", // Specify the request method
      headers: {
        "Content-Type": "application/json",
      },
    });
    getData();
  }
  console.log(data);
  const { openPopup, setpopup } = usePopupContext();
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
          {data &&
            data?.map((data, index) => (
              <tr key={index} className={styles.rowHover}>
                <td className={styles.td}>{data.title || " "}</td>
                <td className={styles.td}>{data.description || " "}</td>
                <td className={styles.td}>{data.subject || " "}</td>
                <td className={styles.td}>{data.schedule || " "}</td>
                <td className={styles.td}>
                  <button
                    className={styles.actionButton}
                    onClick={() => {
                      openPopup();
                      setpopup(data);
                    }}
                  >
                    <MdModeEditOutline className={styles.edit} />
                  </button>
                  <button
                    className={styles.actionButton}
                    onClick={() => {
                      deleteData(data?._id);
                    }}
                  >
                    <RiDeleteBin6Line />
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
