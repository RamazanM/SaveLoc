import type { CreatePlaceRequest, PlaceResponse } from "~/common/types";
import axiosInstance from "./AxiosInstance";

export type CreatePlaceResponse = { isSuccessful:boolean, addedPlace?:PlaceResponse, message?:String }
export default class PlacesService{
    async addPlace(place:CreatePlaceRequest):Promise<CreatePlaceResponse> {
        const res =await axiosInstance.post("/places",place)
        return { isSuccessful:res.status==200, addedPlace:res.data, message:res.statusText }
    }
}