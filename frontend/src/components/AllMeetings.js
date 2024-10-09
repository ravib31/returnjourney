import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AiOutlineFullscreen } from "react-icons/ai";

function AllMeetings() {
  const [meetings, setMeetings] = useState([]);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    startTime: "",
    endTime: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [meetingsPerPage] = useState(6);

  const navigate = useNavigate();

  const fetchMeetings = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to view this page.");
      navigate("/calendar");
      return;
    }

    try {
      const { id } = JSON.parse(atob(token.split(".")[1]));
      setUserId(id);

      const { data } = await axios.get("http://localhost:5000/api/meetings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMeetings(data);
    } catch (error) {
      setMessage("Error fetching meetings");
      console.log("Fetch error: ", error);
    }
  }, [navigate]);

  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1);
  };
  const handleScreen = (e) => {
    // console.log('screen click')
    const element = document.getElementById("fullScreen");
    const isFullScreen = document.fullscreenElement;
    if (!isFullScreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  const filteredMeetings = useMemo(() => {
    return meetings.filter((meeting) =>
      meeting.title.toLowerCase().includes(searchQuery)
    );
  }, [meetings, searchQuery]);

  const currentMeetings = useMemo(() => {
    const indexOfLastMeeting = currentPage * meetingsPerPage;
    const indexOfFirstMeeting = indexOfLastMeeting - meetingsPerPage;
    return filteredMeetings.slice(indexOfFirstMeeting, indexOfLastMeeting);
  }, [filteredMeetings, currentPage, meetingsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const openUpdateForm = (meeting) => {
    setIsEditing(true);
    setSelectedMeeting(meeting);
    setFormData({
      title: meeting.title,
      location: meeting.location,
      startTime: meeting.startTime,
      endTime: meeting.endTime,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/meetings/${selectedMeeting._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data) {
        alert("Meeting updated successfully");
        fetchMeetings();
        setIsEditing(false);
        setSelectedMeeting(null);
      }
    } catch (error) {
      alert("Error updating meeting");
      console.log("Update error: ", error);
    }
  };

  const deleteMeeting = async (meetingId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/meetings/${meetingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Meeting deleted successfully");
      setMeetings(meetings.filter((meeting) => meeting._id !== meetingId));
    } catch (error) {
      alert("Error deleting meeting");
      console.log("Delete error: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6" id="fullScreen">
      <div className="flex justify-end gap-4 items-center mb-4">
        <button
          onClick={handleScreen}
          className="bg-lime-500 hover:bg-lime-600 text-black py-3 px-4 rounded"
        >
         <AiOutlineFullscreen />
        </button>
        <Link to="/calendar">
          <button className="bg-purple-900 hover:bg-purple-950 text-white py-2 px-4 rounded flex items-center">
            <FaPlus className="mr-2" /> Meetings
          </button>
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Meetings</h2>

      <input
        type="text"
        placeholder="Search by Title"
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full p-3 mb-6 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {message && <p className="text-red-500 mb-4">{message}</p>}
      <div className="flex flex-wrap justify-evenly gap-3">
        {currentMeetings.length > 0 ? (
          currentMeetings.map((meeting) => (
            <li
              key={meeting._id}
              className="bg-white min-w-64 capitalize p-4 rounded shadow-md"
            >
              <strong className="text-lg font-bold">{meeting.title}</strong>
              <p className="text-sm text-gray-600">
                {new Date(meeting.startTime).toLocaleString()} to{" "}
                {new Date(meeting.endTime).toLocaleString()}
              </p>
              <p className="italic text-gray-500">
                Location: {meeting.location}
              </p>
              {meeting.organizer === userId && (
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() => openUpdateForm(meeting)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteMeeting(meeting._id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                  >
                    <MdDelete />
                  </button>
                </div>
              )}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No meetings found</p>
        )}
      </div>

      <nav className="mt-6">
        <ul className="flex justify-center space-x-2">
          {Array.from({
            length: Math.ceil(filteredMeetings.length / meetingsPerPage),
          }).map((_, idx) => (
            <li key={idx} className="page-item">
              <button
                onClick={() => paginate(idx + 1)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-3 rounded"
              >
                {idx + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Edit Meeting</h3>
            <label className="block mb-2">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <label className="block mb-2">Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <label className="block mb-2">Start Time:</label>
            <input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <label className="block mb-2">End Time:</label>
            <input
              type="datetime-local"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={submitUpdate}
                className="bg-purple-900 text-white px-4 py-2 rounded-lg hover:bg-purple-950"
              >
                Submit
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllMeetings;
