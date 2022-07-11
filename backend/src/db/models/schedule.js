const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  barber: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  availability: [
    {
      day: {
        type: String,
        required: true,
      },
      startTime: {
        type: Number,
        required: true,
        min: 1,
        max: 24,
      },
      endTime: {
        type: Number,
        required: true,
        min: 1,
        max: 24,
      },
    },
  ],
  status: {
    type: String,
    required: true,
    enum: ["approved", "rejected", "pending"],
  },
});

const Schedule = mongoose.model("Schedule", ScheduleSchema);

module.exports = Schedule;
