import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function AlertMessage({ alert }) {
  return (
    <Alert
      style={{
        fontSize: "16px",
        opacity: alert.hide && alert.status ? "1" : "0",
        transform:
          alert.hide && alert.status ? "translateY(0)" : "translateY(25px)",
        transition: "all 300ms ease-in-out",
      }}
      icon={
        alert.severity === "error" ? (
          <DeleteForeverIcon
            fontSize="inherit"
            style={{ position: "relative", left: "8px" }}
          />
        ) : alert.severity === "info" ? (
          <EditIcon
            fontSize="inherit"
            style={{ position: "relative", left: "8px" }}
          />
        ) : (
          <CheckIcon
            fontSize="inherit"
            style={{ position: "relative", left: "8px" }}
          />
        )
      }
      variant="filled"
      severity={alert.severity}
      className="alert"
    >
      {alert.text}
    </Alert>
  );
}
