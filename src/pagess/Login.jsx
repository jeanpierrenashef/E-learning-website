import axios from "axios";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const Login=() => {
    const Navigate = useNavigate();
    const [error, setError] = useState("")
    const [loginForm, setLoginForm] = useState({
        username :"",
        password:""
    });
    useEffect(()=>{
        console.log(loginForm)
    },[loginForm])


    return(
        <div>
            <h1>Login</h1>
            <input type="text" placeholder="Username" onChange={(e)=>{
                setLoginForm({
                    ...loginForm,
                    username: e.target.value,
                });
            }}/>
            <input type="password" placeholder="Password" onChange={(e)=>{
                setLoginForm({
                    ...loginForm,
                    password:e.target.value,
                });
            }}/>
            <button onClick={()=>{
                setError("");
                const data = new FormData();
                data.append("username", loginForm.username)
                data.append("password", loginForm.password)

                axios("http://localhost/AI-Movie-Recommender/server-side/login.php",{
                    method:"POST",
                    data
                }).then((response)=>{
                    console.log(response.data)
                    localStorage.setItem("userId", response.data.user.user_id)
                    // Navigate("/users")
                }).catch((error)=>{
                    setError(error.response.data.status)
                });
            }}>Login</button>
            {error && <p>{error}</p>}
        </div>
    )
};
export default Login;