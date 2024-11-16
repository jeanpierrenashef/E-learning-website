import React from "react";
import { useState } from "react";
import "../styles/CourseCard.css"

const CourseCard = ({arr}) => {
    const {title, genre, release_year, details} = arr;
    const [flag, setFlag] = useState(false);

    return(
        <div className="course-card" onClick={()=>{
            setFlag(!flag);
        }}>
        <h3>{title}</h3>
        {flag && (
            <>
                <h6>{release_year}</h6>
                <p>{genre}</p>
                <p>{details}</p>
            </>
        )}
        </div>
    )
}
export default CourseCard;