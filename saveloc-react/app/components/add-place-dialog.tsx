import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import type { CreatePlaceRequest } from "~/common/types";
import PhotoUploadService from "~/service/PhotoUploadService";
import PlacesService from "~/service/PlacesService";
import CustomMap from "./custom-map";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import type { OsmSearchResult } from "~/service/MapService";
import MapService from "~/service/MapService";
import { latLng, LatLng } from "leaflet";
import Card from "@mui/material/Card";
import UploadFile from "./upload-file-component";

type AddPlaceDialogProps = { open: boolean; onClose: () => void };
export default function AddPlaceDialog(props: AddPlaceDialogProps) {
  const placeService = new PlacesService();
  const mapService = new MapService();

  const [formData, setFormData] = useState<CreatePlaceRequest>({
    name: "",
    description: "",
    lat: 1,
    long: 1,
    photos: [],
  });
  const [searchLoc, setSearchLoc] = useState<string>("");
  const [searchRes, setSearchRes] = useState<OsmSearchResult[] | null>(null);
  const [selectedLoc, setSelectedLoc] = useState<LatLng | null>(null);

  function updatePhotoIds(fileIds: string[]) {
    setFormData({ ...formData, photos: fileIds });
  }

  function search() {
    mapService.search(searchLoc).then((res) => setSearchRes(res));
  }

  function selectLocation(id: number) {
    setSearchRes(null);
    setSelectedLoc(
      latLng(parseFloat(searchRes![id].lat), parseFloat(searchRes!.at(id)!.lon))
    );
    setFormData({
      ...formData,
      lat: parseFloat(searchRes![id].lat),
      long: parseFloat(searchRes!.at(id)!.lon),
    });
  }

  function submit() {
    placeService
      .addPlace(formData)
      .then((res) => {
        console.log(res);
        props.onClose();
      })
      .catch((err) => console.log(err));
  }
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Add Location</DialogTitle>
      <DialogContent className="flex flex-col gap-4 overflow-y-scroll">
        <DialogContentText>Add a new location</DialogContentText>
        <TextField
          label="Title"
          fullWidth
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        ></TextField>
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        ></TextField>
        <div className="flex flex-col">
          <TextField
            label="Search location."
            value={searchLoc}
            onChange={(e) => setSearchLoc(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter") search();
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton onClick={search}>
                    <SearchIcon />
                  </IconButton>
                ),
              },
            }}
          ></TextField>
          <Card className="flex flex-col pl-5 pr-5 hover:bg-blue-950 cursor-pointer border-2 ">
            {searchRes?.map((item, index) => {
              return (
                <div
                  className=""
                  onClick={() => selectLocation(index)}
                  key={index}
                >
                  <p>{item.name}</p>
                </div>
              );
            })}
          </Card>
        </div>

        <CustomMap
          selectable={true}
          center={selectedLoc}
          pin={selectedLoc}
          onSelect={(selectedLoc) => {
            setFormData({
              ...formData,
              lat: selectedLoc.lat,
              long: selectedLoc.lng,
            });
          }}
        ></CustomMap>
        <div>
          <UploadFile onFileListUpdated={updatePhotoIds} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={submit} type="submit" form="subscription-form">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
