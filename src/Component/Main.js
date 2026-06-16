import { useState, useRef, useMemo } from "react";
import Task from "./Task";
import Add from "./Add";
import Edit from "./Edit";
import Delete from "./Delete";
import Categories from "./Categories";
import AlertMessage from "./AlertMessage";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

export default function Main() {
  const [tasks, setTasks] = useState(() => {
    let state = localStorage.getItem("tasks");
    return state ? JSON.parse(state) : [];
  });

  const [userInputAdd, setUserInputAdd] = useState({
    text: "",
    alreadyExist: false,
  });

  const [categories, setCategories] = useState(() => {
    let state = sessionStorage.getItem("categories");
    return state
      ? JSON.parse(state)
      : [
          { id: "all", text: "الكل", classActive: "active" },
          { id: "completed", text: "مُكتمل", classActive: "" },
          { id: "inCompleted", text: "غير مُكتمل", classActive: "" },
        ];
  });

  const [editTask, setEditTask] = useState({ status: false, text: "" });

  const [deleteTask, setDeleteTask] = useState({ status: false, id: "" });

  const [alert, setAlert] = useState({
    status: false,
    hide: false,
    text: "",
    severity: "",
  });

  const bookmarkAddedIconStatus = useMemo(() => {
    return tasks.length > 0 && tasks.every((e) => e.isCompleted);
  }, [tasks]);

  let showcategorieTasks =
    useMemo(() => {
      for (let i = 0; i < categories.length; i++) {
        const { id, classActive } = categories[i];
        if (id === "completed" && classActive === "active") {
          return tasks.filter((e) => e.isCompleted);
        }
        if (id === "inCompleted" && classActive === "active") {
          return tasks.filter((e) => !e.isCompleted);
        }
      }
    }, [categories, tasks]) ?? tasks;

  const commonPropsBasic = {
    tasks,
    setTasks,
    showAlert,
  };

  const commonProps = {
    ...commonPropsBasic,
    handleEditReset,
    userInputAdd,
    setUserInputAdd,
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
          <Categories
            bookmarkAddedIconStatus={bookmarkAddedIconStatus}
            categories={categories}
            setCategories={setCategories}
          />
          <Task
            arr={showcategorieTasks}
            handleClickDelete={handleClickDelete}
            handleClickEdit={handleClickEdit}
            {...commonPropsBasic}
          />
          <Add {...commonProps} />
        </div>
      </div>
      {editTask.status && <Edit {...commonProps} text={editTask.text} />}
      {deleteTask.status && <Delete {...commonProps} id={deleteTask.id} />}
    </>
  );

  function handleClickEdit(text) {
    setEditTask({ status: true, text: text });
  }

  function handleClickDelete(id) {
    setDeleteTask({ status: true, id: id });
  }

  function handleEditReset() {
    setEditTask({ status: false, text: "" });
    setDeleteTask({ status: false, id: "" });
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
      }, 4000);
    }, 300);
  }
}
