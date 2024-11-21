import axios from "axios";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const Signup=() => {
    // const Navigate = useNavigate();
    const [error, setError] = useState("")
    const [SignupForm, setSignupForm] = useState({
        username :"",
        password:""
    });
    useEffect(()=>{
        console.log(SignupForm)
    },[SignupForm])


    return(
        <div>
            <h1>Signup</h1>
            <input type="text" placeholder="Username" onChange={(e)=>{
                setSignupForm({
                    ...SignupForm,
                    username: e.target.value,
                });
            }}/>
            <input type="password" placeholder="Password" onChange={(e)=>{
                setSignupForm({
                    ...SignupForm,
                    password:e.target.value,
                });
            }}/>
            <button onClick={()=>{
                setError("");
                const data = new FormData();
                data.append("username", SignupForm.username)
                data.append("password", SignupForm.password)

                axios("http://localhost/server-side-e-learning/server-side/signup.php",{
                    method:"POST",
                    data:data
                }).then((response)=>{
                    console.log(response.data.message)
                    localStorage.setItem("userId", response.data)
                    // navigate("/jp")
                }).catch((error)=>{
                    setError(error.response.data.status)
                });
            }}>Signup</button>
            {error && <p>{error}</p>}
        </div>
    )
};
export default Signup;