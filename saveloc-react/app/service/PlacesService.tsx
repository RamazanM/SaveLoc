import type { CreatePlaceRequest, PlaceResponse } from "~/common/types";
import axiosInstance from "./AxiosInstance";

export type CreatePlaceResponse = {
  isSuccessful: boolean;
  addedPlace?: PlaceResponse;
  message?: String;
};
export default class PlacesService {
  async addPlace(place: CreatePlaceRequest): Promise<CreatePlaceResponse> {
    const res = await axiosInstance.post("/places", place);
    return {
      isSuccessful: res.status == 200,
      addedPlace: res.data,
      message: res.statusText,
    };
  }

  async getPlaces(): Promise<Array<PlaceResponse>> {
    const res = await axiosInstance.get<Array<PlaceResponse>>("/places");
    return res.data;
  }
  async getPlace(id: string): Promise<PlaceResponse> {
    const res = await axiosInstance.get<PlaceResponse>("/places/" + id);
    return res.data;
  }
  async deletePlace(id: string): Promise<any> {
    const res = await axiosInstance.delete("/places/" + id);
    return res.data;
  }

  async updatePlace(
    id: string,
    place: CreatePlaceRequest
  ): Promise<CreatePlaceResponse> {
    const res = await axiosInstance.put("/places/" + id, place);
    return res.data;
  }
}
