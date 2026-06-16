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
      <div className="back-container" onClick={handleEditReset}></div>
      <div className="delete container">
        <button type="button" className="exit" onClick={handleEditReset}>
          ×
        </button>
        <div className="delete-box">
          <h2>هل أنت متأكد من رغبتك في حذف المهمة؟</h2>
          <div>
            <button
              type="button"
              onClick={() => {
                const newTasks = tasks.filter((e) => e.id !== id);
                setTasks(newTasks);
                localStorage.setItem("tasks", JSON.stringify(newTasks));
                setUserInputAdd({
                  ...userInputAdd,
                  alreadyExist: newTasks.some(
                    ({ text }) => text === userInputAdd.text.trim(),
                  ),
                });
                handleEditReset();
                showAlert("تم حذف المهمة!", "error");
              }}
            >
              حذف
            </button>
            <button type="button" onClick={handleEditReset}>
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
