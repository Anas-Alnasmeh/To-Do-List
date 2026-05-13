import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function Task({
  arr,
  status,
  handleClickComplete,
  handleClickDelete,
}) {
  const mystate = status === "all" || status === "unComplete";
  return arr.map((e) => (
    <li key={e.id}>
      {e.text}
      <div className="icons">
        <div
          onClick={() => handleClickComplete(e.id)}
          className="icon"
          style={{
            border: "2px solid #00b900",
            color: mystate ? "#00b900" : "var(--primary)",
            backgroundColor: mystate ? "var(--primary)" : "#00b900",
          }}
          title="تمت المهمة"
        >
          <CheckIcon />
        </div>
        {status === "all" ? (
          <div
            className="icon"
            style={{ border: "2px solid #1010d7ed" }}
            title="تعديل المهمة"
          >
            <EditIcon style={{ color: "#1010d7ed" }} />
          </div>
        ) : (
          <></>
        )}
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
