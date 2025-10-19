import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import type { PlaceResponse } from "~/common/types";
import PlacesService from "~/service/PlacesService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "./confirm-dialog";

const baseImageUrl = import.meta.env.VITE_BASE_API_URL + "file/";

type PlaceParameter = { location: PlaceResponse; parentCallback: Function };
const placesService = new PlacesService();

export default function Place({ location, parentCallback }: PlaceParameter) {
  const navigate = useNavigate();

  const [deleteDialog, setDeleteDialog] = useState(false);

  const onClickEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    navigate({ pathname: location.id, search: "edit=true" });
  };
  const onClickDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteDialog(true);
  };

  function deletePlace() {
    placesService.deletePlace(location.id).then(() => {
      parentCallback();
      setDeleteDialog(false);
    });
  }

  return (
    <>
      <Link to={location.id}>
        <Card
          className="group relative size-full aspect-square overflow-hidden rounded-2xl shadow-md"
          style={{
            backgroundImage: `url(${baseImageUrl + location.photos[0]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className=" size-full flex flex-col justify-between items-center">
            <div className="w-full flex justify-end invisible duration-200 group-hover:visible">
              <IconButton onClick={onClickEdit}>
                <EditIcon className="cursor-pointer" />
              </IconButton>
              <IconButton onClick={onClickDelete}>
                <DeleteIcon />
              </IconButton>
            </div>
            <h1 className="text-xl font-bold drop-shadow-2xl">
              {location.name}
            </h1>
            <p className="p-2 drop-shadow-2xl">{location.description}</p>
          </div>
          <div className="pointer-events-none absolute inset-0 duration-150 bg-black/40 group-hover:bg-transparent" />{" "}
        </Card>
      </Link>
      <ConfirmDialog
        open={deleteDialog}
        title="Delete"
        okBtnText="Delete"
        description={"Are you sure to delete " + location.name + "?"}
        onConfirm={deletePlace}
        onClose={() => setDeleteDialog(false)}
      ></ConfirmDialog>
    </>
  );
}
