import React, { useEffect, useRef, useState } from "react";
import "./Header.css";

function Header({ userList, setUsers }) {
  const [search, setSearch] = useState("");
  const didUserSearch = useRef(false);
  const [timer, setTimer] = useState();

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
    didUserSearch.current = true;
  };

  useEffect(() => {
    if (didUserSearch.current) {
      debouncing(updateUsersforSearch, 500);
      didUserSearch.current = false;
    }
  }, [search]);

  const updateUsersforSearch = () => {
    if (search.length > 0) {
      let newUsers = userList.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase()) ||
          item.role.toLowerCase().includes(search.toLowerCase())
      );
      setUsers(newUsers);
    } else {
      setUsers(userList);
    }
  };

  const debouncing = (fun, time) => {
    if (timer) {
      clearTimeout(timer);
    }
    let newTimer = setTimeout(fun, time);
    setTimer(newTimer);
  };

  return (
    <>
      <nav>
        <p className="brand-name">Admin UI a GeekTrust Challenge</p>
      </nav>
      <input
        id="search-bar"
        onChange={onChangeHandler}
        value={search}
        type="text"
        placeholder="Search by name, email or role"
        autoComplete="off"
      />
    </>
  );
}
export default Header;
