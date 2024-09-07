const Calendar = require("../models/Calender");

const createMeeting = async (req, res) => {
  const { title, location, startTime, endTime } = req.body;
  const userId = req.user.id;

  if (!title || !location || !startTime || !endTime) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newEvent = {
    title,
    location,
    startTime,
    endTime,
    organizer: userId,
  };

  try {
    let calendar = await Calendar.findOne({ userId });
    if (!calendar) {
      calendar = new Calendar({ userId, events: [newEvent] });
    } else {
      calendar.events.push(newEvent);
    }
    await calendar.save();

    res
      .status(201)
      .json({ message: "Meeting created successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Error creating meeting", error });
  }
};

const getMeetings = async (req, res) => {
  try {
    const userId = req.user.id;
    const calendar = await Calendar.findOne({ userId });

    if (!calendar) {
      return res.status(404).json({ message: "No meetings found" });
    }

    res.status(200).json(calendar.events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching meetings", error });
  }
};

const updateMeeting = async (req, res) => {
  const { title, location, startTime, endTime } = req.body;
  const userId = req.user.id;
  const { eventId } = req.params;

  try {
    const calendar = await Calendar.findOne({ userId });
    if (!calendar) {
      return res.status(404).json({ message: "No meetings found" });
    }

    const event = calendar.events.id(eventId);
    console.log(event);
    if (!event) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    if (event.organizer.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this meeting" });
    }

    event.title = title || event.title;
    event.location = location || event.location;
    event.startTime = startTime || event.startTime;
    event.endTime = endTime || event.endTime;

    await calendar.save();

    res.status(200).json({ message: "Meeting updated successfully", event });
  } catch (error) {
    res.status(500).json({ message: "Error updating meeting", error });
  }
};

const deleteMeeting = async (req, res) => {
  const userId = req.user.id;
  const { eventId } = req.params;

  try {
    const calendar = await Calendar.findOne({ userId });
    if (!calendar) {
      return res
        .status(404)
        .json({ message: "No calendar found for this user" });
    }

    const event = calendar.events.id(eventId);
    if (!event) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    if (event.organizer.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this meeting" });
    }

    calendar.events.pull({ _id: eventId });

    await calendar.save();
    res.status(200).json({ message: "Meeting deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting meeting", error });
  }
};

module.exports = { createMeeting, getMeetings, deleteMeeting, updateMeeting };
