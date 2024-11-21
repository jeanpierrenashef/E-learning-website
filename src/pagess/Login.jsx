import axios from "axios";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const Login=() => {
    const navigate = useNavigate();
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

                axios("http://localhost/AI-Movie-Recommender/server-side/login_TEST.php",{
                    method:"POST",
                    data:data
                },{
                    headers:{
                        "Content-Type" : "application/json",
                    },
                }).then((response)=>{
                    console.log(response.data)
                    localStorage.setItem("token", response.data.jwt)
                    if(response.data.user.user_type_id == 2){
                        navigate("/courses")
                    }else if (response.data.user.user_type_id == 3){
                        navigate("/teacher");
                    }else{
                        navigate("/admin")
                    }
                }).catch((error)=>{
                    console.log("errpr logging in")
                    //setError(error.response.data.status)
                });
            }}>Login</button>
            {error && <p>{error}</p>}
        </div>
    )
};
export default Login;