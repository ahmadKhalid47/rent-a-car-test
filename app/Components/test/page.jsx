"use client";
import { useState } from "react";
import axios from "axios";

export default function UploadForm() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleInputChange = async () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }
    const res = await axios.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  
  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width" : "nav-closed-width"
      } absolute right-0 w-fit h-fit mt-[90px] pt-5 transitions`}
    >
      <div className="flex flex-col ">
        <input
          type="file"
          multiple
          onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
        />
        <button onClick={handleInputChange}>Upload Images</button>
      </div>
    </div>
  );
}
