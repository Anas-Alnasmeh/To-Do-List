// activation all buttons from all categories
// in userInput: maybe displayStatus not interset yet
// add alert to any procress (add, edit, delete) to make sure the user know what is going on
// already exist alert in add task, maybe add it to edit task as well
// already exist maybe user input empty, add alert for that as well

//

import { useState } from "react";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { v4 as uuidv4 } from "uuid";
import Task from "./Task";
import Edit from "./Edit";
import AlertMessage from "./AlertMessage";

export default function Main() {
  const [tasks, setTasks] = useState(
    localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : [],
  );

  const [userInputAdd, setUserInputAdd] = useState({
    text: "",
    displayStatus: "none",
  });

  const [categories, setCategories] = useState(
    sessionStorage.getItem("categories")
      ? JSON.parse(sessionStorage.getItem("categories"))
      : [
          { id: uuidv4(), text: "الكل", classActive: "active" },
          { id: uuidv4(), text: "مُكتمل", classActive: "" },
          { id: uuidv4(), text: "غير مُكتمل", classActive: "" },
        ],
  );

  const [editTask, setEditTask] = useState({ status: false, id: "" });

  const [alert, setAlert] = useState({ status: false, text: "", severity: "" });

  return (
    <>
      {alert.status && <AlertMessage alert={alert} />}
      <div className="container">
        <div className="tasks-box">
          <h1>
            قائمة مهامي
            <ReceiptLongIcon
              fontSize="large"
              style={{ position: "relative", top: "8px", right: "5px" }}
            />
          </h1>
          <hr />
          <div className="categories">
            {categories.map(({ id, text, classActive }) => {
              return (
                <button
                  key={id}
                  onClick={() => handleCategories(id)}
                  className={classActive}
                >
                  {text}
                </button>
              );
            })}
          </div>
          {categories[0].classActive === "active" ? (
            <>
              <ul>
                <Task
                  arr={tasks}
                  handleClickComplete={handleClickComplete}
                  handleClickDelete={handleClickDelete}
                  handleClickEdit={handleClickEdit}
                />
              </ul>
              <label htmlFor="new-task">مهمة جديدة</label>
              <div className="add-task">
                <input
                  id="new-task"
                  value={userInputAdd.text}
                  onChange={handleUserInput}
                  placeholder="أكتب مهمة..."
                />
                <button onClick={handleClickAdd}>إضافة مهمة</button>
              </div>
              <div
                className="already-exist"
                style={{
                  display: !tasks.every(
                    ({ text }) => text !== userInputAdd.text,
                  )
                    ? "block"
                    : "none",
                }}
              >
                هذه المهمة موجودة مسبقا!
              </div>
            </>
          ) : categories[1].classActive === "active" ? (
            <ul>
              <Task
                arr={tasks.filter((e) => e.classCom === "com")}
                handleClickComplete={handleClickComplete}
                handleClickDelete={handleClickDelete}
                handleClickEdit={handleClickEdit}
              />
            </ul>
          ) : (
            <ul>
              <Task
                arr={tasks.filter((e) => e.classCom !== "com")}
                handleClickComplete={handleClickComplete}
                handleClickDelete={handleClickDelete}
                handleClickEdit={handleClickEdit}
              />
            </ul>
          )}
        </div>
      </div>
      {editTask.status ? (
        <Edit
          handleEditReset={handleEditReset}
          tasks={tasks}
          setTasks={setTasks}
          editTask={editTask}
        />
      ) : (
        <></>
      )}
    </>
  );

  function handleClickEdit(e) {
    setEditTask({ status: true, element: e });
  }

  function handleEditReset() {
    setEditTask({ status: false, element: {} });
  }

  function handleUserInput(e) {
    const inputText = e.target.value;
    setUserInputAdd({
      text: inputText,
      displayStatus: "none",
    });
    if (!tasks.every(({ text }) => text !== inputText)) {
      setUserInputAdd({
        text: inputText,
        displayStatus: "block",
      });
    }
  }

  function handleClickAdd() {
    if (
      userInputAdd.text !== "" &&
      tasks.every(({ text }) => text !== userInputAdd.text)
    ) {
      const newObject = { id: uuidv4(), text: userInputAdd.text, classCom: "" };
      setTasks([...tasks, newObject]);
      localStorage.setItem("tasks", JSON.stringify([...tasks, newObject]));
      setUserInputAdd({ ...userInputAdd, text: "" });
      setAlert({
        status: true,
        text: "تمت إضافة المهمة بنجاح!",
        severity: "success",
      });
      setTimeout(
        () =>
          setAlert(() => {
            return { status: false, text: "", severity: "" };
          }),
        5000,
      );
    }
  }

  function handleClickComplete(id) {
    let newObj;
    const newArr = [...tasks];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        newObj = { ...tasks[i] };
        newObj.classCom === "com"
          ? (newObj.classCom = "")
          : (newObj.classCom = "com");
        newArr[i] = newObj;
        setTasks(newArr);
        localStorage.setItem("tasks", JSON.stringify(newArr));
        break;
      }
    }
  }

  function handleClickDelete(id) {
    const newTasks = tasks.filter((e) => e.id !== id);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  function handleCategories(id) {
    const newArr = categories.map((cat) => {
      return cat.id === id
        ? { ...cat, classActive: "active" }
        : { ...cat, classActive: "" };
    });
    setCategories(newArr);
    sessionStorage.setItem("categories", JSON.stringify(newArr));
  }
}
