import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

// Error the same key
if (localStorage.getItem("tasks")) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  let count = 0;
  const newArr = tasks.map((e) => {
    return { ...e, id: count++ };
  });
  localStorage.setItem("tasks", JSON.stringify(newArr));
}

// count of task
let idCount = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.tasks).length
  : 0;

export default function Main() {
  const [userInputAdd, setUserInputAdd] = useState({
    text: "",
    displayStatus: "none",
  });

  const [tasks, setTasks] = useState(
    localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : [],
  );

  const [categories, setCategories] = useState([
    { id: 1, text: "الكل", classActive: "active" },
    { id: 2, text: "مُكتمل", classActive: "" },
    { id: 3, text: "غير مُكتمل", classActive: "" },
  ]);

  const tasksList = tasks.map((e) => (
    <li key={e.id}>
      {e.text}
      <div className="icons">
        <div
          onClick={handleClickSuccess}
          className="icon"
          style={{ border: "2px solid green" }}
          title="تمت المهمة"
        >
          <CheckIcon style={{ color: "green" }} />
        </div>
        <div
          className="icon"
          style={{ border: "2px solid #1010d7ed" }}
          title="تعديل المهمة"
        >
          <EditIcon style={{ color: "#1010d7ed" }} />
        </div>
        <div
          onClick={() => handleClickDelete(e.id)}
          className="icon"
          style={{ border: "2px solid #bc0000e3" }}
          title="حذف المهمة"
        >
          <DeleteForeverIcon style={{ color: "#bc0000e3" }} />
        </div>
      </div>
    </li>
  ));

  return (
    <div className="container">
      <div className="tasks-box">
        <h1>
          قائمة مهامي
          <SearchIcon
            fontSize="large"
            style={{ position: "relative", top: "10px" }}
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
        <ul>{tasksList}</ul>
        <label htmlFor="new-task">مهمة جديدة</label>
        <div className="add-task">
          <input
            id="new-task"
            value={userInputAdd.text}
            onChange={(e) => {
              setUserInputAdd({ text: e.target.value, displayStatus: "none" });
              if (!tasks.every(({ text }) => text !== e.target.value)) {
                setUserInputAdd({
                  text: e.target.value,
                  displayStatus: "block",
                });
              }
            }}
            placeholder="أكتب مهمة..."
          />
          <button onClick={handleClickAdd}>إضافة مهمة</button>
        </div>
        <div
          className="already-exist"
          style={{ display: userInputAdd.displayStatus }}
        >
          هذه المهمة موجودة مسبقا!
        </div>
      </div>
    </div>
  );

  function handleClickAdd() {
    if (
      userInputAdd.text !== "" &&
      tasks.every(({ text }) => text !== userInputAdd.text)
    ) {
      const newObject = { id: idCount, text: userInputAdd.text };
      setTasks([...tasks, newObject]);
      idCount++;
      localStorage.setItem("tasks", JSON.stringify([...tasks, newObject]));
      setUserInputAdd({ ...userInputAdd, text: "" });
    }
  }

  function handleClickDelete(id) {
    const newTasks = tasks.filter((e) => e.id !== id);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  function handleClickSuccess(e) {
    // console.log(tasksList);
  }

  function handleCategories(id) {
    const newArr = categories.map((cat) => {
      return cat.id === id
        ? { ...cat, classActive: "active" }
        : { ...cat, classActive: "" };
    });
    setCategories(newArr);
  }
}
