// const deleteImagesHandler = async (imageUrls: string[]) => {
//   try {
//     const response = await fetch("/api/deleteImages", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ imageUrls }),
//     });

//     const result = await response.json();

//     if (response.ok) {
//       console.log(result.message); // "Images deleted successfully"
//     } else {
//       console.error(result.message); // Error message if the deletion failed
//     }
//   } catch (error) {
//     console.error("Error calling deleteImages API:", error);
//   }
// };
