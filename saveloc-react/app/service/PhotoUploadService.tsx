import type { CreatePlaceRequest, PlaceResponse } from "~/common/types";
import axiosInstance from "./AxiosInstance";

export type UploadPhotoResponse = {
  id: string;
};
export default class PhotoUploadService {
  async uploadPhoto(photo: File): Promise<UploadPhotoResponse> {
    console.log("photo", photo);

    const form = new FormData();
    form.append("file", photo);
    console.log("form", form);
    console.log("formAll", form.getAll("file"));

    const res = await axiosInstance.post("/file", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }
}
