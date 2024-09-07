import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Calendar() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    startTime: "",
    endTime: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleCreateMeeting = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/meetings",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(response.data.message);
      setFormData({ title: "", location: "", startTime: "", endTime: "" });
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating meeting");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-lg p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Meeting Scheduler</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate("/meetings")}
              className="bg-purple-900 text-white py-2 px-4 rounded-lg hover:bg-purple-950 transition-colors duration-300"
            >
              All Meetings
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center flex-grow">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create a New Meeting
          </h2>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <input
              type="datetime-local"
              placeholder="Start Time"
              value={formData.startTime}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
            />
          </div>

          <div className="mb-6">
            <input
              type="datetime-local"
              placeholder="End Time"
              value={formData.endTime}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              onChange={(e) =>
                setFormData({ ...formData, endTime: e.target.value })
              }
            />
          </div>

          <button
            onClick={handleCreateMeeting}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 mb-4"
          >
            Create Meeting
          </button>

          {message && (
            <p className="text-center text-red-500 mb-4">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
