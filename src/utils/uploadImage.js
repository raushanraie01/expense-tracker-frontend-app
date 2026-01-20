import { API_PATHS } from "./apiPaths";
import api from "./axiosInstance.js";

export default async function uploadImage(imagefile) {
  try {
    const formData = new FormData();
    //append imagefile to form data
    formData.append("profileImageUrl", imagefile);
    const response = await api.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
      headers: {
        "Content-Type": "multipart/form-data", //set header for file upload
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while uploading the image", error);
    throw error;
  }
}
