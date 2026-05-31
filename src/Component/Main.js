import { useState, useRef } from "react";
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

  const [alert, setAlert] = useState({
    status: false,
    hide: false,
    text: "",
    severity: "",
  });

  const bookmarkAddedIconStatus =
    tasks.length > 0 && tasks.every((e) => e.isCompleted);

  let showcategorieTasks = tasks;

  for (let i = 0; i < categories.length; i++) {
    const { text, classActive } = categories[i];
    if (text === "مُكتمل" && classActive === "active") {
      showcategorieTasks = tasks.filter((e) => e.isCompleted);
      break;
    }
    if (text === "غير مُكتمل" && classActive === "active") {
      showcategorieTasks = tasks.filter((e) => !e.isCompleted);
      break;
    }
  }

  const commonProps = {
    handleEditReset,
    tasks,
    setTasks,
    userInputAdd,
    setUserInputAdd,
    showAlert,
  };

  const timeoutRefOne = useRef(null);
  const timeoutRefTwo = useRef(null);
  const timeoutRefThree = useRef(null);

  return (
    <>
      <AlertMessage alert={alert} />
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
          <ul>
            <Task
              arr={showcategorieTasks}
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
              disabled={userInputAdd.text === "" || userInputAdd.alreadyExist}
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
        </div>
      </div>

      {editTask.status && <Edit {...commonProps} text={editTask.text} />}
      {deleteTask.status && <Delete {...commonProps} id={deleteTask.id} />}
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
    if (timeoutRefOne.current) clearTimeout(timeoutRefOne.current);
    if (timeoutRefTwo.current) clearTimeout(timeoutRefTwo.current);
    if (timeoutRefThree.current) clearTimeout(timeoutRefThree.current);
    setAlert({
      status: true,
      hide: true,
      text: sentText,
      severity: state,
    });
    timeoutRefOne.current = setTimeout(() => {
      timeoutRefTwo.current = setTimeout(() => {
        setAlert((prev) => ({ ...prev, hide: false }));
        timeoutRefThree.current = setTimeout(() => {
          setAlert({
            status: false,
            hide: false,
            text: "",
            severity: "",
          });
        }, 300);
      }, 6000);
    }, 300);
  }

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
