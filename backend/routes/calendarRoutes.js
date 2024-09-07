const express = require("express");
const {
  createMeeting,
  getMeetings,
  updateMeeting,
  deleteMeeting,
} = require("../controllers/calendarController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/meetings", protect, createMeeting);
router.get("/meetings", protect, getMeetings);

router.put("/meetings/:eventId", protect, updateMeeting);

router.delete("/meetings/:eventId", protect, deleteMeeting);

module.exports = router;
