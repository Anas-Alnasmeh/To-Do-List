import { useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";

export default function Edit({ handleEditReset, tasks, setTasks, editTask }) {
  const [userInput, setUserInput] = useState(editTask.element.text);
  return (
    <>
      <div className="edit-container" onClick={handleEditReset}></div>
      <div className="edit-box container">
        <button className="exit" onClick={handleEditReset}>
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
            value={userInput}
            autoFocus
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
          <button
            onClick={() => {
              if (userInput !== "") {
                let newObj;
                const newArr = [...tasks];
                for (let i = 0; i < tasks.length; i++) {
                  if (tasks[i].text === editTask.element.text) {
                    newObj = { ...tasks[i] };
                    newObj.text = userInput;
                    newArr[i] = newObj;
                    break;
                  }
                }
                setTasks(newArr);
                localStorage.setItem("tasks", JSON.stringify(newArr));
                handleEditReset();
              }
            }}
          >
            تعديل
          </button>
          <button onClick={handleEditReset}>رجوع</button>
        </div>
      </div>
    </>
  );
}
