import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pagess/Login';
import Courses from './pagess/Courses';
import CourseDetails from './components/CourseDetails';
import './styles/App.css';
import './styles/index.css';



const App = () => {
  //const location = useLocation();

  return (
    <div className="App">
      {/* {location.pathname !== "/" && <NavBar />} */}

      <Routes>
        {/* <Route path="/" element={<Signup/>}/> */}
        <Route path="/" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:title" element={<CourseDetails />} />
        <Route path="/*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;
