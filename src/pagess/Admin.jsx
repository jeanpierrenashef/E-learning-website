import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import "../styles/Admin.css";
import BanUserCard from "../components/BanUserCard";

const Admin = () => {
    const [users, setUsers] = useState([]);

    const loadAllUsers = async () => {
        const response = await axios(
            "http://localhost/AI-Movie-Recommender/server-side/getAllUsers_TEST.php",
            {
                method: "GET",
            }
        );

        // const usersWithToggle = response.data.response.map((user) => ({
        //     ...user,
        //     toggle: user.banned === 1 ? "Unban" : "Ban", 
        // }));
        // setUsers(usersWithToggle);
    };

    useEffect(() => {
        loadAllUsers();
    }, []);

    return (
        <div className="admin">
            <h1>All Users</h1>
            {users.map((u)=>(
                <BanUserCard user={u} key={u.user_id} />
            ))}
        </div>
    );
};

export default Admin;
