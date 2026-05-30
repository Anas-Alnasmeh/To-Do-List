import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function Task({
  arr,
  handleClickComplete,
  handleClickDelete,
  handleClickEdit,
}) {
  return arr.map((e) => (
    <li
      title={e.isCompleted ? "مُنجز" : "غير مُنجز"}
      key={e.id}
      style={{
        backgroundColor: e.isCompleted ? "#108910" : "rgba(0, 0, 121, 0.813)",
      }}
    >
      {e.text}
      <div className="icons">
        <div
          title={e.isCompleted ? "إلغاء الإنجاز" : "تحديد كمُنجز"}
          onClick={() => handleClickComplete(e.id)}
          className="icon"
          style={{
            border: "2px solid #00b900",
            color: e.isCompleted ? "var(--primary)" : "#00b900",
            backgroundColor: e.isCompleted ? "#00b900" : "var(--primary)",
          }}
        >
          <CheckIcon />
        </div>
        <div
          onClick={() => handleClickEdit(e.text)}
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
