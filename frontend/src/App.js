import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Calendar from "./components/Calendar";
import AllMeetings from "./components/AllMeetings";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/meetings" element={<AllMeetings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
