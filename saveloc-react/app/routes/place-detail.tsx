import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { PlaceResponse } from "~/common/types";
import PlacesService from "~/service/PlacesService";
import ProtectedRoute from "./protected-route";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import ShareIcon from '@mui/icons-material/Share';

export default function PlaceDetail() {
  const baseImageUrl = import.meta.env.VITE_BASE_API_URL + "file/";
  let { id } = useParams();
  const placesService = new PlacesService();
  const [location, setLocation] = useState<PlaceResponse | null>(null);
  useEffect(() => {
    if (id != undefined) {
      placesService.getPlace(id).then((place) => {
        setLocation(place);
      });
    }
  }, [id]);

  return location != undefined ? (
    <ProtectedRoute>
      <div className="overflow-hidden pt-26 p-50">
        <div className="flex flex-row justify-around items-center">
          <Paper elevation={3}>
            <img
              src={baseImageUrl + location.photos[0]}
              className="aspect-square object-cover"
            ></img>
          </Paper>
          <div className="flex-col">
            <h1 className="text-xl font-bold drop-shadow-2xl">
              {location.name}
            </h1>
            <p className="p-2 drop-shadow-2xl">{location.description}</p>
            <Button variant="outlined"> <ShareIcon/> Share </Button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  ) : (
    "Not found!"
  );
}
