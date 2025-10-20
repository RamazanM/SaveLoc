import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import type { PlaceResponse } from "~/common/types";
import PlacesService from "~/service/PlacesService";
import ProtectedRoute from "./protected-route";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import EditableText from "~/components/editable-text";
import ButtonGroup from "@mui/material/ButtonGroup";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import SuccessAlert from "~/components/success-alert";

import CustomMap from "~/components/custom-map";
import { LatLng, latLng } from "leaflet";

export default function PlaceDetail() {
  const baseImageUrl = import.meta.env.VITE_BASE_API_URL + "file/";
  let { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSuccess, setShowSuccess] = useState(false);

  let isEditing = searchParams.get("edit") != null;

  const placesService = new PlacesService();
  const [location, setLocation] = useState<PlaceResponse | null>(null);
  useEffect(() => {
    if (id != undefined) {
      placesService.getPlace(id).then((place) => {
        setLocation(place);
      });
    }
  }, [id]);

  function onSaveChanges() {
    if (location != null) {
      placesService.updatePlace(location.id, location).then((resp) => {
        setShowSuccess(true);
      });
    }
  }

  return location != undefined ? (
    <ProtectedRoute>
      <SuccessAlert
        message="Successfully updated."
        open={showSuccess}
        onClickClose={() => {
          setShowSuccess(false);
        }}
      ></SuccessAlert>
      <div className="overflow-hidden pt-26 p-50">
        <div className="flex flex-row justify-around items-center">
          <Paper elevation={3}>
            <CustomMap
              selectable={isEditing}
              center={latLng(location.lat, location.long)}
              pin={latLng(location.lat, location.long)}
              onSelect={(selected: LatLng) => {
                setLocation({
                  ...location,
                  lat: selected.lat,
                  long: selected.lng,
                });
              }}
            ></CustomMap>
            {/* <img
              src={baseImageUrl + location.photos[0]}
              className="aspect-square object-cover"
            ></img> */}
          </Paper>
          <div className="flex flex-col">
            <EditableText
              edit={isEditing}
              value={location.name}
              className="text-xl font-bold drop-shadow-2xl"
              onChange={(e) => setLocation({ ...location, name: e })}
            ></EditableText>
            <EditableText
              edit={isEditing}
              value={location.description}
              className="p-2 drop-shadow-2xl"
              onChange={(e) => setLocation({ ...location, description: e })}
            ></EditableText>
            {isEditing ? (
              <ButtonGroup variant="outlined" className="justify-end">
                <IconButton onClick={onSaveChanges}>
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={() => setSearchParams({})}>
                  <CancelIcon />
                </IconButton>
              </ButtonGroup>
            ) : (
              <Button variant="outlined">
                <ShareIcon /> Share
              </Button>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  ) : (
    "Not found!"
  );
}
