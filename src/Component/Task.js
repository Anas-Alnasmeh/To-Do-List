import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function Task({ arr, handleClickComplete, handleClickDelete }) {
  return arr.map((e) => (
    <li key={e.id}>
      {e.text}
      <div className="icons">
        <div
          onClick={() => handleClickComplete(e.id)}
          className="icon"
          style={{
            border: "2px solid #00b900",
            color: e.classCom === "com" ? "var(--primary)" : "#00b900",
            backgroundColor:
              e.classCom === "com" ? "#00b900" : "var(--primary)",
          }}
          title="تمت المهمة"
        >
          <CheckIcon />
        </div>
        <div
          className="icon"
          style={{ border: "2px solid #1010d7ed" }}
          title="تعديل المهمة"
        >
          <EditIcon style={{ color: "#1010d7ed" }} />
        </div>

        <div
          onClick={() => handleClickDelete(e.id)}
          className="icon"
          style={{ border: "2px solid #bc0000e3" }}
          title="حذف المهمة"
        >
          <DeleteForeverIcon style={{ color: "#bc0000e3" }} />
        </div>
      </div>
    </li>
  ));
}
