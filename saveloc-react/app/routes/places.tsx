import type { PlaceResponse } from "~/common/types";
import type { Route } from "./+types/home";
import ProtectedRoute from "./protected-route";
import Card from "@mui/material/Card";
import { Link } from "react-router";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import AddPlaceDialog from "~/components/add-place-dialog";
import PlacesService from "~/service/PlacesService";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "SaveLoc - Places" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
const baseImageUrl = import.meta.env.VITE_BASE_API_URL+"file/"

type PlaceParameter = { location: PlaceResponse}

function Place({location}:PlaceParameter) {
  return (
    <Link to={"place/" + location.id}>
      <Card
        className="relative size-full aspect-square overflow-hidden rounded-2xl shadow-md"
        style={{
          backgroundImage: `url(${baseImageUrl+location.photos[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="size-full flex flex-col justify-between items-center">
          <h1 className="text-xl font-bold drop-shadow-2xl">{location.name}</h1>
          <p className="p-2 drop-shadow-2xl">{location.description}</p>
        </div>
        <div className="absolute inset-0 bg-black/40 hover:bg-transparent" />{" "}
      </Card>
    </Link>
  );
}

export default function Places() {
  const [showModal, setShowModal] = useState(false);
  const [places, setPlaces] = useState<PlaceResponse[]>();
  const placesService = new PlacesService();
  useEffect(()=>{
    placesService.getPlaces().then((resp=>{setPlaces(resp)}))
  }, []);

  function onFabClick() {
    setShowModal(true);
  }
  function close() {
    setShowModal(false);
  }
  return (
    <ProtectedRoute>
      <div className="max-h-svh p-10 pt-20 grid grid-cols-3 gap-5 overflow-scroll">
        {places?.map((data, index) => (<Place location={data} ></Place>))}
      </div>
      <div className="fixed bottom-15 right-15">
        <Fab color="primary" aria-label="add" onClick={onFabClick}>
          <AddIcon />
        </Fab>
      </div>
      <AddPlaceDialog open={showModal} onClose={close}></AddPlaceDialog>
    </ProtectedRoute>
  );
}
