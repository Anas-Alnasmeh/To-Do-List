import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function Task({
  arr,
  handleClickDelete,
  handleClickEdit,
  tasks,
  setTasks,
  showAlert,
}) {
  const arrList = arr.map((e) => (
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
          title="تعديل المهمة"
          onClick={() => handleClickEdit(e.text)}
          className="icon"
          style={{ border: "2px solid #1010d7ed" }}
        >
          <EditIcon style={{ color: "#1010d7ed" }} />
        </div>

        <div
          title="حذف المهمة"
          onClick={() => handleClickDelete(e.id)}
          className="icon"
          style={{ border: "2px solid #bc0000e3" }}
        >
          <DeleteForeverIcon style={{ color: "#bc0000e3" }} />
        </div>
      </div>
    </li>
  ));

  return <ul>{arrList}</ul>;

  function handleClickComplete(id) {
    let show;
    const newArr = tasks.map((task) => {
      if (task.id === id) {
        show = task.isCompleted;
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newArr);
    localStorage.setItem("tasks", JSON.stringify(newArr));
    showAlert(
      show ? "تم إلغاء إنجاز المهمة!" : "تم تحديد المهمة كمُنجز",
      "info",
    );
  }
}
