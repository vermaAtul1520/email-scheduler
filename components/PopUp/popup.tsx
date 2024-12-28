import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from "react";
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
  const formVaildity = useRef<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    title: popupData.title || "",
    description: popupData.description || "",
    subject: popupData.subject || "",
    frequency: popupData.frequency || "Daily",
    repeat: popupData.repeat || "",
    time: popupData.time || "",
  });

  useEffect(()=>{
     let keys = Object.keys(popupData);
     formVaildity.current=true;
     if(formData.frequency==='Daily'){
      keys?.forEach((val)=>{
        if(formData?.[val]?.length === 0 && formData?.[val]!== 'repeat'){
          formVaildity.current=false;
        }
      })
     }
     else{
      keys?.forEach((val)=>{
        if(formData?.[val]?.length === 0){
          formVaildity.current=false;
        }
      })
     }
  },[formData])


  async function updateData(id: string) {
    if (formData.frequency === "Daily") {
      setFormData((prevData) => ({
        ...prevData,
        ["repeat"]: "",
      }));
    }
    
    try {
      if (Object.keys(popupData)?.length) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/schedule/${id}`, {
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
      }
      else {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/schedule`, {
          method: "POST",
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
      }
      getData();
      // Handle response if needed
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
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
    <div className={Object.keys(popupData)?.length ? styles.popupAdd : styles.popup}>
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
              <option value="Daily">Daily</option>
              <option value="Weekly">
                Weekly
              </option>
              <option value="Monthly">Monthly</option>
            </select>
          </label>
          <br />
          {formData.frequency == "Weekly" && (
            <label className={styles.popupInput}>
              Repeat
              <label className={styles.popupDaySelector}>
                {days?.map((e,idx) => (
                  <div
                  key={idx}
                    // name="repeat"
                    value={e}
                    onClick={() => {
                      handleDayChange(e);
                    }}
                    className={formData.repeat == e && `${styles.active}`}
                  >
                    {e.slice(0, 1)}
                  </div>
                ))}
              </label>
            </label>
          )}
          {formData.frequency == "Monthly" && (
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
