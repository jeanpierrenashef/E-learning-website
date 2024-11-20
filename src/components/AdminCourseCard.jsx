import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const AdminCourseCard = ({course, loadCourses}) => {
    const {movie_id, title} = course;
    //const [courseState, setCourseState] = useState([]);
    //const [toggle, setToggle] = useState(movie_id ? "Remove" : "Add")
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    const handleRemovingCourse = () => {
        const data = new FormData();
        data.append("movie_id", movie_id);
    
            axios("http://localhost/AI-Movie-Recommender/server-side/deleteMovie_TEST.php", {
                method: "POST",
                data: data,
            }).then(() => {
                //setToggle("Add");
                loadCourses();
            }).catch(() => {
                console.log("error removing");
            });
        } 
    

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    }
    
    const handleSaveEdit = () => {
        const data = new FormData();
        data.append("movie_id", movie_id);
        data.append("title", newTitle);

        axios("http://localhost/AI-Movie-Recommender/server-side/updateMovieTitle_TEST.php", {
            method: "POST",
            data: data,
        }).then(() => {
                console.log("Course title updated");
                setIsEditing(false); 
                loadCourses();
            }).catch(() => {
                console.log("Error updating course title");
            });
    }

    return(
        <div className="ban-section">
            {isEditing ? (
                <>
                <div>
                    <input type="text" value={newTitle} onChange={(e)=>{
                        setNewTitle(e.target.value)
                    }}/>
                    <div>
                        <button onClick={handleSaveEdit}>Save</button>
                        <button onClick={handleEditToggle}>Cancel</button>
                    </div>
                </div>
                </>
            ):(
                <>
                <p>
                    {movie_id}: {title}
                </p>
                <div>
                    <button onClick=
                    {handleEditToggle}>
                        Edit
                        </button>
                    <button onClick=
                    {handleRemovingCourse}>
                        Remove
                        </button>
                </div>
            </>
            )}
        </div>
    
    )
}
export default AdminCourseCard;