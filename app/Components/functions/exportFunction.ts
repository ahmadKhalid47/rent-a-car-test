import axios from "axios";

export const handleExport = async (data: any) => {
  // Example data to send to the server
  try {
    // Send a POST request with the data using Axios
    const response = await axios.post(
      "/api/exportData",
      { data },
      {
        responseType: "blob", // Important for handling binary data like Excel files
      }
    );

    // Create a URL for the file blob and trigger download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.xlsx";
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    console.error("Failed to export data", error);
  }
};
