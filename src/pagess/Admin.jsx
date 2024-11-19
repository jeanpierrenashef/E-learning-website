import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import "../styles/Admin.css";

const Admin = () => {
    const [users, setUsers] = useState([]);

    const loadAllUsers = async () => {
        const response = await axios(
            "http://localhost/AI-Movie-Recommender/server-side/getAllUsers_TEST.php",
            {
                method: "GET",
            }
        );

        const usersWithToggle = response.data.response.map((user) => ({
            ...user,
            toggle: user.banned === 1 ? "Unban" : "Ban", 
        }));
        setUsers(usersWithToggle);
    };

    useEffect(() => {
        loadAllUsers();
    }, []);

    return (
        <div>
            <h1>All Users</h1>
            {users.map((u) => (
                <div key={u.user_id} className="ban-section">
                    <p>
                        {u.user_id}: {u.username} - {u.user_type}
                    </p>
                    <button
                        onClick={() => {
                            const data = new FormData();
                            data.append("user_id", u.user_id);
                            data.append("isBanned", u.banned === 1 ? 0 : 1); 

                            axios("http://localhost/AI-Movie-Recommender/server-side/toggleBanUser_TEST.php", {
                                method: "POST",
                                data: data,
                            }).then((response) => {
                                    console.log(response.data.message);
                                    setUsers((user) =>
                                        user.map((e) =>
                                            e.user_id === u.user_id
                                                ? {
                                                    ...e,
                                                    banned: e.banned === 1 ? 0 : 1, 
                                                    toggle: e.toggle === "Ban" ? "Unban" : "Ban", 
                                                }
                                                : e
                                        )
                                    );
                                })
                                .catch(() => {
                                    console.log("Error banning/unbanning user");
                                });
                        }}
                    >
                        {u.toggle}
                    </button>
                </div>
            ))}
            <p>===============</p>
        </div>
    );
};

export default Admin;
