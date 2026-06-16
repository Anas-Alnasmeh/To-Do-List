import { useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";

export default function Edit({
  handleEditReset,
  tasks,
  setTasks,
  text,
  userInputAdd,
  setUserInputAdd,
  showAlert,
}) {
  const [userInputEdit, setUserInputEdit] = useState({
    text: text,
    alreadyExist: false,
  });
  return (
    <>
      <div className="back-container" onClick={handleEditReset}></div>
      <div className="edit-box container">
        <button type="button" className="exit" onClick={handleEditReset}>
          ×
        </button>
        <h2>
          تعديل المهمة
          <EditNoteIcon
            fontSize="large"
            style={{ position: "relative", top: "10px", right: "5px" }}
          />
        </h2>
        <div>
          <input
            value={userInputEdit.text}
            autoFocus
            onChange={(e) => {
              const inputText = e.target.value;
              setUserInputEdit({
                text: inputText,
                alreadyExist: tasks.some(
                  ({ text }) => text === inputText.trim(),
                ),
              });
            }}
          />
          <button
            type="button"
            disabled={
              userInputEdit.text.trim() === "" ||
              userInputEdit.text === text ||
              userInputEdit.alreadyExist
            }
            onClick={() => {
              const newArr = tasks.map((e) => {
                return e.text === text
                  ? { ...e, text: userInputEdit.text.trim() }
                  : e;
              });
              setTasks(newArr);
              localStorage.setItem("tasks", JSON.stringify(newArr));
              setUserInputAdd({
                ...userInputAdd,
                alreadyExist: newArr.some(
                  ({ text }) => text === userInputAdd.text.trim(),
                ),
              });
              handleEditReset();
              showAlert("تم تعديل المهمة بنجاح", "info");
            }}
          >
            تعديل
          </button>
          <button type="button" onClick={handleEditReset}>
            رجوع
          </button>
          <div
            className="already-exist-edit"
            style={{
              opacity: userInputEdit.alreadyExist ? "1" : "0",
            }}
          >
            هذه المهمة موجودة مسبقا!
          </div>
        </div>
      </div>
    </>
  );
}
