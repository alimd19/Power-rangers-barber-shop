const router = require("express").Router();
const { Appointment } = require("../db/models");

router.get("/getAppointment", async (req, res, next) => {
  const appointments = await Appointment.find({}).exec();
  res.send({ appointments });
});

module.exports = router;
