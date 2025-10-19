import type { PlaceResponse } from "~/common/types";
import type { Route } from "./+types/home";
import ProtectedRoute from "./protected-route";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import AddPlaceDialog from "~/components/add-place-dialog";
import PlacesService from "~/service/PlacesService";
import Place from "~/components/place-card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SaveLoc - Places" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
const placesService = new PlacesService();

export default function Places() {
  const [showModal, setShowModal] = useState(false);
  const [places, setPlaces] = useState<PlaceResponse[]>();

  useEffect(() => {
    placesService.getPlaces().then((resp) => {
      setPlaces(resp);
    });
  }, []);

  return (
    <ProtectedRoute>
      <div className="max-h-svh p-10 pt-20 grid grid-cols-3 gap-5 overflow-scroll">
        {places?.map((data, index) => (
          <Place
            key={index}
            location={data}
            parentCallback={() => {
              placesService.getPlaces().then((resp) => {
                setPlaces(resp);
              });
            }}
          ></Place>
        ))}
      </div>
      <div className="fixed bottom-15 right-15">
        <Fab
          color="primary"
          onClick={() => setShowModal(true)}
        >
          <AddIcon />
        </Fab>
      </div>
      <AddPlaceDialog
        open={showModal}
        onClose={() => setShowModal(false)}
      ></AddPlaceDialog>
    </ProtectedRoute>
  );
}
