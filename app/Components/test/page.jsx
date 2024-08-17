"use client";
import { useState } from "react";
import axios from "axios";

export default function UploadForm() {
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("files" + 1, selectedFiles);
    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    // const response = await axios.post("/api/upload", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });

    console.log(response);
  };

  const handleInputChange = async (event) => {
    const imgData = selectedFiles;
    const formData = new FormData();
    formData.append("file", imgData);
    console.log({formData});
    console.log(imgData);
    const res = await axios.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // const handleInputChange = async (event) => {
  //   const imgData = event.target.files;
  //   const formData = new FormData();
  //   formData.append("file", imgData[0]);
  //   console.log(formData);

  //   formData.append("upload_preset", "kpgnv3dh");
  //   try {
  //     const res = await axios.post(
  //       "https://api.cloudinary.com/v1_1/dcdynkm5d/image/upload",
  //       formData
  //     );
  //   } catch (error) {}
  // };

  // const handleInputChange = async (event) => {
  //   const files = event.target.files;
  //   const uploadPromises = [];

  //   for (let i = 0; i < files.length; i++) {
  //     const formData = new FormData();
  //     formData.append("file", files[i]);
  //     formData.append("upload_preset", "kpgnv3dh");

  //     const uploadPromise = axios.post(
  //       "https://api.cloudinary.com/v1_1/dcdynkm5d/image/upload",
  //       formData
  //     );

  //     uploadPromises.push(uploadPromise);
  //   }

  //   try {
  //     const res = await Promise.all(uploadPromises);
  //     console.log(res);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width" : "nav-closed-width"
      } absolute right-0 w-fit h-fit mt-[90px] pt-5 transitions`}
    >
      <div className="flex flex-col ">
        <input
          type="file"
          // multiple
          // onChange={handleInputChange}
          onChange={(e) => setSelectedFiles(e.target.files[0])}
        />
        <button onClick={handleInputChange}>Upload Images</button>
      </div>
    </div>
  );
}
