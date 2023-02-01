import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";
import ActionArea from "./ActionArea";
import Header from "./Header";
import Editor from "./Editor";
import "./LandingPage.css";

//Main Component for this application
function LandingPage() {
  const [users, setUsers] = useState([]);
  const [userList, setUserList] = useState([]);
  const [checkboxEnabled, setCheckboxEnabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [editEnabled, setEditEnabled] = useState(false);
  const [target, setTarget] = useState("");

  
  const getDetails = async () => {
    let res = await axios.get(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    let { data } = res;
    setUserList(data);
    setUsers(data);
  };

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    setCheckedUsers([]);
  }, [currentPage]);

  return (
    <>
      <div className={editEnabled ? "edit-enabled" : ""}>
        <Header userList={userList} setUsers={setUsers} />
        <Table
          users={users}
          setUsers={setUsers}
          checkboxEnabled={checkboxEnabled}
          currentPage={currentPage}
          checkedUsers={checkedUsers}
          setCheckedUsers={setCheckedUsers}
          setEditEnabled={setEditEnabled}
          setTarget={setTarget}
        />
        <ActionArea
          checkboxEnabled={checkboxEnabled}
          setCheckboxEnabled={setCheckboxEnabled}
          users={users}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          checkedUsers={checkedUsers}
          setCheckedUsers={setCheckedUsers}
          setUsers={setUsers}
          userList={userList}
          setUserList={setUserList}
        />
      </div>
      {editEnabled && (
        <Editor
          setEditEnabled={setEditEnabled}
          users={users}
          setUsers={setUsers}
          setUserList={setUserList}
          target={target}
        />
      )}
    </>
  );
}
export default LandingPage;
