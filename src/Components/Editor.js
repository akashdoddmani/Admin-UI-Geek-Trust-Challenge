import React, { useState } from "react";
import "./Editor.css";


function Editor({ setEditEnabled, users, setUsers, setUserList, target }) {

  const [editedValues, setEditedValues] = useState({
    name: "",
    email: "",
    role: "",
  });
  
  const handleClickOnParent = (e) => {
    if (e.target.className === "display-absolute") {
      setEditEnabled(false);
    }
  };

  const onChangeHandler = (e) => {
    setEditedValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const updateValues = () => {
    let newUsers = users.map((item) => {
      if (item.id === target) {
        return {
          ...item,
          name: editedValues.name ? editedValues.name : item.name,
          email: editedValues.email ? editedValues.email : item.email,
          role: editedValues.role ? editedValues.role : item.role,
        };
      } else {
        return item;
      }
    });

    setUserList(newUsers);
    setUsers(newUsers);
    setEditEnabled(false);
  };

  return (
    <div onClick={handleClickOnParent} className="display-absolute">
      <div className="editor-content">
        <h2 id="edit-user">Edit User</h2>
        <div className="content-aligner">
          <label htmlFor="name">Name</label>
          <input
            onChange={onChangeHandler}
            name="name"
            value={editedValues.name}
            className="input-bar"
            type="text"
            id="name"
            autoComplete="off"
          />
        </div>
        <div className="content-aligner">
          <label htmlFor="email">Email</label>
          <input
            onChange={onChangeHandler}
            name="email"
            value={editedValues.email}
            className="input-bar"
            type="text"
            id="email"
            autoComplete="off"
          />
        </div>
        <div className="content-aligner">
          <label htmlFor="role">Role</label>
          <input
            onChange={onChangeHandler}
            name="role"
            value={editedValues.role}
            className="input-bar"
            type="text"
            id="role"
            autoComplete="off"
          />
        </div>
        <div className="buttons">
          <button id="update-btn" onClick={updateValues}>
            Update
          </button>
          <button
            id="cancel-btn"
            onClick={() => {
              setEditEnabled(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
export default Editor;
