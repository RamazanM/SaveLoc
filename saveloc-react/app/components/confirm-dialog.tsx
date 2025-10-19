import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type ConfirmDialogProps = {
  open: boolean;
  onConfirm: () => any;
  onClose: () => any;
  description: string;
  title: string;
  okBtnText: string;
};

export default function ConfirmDialog(props: ConfirmDialogProps) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={props.onClose}>
          Cancel
        </Button>
        <Button onClick={props.onConfirm} autoFocus>
          {props.okBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
