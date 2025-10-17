import Button from "@mui/material/Button";
import Dialog, { type DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import type { CreatePlaceRequest } from "~/common/types";
import PhotoUploadService from "~/service/PhotoUploadService";
import PlacesService from "~/service/PlacesService";

export default function AddPlaceDialog(props: DialogProps) {
  const placeService = new PlacesService()
  const photoService = new PhotoUploadService()

  const [formData, setFormData] = useState<CreatePlaceRequest>({
    name: "",
    description: "",
    lat: 1,
    long: 1,
    photos: [],
  });
  const [photos, setPhotos] = useState<Array<File>>()

  function handlePhotoUpload(e:React.ChangeEvent<HTMLInputElement>){
    const fileList:FileList = e.target.files || new FileList()
    let files = Array<File>()
    for (let i = 0; i < fileList.length; i++) {
      files.push(fileList.item(i)!)
    }
    setPhotos(files)
    photoService.uploadPhoto(files[0]).then((res) =>{
      const newPhotoList = formData.photos
      newPhotoList.push(res.id)
      setFormData({...formData, photos:newPhotoList})
    })
  } 

  function submit() {
    placeService.addPlace(formData).then(res=>console.log(res)).catch(err=>console.log(err))
  }
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Add Location</DialogTitle>
      <DialogContent className="flex flex-col gap-4">
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
        <div className="flex flex-row gap-2">
          <TextField
            label="Lat"
            fullWidth
            value={formData.lat}
            onChange={(e) => setFormData({ ...formData, lat: parseFloat(e.target.value) })}
          ></TextField>
          <TextField
            label="Long"
            fullWidth
            value={formData.long}
            onChange={(e) => setFormData({ ...formData, long: parseFloat(e.target.value) })}
          ></TextField>
        </div>
        <div>
            <input type="file" onChange={handlePhotoUpload}/>
            {photos?.map((photo, index)=>
              (
              <img src={URL.createObjectURL(photo)} key={index}/>
            )
            )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={submit} type="submit" form="subscription-form">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
