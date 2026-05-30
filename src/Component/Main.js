// add alert to any procress (add, edit, delete) to make sure the user know what is going on
// popup problem
// Add number up to categories such as: (5 => all, 3 => completed, 2 => uncompleted)

//

import { useState } from "react";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { v4 as uuidv4 } from "uuid";
import Task from "./Task";
import Edit from "./Edit";
import Delete from "./Delete";
import AlertMessage from "./AlertMessage";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

export default function Main() {
  const [tasks, setTasks] = useState(
    localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : [],
  );

  const [userInputAdd, setUserInputAdd] = useState({
    text: "",
    alreadyExist: false,
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

  const [editTask, setEditTask] = useState({ status: false, text: "" });

  const [deleteTask, setDeleteTask] = useState({ status: false, id: "" });

  const [alert, setAlert] = useState({ status: false, text: "", severity: "" });

  const bookmarkAddedIconStatus = tasks.every((e) => e.isCompleted);

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
                  {text === "الكل" && (
                    <BookmarkAddedIcon
                      titleAccess={
                        bookmarkAddedIconStatus ? "جميع المهام مُكتملة" : ""
                      }
                      className="bookmarkAddedIcon"
                      fontSize="small"
                      style={{
                        transition: "var(--transition)",
                        opacity: bookmarkAddedIconStatus ? "1" : "0",
                      }}
                    />
                  )}
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
                <button
                  disabled={
                    userInputAdd.text === "" || userInputAdd.alreadyExist
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
          ) : categories[1].classActive === "active" ? (
            <ul>
              <Task
                arr={tasks.filter((e) => e.isCompleted)}
                handleClickComplete={handleClickComplete}
                handleClickDelete={handleClickDelete}
                handleClickEdit={handleClickEdit}
              />
            </ul>
          ) : (
            <ul>
              <Task
                arr={tasks.filter((e) => !e.isCompleted)}
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
          text={editTask.text}
          userInputAdd={userInputAdd}
          setUserInputAdd={setUserInputAdd}
          showAlert={showAlert}
        />
      ) : deleteTask.status ? (
        <Delete
          handleEditReset={handleEditReset}
          tasks={tasks}
          setTasks={setTasks}
          id={deleteTask.id}
          userInputAdd={userInputAdd}
          setUserInputAdd={setUserInputAdd}
          showAlert={showAlert}
        />
      ) : (
        <></>
      )}
    </>
  );

  function handleClickEdit(text) {
    setEditTask({ status: true, text: text });
  }

  function handleEditReset() {
    setEditTask({ status: false, text: "" });
    setDeleteTask({ status: false, id: "" });
  }

  function handleUserInput(e) {
    const inputText = e.target.value;
    setUserInputAdd({
      text: inputText,
      alreadyExist: !tasks.every(({ text }) => text !== inputText),
    });
  }

  function handleClickAdd() {
    if (!userInputAdd.alreadyExist) {
      const newObject = {
        id: uuidv4(),
        text: userInputAdd.text,
        isCompleted: false,
      };
      setTasks([...tasks, newObject]);
      localStorage.setItem("tasks", JSON.stringify([...tasks, newObject]));
      setUserInputAdd({ ...userInputAdd, text: "" });
      showAlert("تمت إضافة المهمة بنجاح", "success");
    }
  }

  function showAlert(sentText, state) {
    setAlert({
      status: true,
      text: sentText,
      severity: state,
    });
    setTimeout(
      () =>
        setAlert(() => {
          return { status: false, text: "", severity: "" };
        }),
      6000,
    );
  }

  function handleClickComplete(id) {
    const newArr = tasks.map((task) => {
      return task.id === id
        ? { ...task, isCompleted: !task.isCompleted }
        : task;
    });
    setTasks(newArr);
    localStorage.setItem("tasks", JSON.stringify(newArr));
  }

  function handleClickDelete(id) {
    setDeleteTask({ status: true, id: id });
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
