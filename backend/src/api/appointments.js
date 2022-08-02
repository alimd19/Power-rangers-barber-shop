const router = require("express").Router();
const { Appointment } = require("../db/models");

// find appointments by user id (barber or customer)
router.get("/getAppointments/", async (req, res, next) => {
  const { type, userId } = req.query;

  if (!userId || !type || userId == "undefined") {
    res.status(400).json({ message: "Please provide a user id and type" });
    return;
  }
   
  const appointments = await Appointment.find({ [type]: userId })
    .populate({
      path: "barber",
      select: ["fname", "lname"],
    })
    .populate({
      path: "services",
      select: ["name"], 
    });

  res.json({ appointments });
});

router.post("/createAppointment", async (req, res, next) => {
  console.log(req.body);
  const appointments = await Appointment.create(req.body);
  if (req.body.date > new Date()) {
    res.status(400).json({ message: "Please select a valid date" });
  } else {
    res.send({ appointments });
  }
});

module.exports = router;
