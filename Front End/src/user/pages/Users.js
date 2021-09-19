import React, { useState, useEffect } from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  const [users, setusers] = useState([]);
  const [error, seterror] = useState(null)
  const [isLoading, setisLoading] = useState(false)

  useEffect(() => {
    const fetchUsers = () => {
      setisLoading(true)
      fetch("http://localhost:5000/api/users")
      .then(response => response.json())
        .then((res) => {
          console.log('users ,', res);
          setusers(res.data);
          setisLoading(false)
        })
        .catch((err) => {
          seterror(err.message)
          setisLoading(false)

        });
    };
    fetchUsers();
  }, []);

  return <UsersList items={users} isLoading={isLoading} error={error} onClear={() => seterror(null)}/>;
};

export default Users;
