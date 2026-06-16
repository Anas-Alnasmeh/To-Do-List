import { v4 as uniqueId } from "uuid";

export default function Add({
  userInputAdd,
  setUserInputAdd,
  tasks,
  setTasks,
  showAlert,
}) {
  return (
    <>
      <label htmlFor="new-task">مهمة جديدة</label>
      <div className="add-task">
        <input
          id="new-task"
          value={userInputAdd.text}
          onChange={handleUserInput}
          placeholder="أكتب مهمة..."
        />
        <button
          type="button"
          disabled={
            userInputAdd.text.trim() === "" || userInputAdd.alreadyExist
          }
          onClick={handleClickAdd}
        >
          إضافة مهمة
        </button>
      </div>
      <div
        className="already-exist"
        style={{
          opacity: userInputAdd.alreadyExist ? "1" : "0",
        }}
      >
        هذه المهمة موجودة مسبقا!
      </div>
    </>
  );

  function handleUserInput(e) {
    const inputText = e.target.value;
    setUserInputAdd({
      text: inputText,
      alreadyExist: tasks.some(({ text }) => text === inputText.trim()),
    });
  }

  function handleClickAdd() {
    const newObject = {
      id: uniqueId(),
      text: userInputAdd.text.trim(),
      isCompleted: false,
    };
    setTasks([...tasks, newObject]);
    localStorage.setItem("tasks", JSON.stringify([...tasks, newObject]));
    setUserInputAdd({
      text: "",
      alreadyExist: false,
    });
    showAlert("تمت إضافة المهمة بنجاح", "success");
  }
}
