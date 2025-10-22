import LinearProgress from "@mui/material/LinearProgress";
import { useState, type ChangeEvent, type DragEvent } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import PhotoUploadService from "~/service/PhotoUploadService";
import type { AxiosError } from "axios";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";

const photoUploadService = new PhotoUploadService();
const maxUploadSize = import.meta.env.VITE_MAX_FILE_UPLOAD_SIZE;
type SnackbarState = {open:boolean,message:string}
type UploadFileProps = { onFileListUpdated: (files: string[]) => void };
class FileUpload {
  constructor(
    public file: File,
    public status: "success" | "fail" | "uploading",
    public progress: number,
    public error: string | null = null,
    public fileId: string | null = null
  ) {}
}

export default function UploadFile(props: UploadFileProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [snackBarState, setSnackbarState]= useState<SnackbarState>({open:false,message:""})

  function addFiles(eventFiles: File[]) {
            console.log("Add Files",eventFiles);
            console.log("Max Upload Size",maxUploadSize);

    if (eventFiles.some((it) => it.size >= maxUploadSize)) {
        console.log("Snackbar");
        
      showSnackbar(
        "Maximum upload limit is 21MB. Please upload another image."
      );
    }
    const newFiles = files.concat(
      eventFiles
        .filter((it) => it.size < maxUploadSize)
        .map((it) => new FileUpload(it, "uploading", 0))
    );
    setFiles(newFiles);
    eventFiles.filter(it=>it.size<maxUploadSize).forEach((file, index) => {
        console.log("Size:",file.size);
        
      photoUploadService
        .uploadPhoto(file, (newProgress) => {
          console.log(newProgress);

          setFiles((prev: FileUpload[]) => {
            let newState = [...prev];
            let index = newState.findIndex((it) => it.file.name == file.name);
            newState[index] = {
              ...prev[index],
              progress: newProgress.progress || 0,
            };
            console.log("After progress:", newState);
            return newState;
          });
        })
        .then((res) => {
          setFiles((prev) => {
            console.log("successfully completed");

            let newState = [...prev];
            let index = newState.findIndex((it) => it.file.name == file.name);
            newState[index] = {
              ...prev[index],
              status: "success",
              fileId: res.id,
            };
            props.onFileListUpdated(
              newState
                .filter((file) => file.fileId != null)
                .map((file) => file.fileId!)
            );
            return newState;
          });
        })
        .catch((err: AxiosError) => {
          console.log("Error:", err);

          setFiles((prev) => {
            let newState = [...prev];
            let index = newState.findIndex((it) => it.file.name == file.name);
            newState[index] = {
              ...prev[index],
              status: "fail",
              error: err.message,
            };
            return newState;
          });
        });
    });
  }
  function deleteFile(file: FileUpload) {
    //TODO: Add deletefile endpoint to delete from server as well.
    let newFiles = [...files];
    newFiles.splice(
      newFiles.findIndex((it) => it.file == file.file),
      1
    );
    props.onFileListUpdated(
      newFiles.filter((file) => file.fileId != null).map((file) => file.fileId!)
    );
    setFiles(newFiles);
  }

  function showSnackbar(msg: string) {
    setSnackbarState({open:true, message:msg})
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    setIsDragging(true);
    e.preventDefault();
  }
  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);

    let eventFiles = [];
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      eventFiles.push(e.dataTransfer.files[i]);
    }
    addFiles(eventFiles);
  }
  function handleFileInput(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    let eventFiles: File[] = [];
    for (let i = 0; i < (e.target.files?.length || 0); i++) {
      if (e.target.files?.item(i) != undefined)
        eventFiles.push(e.target.files.item(i)!);
    }
    addFiles(eventFiles);
  }

  return (
    <div>
      <div
        className={
          "w-full h-20 flex flex-col justify-center content-center items-center " +
          (isDragging ? " bg-blue-400 " : " bg-gray-900 ")
        }
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnd={() => setIsDragging(false)}
        onDragExit={() => setIsDragging(false)}
        onDragLeave={() => setIsDragging(false)}
      >
        Drag & Drop Photos
        <input
          type="file"
          hidden
          id="browse"
          onChange={handleFileInput}
          accept=".jpg,.png,"
          multiple
        />
        <label htmlFor="browse" className="browse-btn">
          or Browse files
        </label>
      </div>
      <div
        id="photos-section"
        className="grid grid-cols-3 gap-3 justify-between"
      >
        {files?.map((file, index) => {
          switch (file.status) {
            case "uploading":
            case "success":
              return (
                <div key={index} className="group relative">
                  <div
                    onClick={() => deleteFile(file)}
                    className="absolute right-0 top-0 cursor-pointer invisible opacity-0 transition-all duration-75 delay-150 group-hover:visible group-hover:opacity-100"
                  >
                    <DeleteIcon />
                  </div>
                  <img
                    className="size-30 aspect-square object-cover"
                    src={URL.createObjectURL(file.file)}
                    alt={file.file.name}
                  />
                  <LinearProgress
                    variant="determinate"
                    color={file.status == "success" ? "success" : "warning"}
                    value={file.progress * 100}
                  />
                </div>
              );
            case "fail":
              return (
                <div
                  key={index}
                  className="group relative flex justify-center items-center"
                >
                  <div
                    onClick={() => deleteFile(file)}
                    className="absolute right-0 top-0 cursor-pointer invisible opacity-0 transition-all duration-75 delay-150 group-hover:visible group-hover:opacity-100"
                  >
                    <DeleteIcon />
                  </div>
                  <Tooltip title={file.error}>
                    <ErrorIcon color="error" sx={{ fontSize: 100 }} />
                  </Tooltip>
                </div>
              );
          }
        })}
      </div>
            <Snackbar
        open={snackBarState.open}
        autoHideDuration={6000}
        onClose={()=>setSnackbarState({open:false,message:""})}
        message={snackBarState.message}
      />
    </div>
  );
}
