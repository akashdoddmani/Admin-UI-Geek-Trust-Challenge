import React from "react";
import "./ActionArea.css";

function ActionArea({
  checkboxEnabled,
  setCheckboxEnabled,
  users,
  currentPage,
  setCurrentPage,
  checkedUsers,
  setCheckedUsers,
  setUsers,
  userList,
  setUserList,
}) {

  const noOfElementsToRender=10;
  
  //slicing array for rendering based on current page 
  let pages = new Array(Math.ceil(users.length / noOfElementsToRender)).fill("null");


  const enableCheckboxes = () => {
    if (checkboxEnabled) {
      setCheckboxEnabled(false);
      setCheckedUsers([]);
    } else {
      setCheckboxEnabled(true);
    }
  };

  const updatePageNumber = (e) => {
    setCurrentPage(parseInt(e.target.id));
  };

  const handleDelete = () => {
    let decision = window.confirm(
      `Do you want to delete all ${checkedUsers.length} users?`
    );
    if (decision) {
      let newUsers1 = users.filter((item) => !checkedUsers.includes(item.id));
      let newUsers2 = userList.filter(
        (item) => !checkedUsers.includes(item.id)
      );
      setUsers(newUsers1);
      setUserList(newUsers2);
      setCheckedUsers([]);
    }
  };

  return (
    <div className="action-area">
      <button
        className={`select-items-btn btn ${
          checkboxEnabled ? "select-items-btn-clicked" : ""
        }`}
        onClick={enableCheckboxes}
      >
        {checkedUsers.length ? "Unselect Users" : "Select Users"}
      </button>
      <div className="pagination-buttons">
        <button
          onClick={updatePageNumber}
          id={1}
          className={`material-symbols-outlined btn ${
            currentPage == 1 ? "not-allowed" : "navigation-btn"
          }`}
        >
          keyboard_double_arrow_left
        </button>
        <button
          id={currentPage - 1 <= 0 ? 1 : currentPage - 1}
          onClick={updatePageNumber}
          className={`material-symbols-outlined btn ${
            currentPage == 1 ? "not-allowed" : "navigation-btn"
          }`}
        >
          chevron_left
        </button>
        {users.length !== 0 &&
          pages.map((item, index) => {
            return (
              <button
                key={index}
                id={index + 1}
                onClick={updatePageNumber}
                className={`btn page-btn navigation-btn ${
                  index + 1 == currentPage ? "page-number" : ""
                }`}
              >
                {index + 1}
              </button>
            );
          })}
        <button
          id={currentPage + 1 > Math.ceil(users.length /noOfElementsToRender) ? Math.ceil(users.length /noOfElementsToRender) : currentPage + 1}
          onClick={updatePageNumber}
          className={`material-symbols-outlined btn ${
            currentPage == Math.ceil(users.length /noOfElementsToRender)
              ? "not-allowed"
              : "navigation-btn"
          }`}
        >
          chevron_right
        </button>
        <button
          onClick={updatePageNumber}
          id={Math.ceil(users.length /noOfElementsToRender)}
          className={`material-symbols-outlined btn ${
            currentPage == Math.ceil(users.length /noOfElementsToRender)
              ? "not-allowed"
              : "navigation-btn"
          }`}
        >
          keyboard_double_arrow_right
        </button>
      </div>
      <button
        onClick={handleDelete}
        disabled={checkedUsers.length != 0 ? false : true}
        className={`delete-items-btn btn ${
          checkedUsers.length != 0 ? "delete-btn" : "disabled-delete-btn"
        }`}
      >
        Delete {checkedUsers.length ? checkedUsers.length : ""} Selected Users
        <span className="material-symbols-outlined">delete</span>
      </button>
    </div>
  );
}
export default ActionArea;
