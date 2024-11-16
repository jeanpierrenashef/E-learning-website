import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
const navigate = useNavigate();

const [toggle, setToggle] = useState(false);
const [users, setUsers] = useState([]);

const loadUsers = async () => {
    const response = await axios.get(
    "http://localhost/AI-Movie-Recommender/server-side/getAllUsers.php"
    );

    console.log(response.data);

    setUsers(response.data.users);
};

useEffect(() => {
    loadUsers(); //so that the api isnt rendered everytime the page is rendered
}, []);

return (
    <div>
    <h1>Users</h1>
    {/* <button
        onClick={() => {
        navigate("/", {});
        }}
    >
        Go to login
    </button> */}
    <button
        onClick={() => {
        setToggle(!toggle);
        }}
    >
        {toggle.toString()}
    </button>

    <div>
        {users?.map((u) => (
        <div key={u.id}>
            <p>{u.username}</p>
            <p>{u.password}</p>
            <p>===============</p>
        </div>
        ))}
    </div>
    </div>
);
};

export default Users;
