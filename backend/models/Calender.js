const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  organizer: { type: String, required: true },
});

const calendarSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  events: [eventSchema],
});

module.exports = mongoose.model('Calendar', calendarSchema);
