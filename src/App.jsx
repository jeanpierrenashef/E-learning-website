//import NavBar from "./components/NavBar";
import Login from "./pagess/Login.jsx";
import Signup from "./pagess/Signup.jsx";
import Users from "./pagess/Courses.jsx";
import CourseCard from "./components/CourseCard.jsx"
import "./styles/App.css";
import "./styles/index.css";

import { Routes, Route, useLocation } from "react-router-dom";
import Courses from "./pagess/Courses.jsx";

const App = () => {
  //const location = useLocation();

  return (
    <div className="App">
      {/* {location.pathname !== "/" && <NavBar />} */}

      <Routes>
        {/* <Route path="/" element={<Signup/>}/> */}
        <Route path="/" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;
