// activation all buttons from all categories
// edit tasks
// click to uncomplete task
// replace maping function with component file
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { v4 as uuidv4 } from "uuid";

// localStorage.clear();

export default function Main() {
  const [tasks, setTasks] = useState(
    localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : [],
  );

  const completeTasks = localStorage.getItem("completeTasks")
    ? JSON.parse(localStorage.getItem("completeTasks"))
    : [];

  let arrAll = [...tasks];

  let arrCompleted = [...completeTasks];

  let unCompleteTasks = [];

  arrAll = arrAll.sort((a, b) => a.text.localeCompare(b.text));
  arrCompleted = arrCompleted.sort((a, b) => a.text.localeCompare(b.text));

  while (arrAll.length > 0) {
    if (arrAll[0].text !== arrCompleted[0]?.text) {
      unCompleteTasks.push(arrAll[0]);
      arrAll.shift();
    } else {
      arrAll.shift();
      arrCompleted.shift();
    }
  }

  // console.log(unCompleteTasks);

  const [userInputAdd, setUserInputAdd] = useState({
    text: "",
    displayStatus: "none",
  });

  const [categories, setCategories] = useState([
    { id: uuidv4(), text: "الكل", classActive: "active" },
    { id: uuidv4(), text: "مُكتمل", classActive: "" },
    { id: uuidv4(), text: "غير مُكتمل", classActive: "" },
  ]);

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
        {categories[0].classActive === "active" ? (
          <>
            <ul>{maping(tasks, "all")}</ul>
            <label htmlFor="new-task">مهمة جديدة</label>
            <div className="add-task">
              <input
                id="new-task"
                value={userInputAdd.text}
                onChange={(e) => {
                  setUserInputAdd({
                    text: e.target.value,
                    displayStatus: "none",
                  });
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
          </>
        ) : categories[1].classActive === "active" ? (
          <ul>{maping(completeTasks, "complete")}</ul>
        ) : (
          <ul>{maping(unCompleteTasks, "unComplete")}</ul>
        )}
      </div>
    </div>
  );

  function handleClickAdd() {
    if (
      userInputAdd.text !== "" &&
      tasks.every(({ text }) => text !== userInputAdd.text)
    ) {
      const newObject = { id: uuidv4(), text: userInputAdd.text };
      setTasks([...tasks, newObject]);
      localStorage.setItem("tasks", JSON.stringify([...tasks, newObject]));
      setUserInputAdd({ ...userInputAdd, text: "" });
    }
  }

  function handleClickDelete(id) {
    const newTasks = tasks.filter((e) => e.id !== id);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    const newCompTasks = completeTasks.filter((e) => e.id !== id);
    localStorage.setItem("completeTasks", JSON.stringify(newCompTasks));
  }

  function handleClickComplete(id) {
    let newObj;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        newObj = tasks[i];
        break;
      }
    }
    if (completeTasks.every(({ text }) => text !== newObj.text)) {
      completeTasks.push(newObj);
      localStorage.setItem("completeTasks", JSON.stringify(completeTasks));
    }
  }

  function handleCategories(id) {
    const newArr = categories.map((cat) => {
      return cat.id === id
        ? { ...cat, classActive: "active" }
        : { ...cat, classActive: "" };
    });
    setCategories(newArr);
  }

  function maping(arr, status) {
    const mystate = status === "all" || status === "unComplete";
    return arr.map((e) => (
      <li key={e.id}>
        {e.text}
        <div className="icons">
          <div
            onClick={() => handleClickComplete(e.id)}
            className="icon"
            style={{
              border: "2px solid #00b900",
              color: mystate ? "#00b900" : "var(--primary)",
              backgroundColor: mystate ? "var(--primary)" : "#00b900",
            }}
            title="تمت المهمة"
          >
            <CheckIcon />
          </div>
          {status === "all" ? (
            <div
              className="icon"
              style={{ border: "2px solid #1010d7ed" }}
              title="تعديل المهمة"
            >
              <EditIcon style={{ color: "#1010d7ed" }} />
            </div>
          ) : (
            <></>
          )}
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
  }
}
