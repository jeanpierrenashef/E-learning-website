import React, { useState } from "react";
import axios from "axios";


const BanUserCard = ({ user}) => {
    const { user_id, username, user_type, banned } = user;
    const [toggle, setToggle] = useState(banned === 1 ? "Unban" : "Ban");

    const handleToggle =  () => {
        const data = new FormData();
        data.append("user_id", user_id);
        data.append("isBanned", banned === 1 ? 0 : 1); 
        axios("http://localhost/AI-Movie-Recommender/server-side/toggleBanUser.php", {
                method: "POST",
                data: data,
            }).then(()=>{
                setToggle(toggle === "Ban" ? "Unban" : "Ban");
            }).catch (()=> {
                console.error("Error toggling ban status");
            })    
        } 


    return (
        <div className="ban-section">
            <p>
                {user_id}: {username} - {user_type}
            </p>
            <button onClick=
            {handleToggle}>
                {toggle}
                </button>
        </div>
    );
};

export default BanUserCard;
