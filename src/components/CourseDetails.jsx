    import React, { useState, useEffect } from "react";
    import { useParams } from "react-router-dom";
    import axios from "axios";
    import "../styles/CourseDetails.css"
    
const CourseDetails = () => {
    const { title } = useParams(); 
    const [movieDetails, setMovieDetails] = useState([]);
    const [error, setError] = useState(false);
    const user_id = localStorage.getItem("user_id");
    const [comment, setComment] = useState("");
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [readComments, setReadComments] = useState([]);
    const [commentSubmitted, setCommentSubmitted] = useState(false)

    useEffect(()=>{
        console.log(comment)
    },[comment])
    const { movie_id, genre, release_year, details } = movieDetails;

    const loadMovieDetails = () => {
        axios
        .get(
            `http://localhost/AI-Movie-Recommender/server-side/getMovieDetails_TEST.php?title=${encodeURIComponent(title)}`
        )
        .then((response) => {
            if (response.data.response) {
            setMovieDetails(response.data.response);
            console.log(response.data.response)
            } else {
            setError(true); 
            }
        })
        .catch((err) => {
            console.error("Error fetching movie details:", err.message);
            setError(true); 
        });
    };

    useEffect(() => {
        loadMovieDetails();
    }, [movie_id, title]);

    

    const loadEnrolled = () => {
        const data = new FormData();
        data.append("user_id",user_id);
        data.append("movie_id", movie_id);

        axios("http://localhost/AI-Movie-Recommender/server-side/checkBookmark.php",{
            method:"POST",
            data:data
        }).then((response)=>{
            if(response.data.status === true){
                setIsEnrolled(true);
            }else{
                setIsEnrolled(false);
            }
        }).catch(()=>{
            console.log("error checking if enrolled")
        })
    }
    useEffect(()=>{
        loadEnrolled();
    },[movie_id])

    const loadComments = () => {
        const data = new FormData();
        data.append("movie_id", movie_id);
        axios("http://localhost/AI-Movie-Recommender/server-side/getCommentsPublic_TEST.php",{
            method:"POST",
            data:data
        }).then((response)=>{

            console.log(response.data.comments);
            setReadComments(response.data.comments);
        }).catch(()=>{
            console.log("error loading comments")
        })
    }
    useEffect(()=>{
        loadComments();
    },[movie_id, commentSubmitted])


    if (error) {
        return <p>Error loading movie details. Please try again later.</p>;
    }

    if (!movieDetails) {
        return <p>Loading...</p>;
    }

    
    return (
        <div className="course-details">
            <h2>{title}</h2>
            <h3>Genre: {genre}</h3>
            <h3>Release Year: {release_year}</h3>
            <p>{details}</p>
            {isEnrolled && (
                <>
            <div className="comment-section">
                <div className="comment-input">
                    <input type="text" placeholder="Comment" value={comment} onChange={(e)=>{
                        setComment(e.target.value)
                    }}/>
                    <button onClick={()=>{
                        setCommentSubmitted(true);
                        const data = new FormData();
                        data.append("user_id", user_id);
                        data.append("movie_id", movie_id);
                        data.append("comment", comment);

                        axios("http://localhost/AI-Movie-Recommender/server-side/addPublicComment_TEST.php",{
                            method:"POST",
                            data:data
                        }).then((response)=>{
                            console.log("public comment added")
                            setCommentSubmitted(false);
                            setComment("");
                        }).catch(()=>{
                            console.log("posting public comment failed")
                        })
                    }}>Public</button>
                    <button onClick={()=>{
                        setCommentSubmitted(true);
                        const data = new FormData();
                        data.append("user_id", user_id);
                        data.append("movie_id", movie_id);
                        data.append("comment", comment);

                        axios("http://localhost/AI-Movie-Recommender/server-side/addPrivateComment_TEST.php",{
                            method:"POST",
                            data:data
                        }).then((response)=>{
                            console.log("private comment added")
                            setCommentSubmitted(false);
                            setComment("");
                        }).catch(()=>{
                            console.log("posting private comment failed")
                        })
                    }}>Private</button>
                </div>
                <div className="comment-output">
                    { readComments?.map((e)=>(
                        <div key={e.user_id}>
                            <p>{e.username}:{e.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
            </>
            )}
        </div>
    );
    };

    export default CourseDetails;
