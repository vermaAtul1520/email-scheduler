import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styles from "./Popup.module.css";
import { usePopupContext } from "@/context/popupcontext";

interface FormData {
  title: string;
  description: string;
  subject: string;
  frequency: string;
  repeat: string;
  time: string;
}

const Popup: React.FC = () => {
  const { closePopup, popupData,getData } = usePopupContext();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [formData, setFormData] = useState<FormData>({
    title: popupData.title || "",
    description: popupData.description || "",
    subject: popupData.subject || "",
    frequency: popupData.frequency || "",
    repeat: popupData.repeat || "",
    time: popupData.time || "",
  });


  async function updateData(id: string) {
    if (formData.frequency === "daily") {
      setFormData((prevData) => ({
        ...prevData,
        ["repeat"]: "",
      }));
    }
    console.log("========>>>>>",formData,id)
    try {
      const response = await fetch(`http://localhost:3000/api/schedule/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title || "",
          description: formData.description || "",
          subject: formData.subject || "",
          frequency: formData.frequency || "",
          repeat: formData.repeat || "",
          time: formData.time || "",
        }),
      });
      getData();
      // Handle response if needed
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Your form submission logic
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDayChange = (day: string) => {
    setFormData((prevData) => ({
      ...prevData,
      ["repeat"]: day,
    }));
  };

  return (
    <div className={styles.popup}>
      <span className={styles.popupHeader}>
        {Object.keys(popupData)?.length ? "Edit Schedule" : "Add Schedule"}
      </span>
      <div>
        <form onSubmit={handleFormSubmit}>
          <label className={styles.popupInput}>
            Title
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter Title"
            />
          </label>
          <br />
          <label className={styles.popupInput}>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Enter Description"
            />
          </label>
          <br />
          <label className={styles.popupInput}>
            Subject
            <input
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Enter Subject"
            />
          </label>
          <br />
          <label className={styles.popupInput}>
            Frequency
            <select
              name="frequency"
              value={formData.frequency}
              onChange={handleInputChange}
            >
              <option value="weekly" selected>
                Weekly
              </option>
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
            </select>
          </label>
          <br />
          {formData.frequency == "weekly" && (
            <label className={styles.popupInput}>
              Repeat
              <label className={styles.popupDaySelector}>
                {days.map((e,idx) => (
                  <div
                  key={idx}
                    // name="repeat"
                    value={e}
                    onClick={() => {
                      handleDayChange(e);
                      // console.log(e, formData);
                    }}
                    className={formData.repeat == e && `${styles.active}`}
                  >
                    {e.slice(0, 1)}
                  </div>
                ))}
              </label>
            </label>
          )}
          {formData.frequency == "monthly" && (
            <label className={styles.popupInput}>
              Repeat
              <select
                name="repeat"
                value={formData.repeat}
                onChange={handleInputChange}
              >
                <option value="first monday" selected>
                  first monday
                </option>
                <option value="last friday">last friday</option>
              </select>
            </label>
          )}
          <br />
          <label className={styles.popupInput}>
            Time
            <input
              name="time"
              type="time"
              value={formData.time}
              onChange={handleInputChange}
            />
          </label>
          <div className={styles.btnContainer}>
            <button onClick={() => {
              closePopup()
            }}
              className={styles.cancleBtn}>
              Cancel
            </button>
            <button
              onClick={() => {
                // make api call to update.....
                updateData(popupData._id);
                closePopup();
              }}
              className={styles.doneBtn}
            >
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
