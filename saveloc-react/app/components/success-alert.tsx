import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type SuccessAlertProps = {
  message: string;
  open: boolean;
  onClickClose: () => void;
};
export default function SuccessAlert(props: SuccessAlertProps) {
  return (
    <Collapse in={props.open}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={props.onClickClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {props.message}
      </Alert>
    </Collapse>
  );
}
