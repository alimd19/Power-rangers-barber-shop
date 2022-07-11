const mongoose = require("mongoose");
const { ServiceSchema } = require("./service");

const AppointmentSchema = new mongoose.Schema({
  barber: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  customer: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  time: {
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
  status: {
    type: String,
    required: true,
    enum: ["scheduled", "completed", "canceled"],
  },
  services: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Service" }],
    validate: (val) => {
      val.length > 1;
    },
  },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;
