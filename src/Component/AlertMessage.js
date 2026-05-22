import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

export default function AlertMessage({ alert }) {
  return (
    <Alert
      style={{ fontSize: "16px" }}
      icon={
        <CheckIcon
          fontSize="inherit"
          style={{ position: "relative", left: "8px" }}
        />
      }
      variant="filled"
      severity={alert.severity}
      className="alert"
    >
      {alert.text}
    </Alert>
  );
}
