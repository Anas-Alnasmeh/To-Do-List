export default function Delete({
  handleEditReset,
  tasks,
  setTasks,
  deleteTask,
}) {
  return (
    <>
      <div className="edit-container" onClick={handleEditReset}></div>
      <div className="container">
        <button className="exit" onClick={handleEditReset}>
          ×
        </button>
        <div className="delete-box">
          <h2>هل أنت متأكد من رغبتك في حذف المهمة؟</h2>
          <div>
            <button
              onClick={() => {
                const newTasks = tasks.filter((e) => e.id !== deleteTask.id);
                setTasks(newTasks);
                localStorage.setItem("tasks", JSON.stringify(newTasks));
                handleEditReset();
              }}
            >
              حذف
            </button>
            <button onClick={handleEditReset}>إلغاء</button>
          </div>
        </div>
      </div>
    </>
  );
}
