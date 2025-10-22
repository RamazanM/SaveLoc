import type { AxiosProgressEvent } from "axios";
import axiosInstance from "./AxiosInstance";

export type UploadPhotoResponse = {
  id: string;
};
export default class PhotoUploadService {
  async uploadPhoto(photo: File,onUploadProgress:(pe:AxiosProgressEvent)=>void): Promise<UploadPhotoResponse> {
    console.log("photo", photo);

    const form = new FormData();
    form.append("file", photo);
    console.log("form", form);
    console.log("formAll", form.getAll("file"));

    const res = await axiosInstance.post("/file", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress(progressEvent) {
          onUploadProgress(progressEvent)
      },
    });
    return res.data;
  }
}
