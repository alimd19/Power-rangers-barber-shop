const router = require("express").Router();
const { Appointment } = require("../db/models");

// find appointments by user id (barber or customer)
router.get("/getAppointment", async (req, res, next) => {
  const { type, userId } = req.query;


  if (!userId || !type || userId == "undefined") {
    res.status(400).json({ message: "Please provide a user id and type" });
    return;
  }

  const appointments = await Appointment.find({ [type]: userId, status: 'scheduled' })
    .populate({
      path: "barber",
      select: ["fname", "lname"],
    })
    .populate({
      path: "services",
      select: ["name"],
    });

  res.json({ appointments }).status(200);
});
function isNumeric(num) {
  return !isNaN(num);
}


router.post("/createAppointment", async (req, res, next) => {
  let userTime = new Date(req.body.date);
  let serverTime = new Date();
  userTime.setUTCHours(0, 0, 0, 0)
  req.body.date = userTime;
  serverTime.setDate(serverTime.getDate() - 1);
  let startTime = req.body.timeSlot.startTime;
  let endTime = req.body.timeSlot.endTime;
  let barber = req.body.barber;
  let service = req.body.services;
  if (
    barber.length === 0 ||
    Object.keys(service).length === 0 ||
    endTime.length === 0 ||
    startTime === 0) {
    res.status(400).json({ message: "Don't leave empty fields" });
  } else {
    if (userTime < serverTime) {
      res.status(400).json({ message: "Please select a valid date" });
    } else {
      if (isNumeric(endTime) && isNumeric(startTime)) {
        let parsEndTime = parseInt(endTime, 10);
        let parsStartTime = parseInt(startTime, 10);
        if (parsEndTime > parsStartTime) {
          const appointments = await Appointment.create(req.body);
          res.send({ appointments }).status(200);
          console.log(appointments);
        } else {
          res
            .status(400)
            .json({
              message:
                "Please the Start Time should be smaller then the End Time",
            });
        }
      } else {
        res.status(400).json({ message: "You entered a wrong input type !" });
      }
    }
  }
});

router.put("/deleteAppointment", async (req, res, next) => {
  const id = req.query.id;
  try {
    await Appointment.updateOne({ _id: id }, [
      { $set: { status: "cancelled" } },
    ]);
    res.status(200).json({ message: "Appointment cancelled successfuly !" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Your appointment could not be cancelled!" });
    return;
  }
});

router.put("/deleteAppointmentByDateAndBarber", async (req, res, next) => {
  const { date, barber } = req.query;
  const updateresult = await Appointment.updateMany({ date, barber, status: "scheduled" }, [{ $set: { status: "cancelled" } }]);
  if (updateresult.modifiedCount > 0 && updateresult.matchedCount > 0) {
    res.status(200).json({ message: "Successfully Updated All Records", updateresult })
  } else if (updateresult.matchedCount == 0) {
    res.status(400).json({ message: "No Data Found" })
  }
})

router.get("/getAppointmentsByDateAndBarber", async (req, res, next) => {
  const { barber, date } = req.query;
  var d2 = new Date(date).setUTCHours(0, 0, 0, 0);
  try {
    const appointments = await Appointment.find({ barber, date: d2, status: "scheduled" })
      .populate({
        path: "customer",
        select: ["fname", "lname"],
      });
    if (appointments.length > 0) {
      res.status(200).json({ appointments })
    } else {
      res.status(400).json({ message: "No Appointments Found", appointments: [] })
    }
  } catch (err) {
    res.status(400).json({ message: err.message, appointments: [] })
  }
});

module.exports = router;
