export default function Delete({
  handleEditReset,
  tasks,
  setTasks,
  id,
  userInputAdd,
  setUserInputAdd,
  showAlert,
}) {
  return (
    <>
      <div className="edit-container" onClick={handleEditReset}></div>
      <div className="delete container">
        <button className="exit" onClick={handleEditReset}>
          ×
        </button>
        <div className="delete-box">
          <h2>هل أنت متأكد من رغبتك في حذف المهمة؟</h2>
          <div>
            <button
              onClick={() => {
                const newTasks = tasks.filter((e) => e.id !== id);
                setTasks(newTasks);
                localStorage.setItem("tasks", JSON.stringify(newTasks));
                setUserInputAdd({
                  ...userInputAdd,
                  alreadyExist: !newTasks.every(
                    ({ text }) => text !== userInputAdd.text,
                  ),
                });
                handleEditReset();
                showAlert("تم حذف المهمة!", "error");
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
