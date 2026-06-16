import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

export default function Categories({
  bookmarkAddedIconStatus,
  categories,
  setCategories,
}) {
  return (
    <div className="categories">
      {categories.map(({ id, text, classActive }) => {
        return (
          <button
            type="button"
            key={id}
            onClick={() => handleCategories(id)}
            className={classActive}
          >
            {text === "الكل" && (
              <BookmarkAddedIcon
                titleAccess={bookmarkAddedIconStatus && "جميع المهام مُكتملة"}
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
  );
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
