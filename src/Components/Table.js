import React from "react";
import "./Table.css";

function Table({
  users,
  setUsers,
  checkboxEnabled,
  currentPage,
  checkedUsers,
  setCheckedUsers,
  setEditEnabled,
  setTarget,
}) {
  let usersToBeDisplayed = users.slice(currentPage * 10 - 10, currentPage * 10);

  const checkHandler = (e) => {
    if (e.target.className === "all-users-checkbox") {
      setCheckedUsers([]);
      if (e.target.checked) {
        setCheckedUsers(usersToBeDisplayed.map((item) => item.id));
      }
    } else {
      if (e.target.checked) {
        if (!checkedUsers.includes(e.target.id)) {
          setCheckedUsers([...checkedUsers, e.target.id]);
        }
      } else {
        if (checkedUsers.includes(e.target.id)) {
          let newCheckedUsers = checkedUsers.filter(
            (item) => item !== e.target.id
          );
          setCheckedUsers(newCheckedUsers);
        }
      }
    }
  };

  const handleDeleteUser = (e) => {
    let decision = window.confirm(
      `Do you want to delete user with id "${e.target.id}" ?`
    );
    if (decision) {
      let newUsers = users.filter((item) => item.id !== e.target.id);
      setUsers(newUsers);
    }
  };

  const enableEdit = (e) => {
    setTarget(e.target.id);
    setEditEnabled(true);
  };

  return usersToBeDisplayed.length ? (
    <div className="users-list">
      <table>
        <thead>
          <tr>
            {checkboxEnabled && (
              <th>
                <input
                  onChange={checkHandler}
                  checked={
                    checkedUsers.length === usersToBeDisplayed.length
                      ? true
                      : false
                  }
                  className="all-users-checkbox"
                  type="checkbox"
                />
              </th>
            )}
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersToBeDisplayed.map((item) => {
            return (
              <tr
                key={item.id}
                className={`table-row ${
                  checkedUsers.includes(item.id) ? "tr-checked" : ""
                }`}
              >
                {checkboxEnabled && (
                  <td>
                    <input
                      onChange={checkHandler}
                      id={item.id}
                      className="single-user-checkbox"
                      checked={checkedUsers.includes(item.id) ? true : false}
                      type="checkbox"
                    />
                  </td>
                )}
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <button
                    onClick={enableEdit}
                    id={item.id}
                    className="material-symbols-outlined action-item edit"
                  >
                    edit
                  </button>
                  <button
                    onClick={handleDeleteUser}
                    id={item.id}
                    className="material-symbols-outlined action-item person-remove"
                  >
                    person_remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div id="empty-List">
      <p id="no-users">
        <span className="material-symbols-outlined sad-face">
          sentiment_dissatisfied
        </span>
        Sorry, No users found!
      </p>
    </div>
  );
}
export default Table;
