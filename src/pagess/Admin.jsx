import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import "../styles/Admin.css";
import BanUserCard from "../components/BanUserCard";

const Admin = () => {
    const [users, setUsers] = useState([]);

    const loadAllUsers = () => {
        axios("http://localhost/AI-Movie-Recommender/server-side/getAllUsers_TEST.php",{
                method: "GET",
            }).then((response)=>{
                setUsers(response.data.response);
            }).catch(()=>{
                console.log("not fetching users correctly")
            })
        
    };

    useEffect(() => {
        loadAllUsers();
    }, []);

    return (
        <div className="admin">
            <div>
                <h1>All Users</h1>
                {users.map((u)=>(
                    <BanUserCard user={u} key={u.user_id} />
                ))}
            </div>
        </div>
    );
};

export default Admin;
