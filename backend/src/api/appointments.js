const router = require("express").Router();
const { Appointment } = require("../db/models");

router.get("/getAppointment", async (req, res, next) => {
  const appointments = await Appointment.find({}).exec();
  res.send({ appointments });
});

router.post("/createAppointment", async (req, res, next) => {
  console.log(req.body)
  const appointments = await Appointment.create(req.body);
  if(req.body.date>new Date()){
    res.status(400).json({message:"Please select a valid date"})
  }else{  
 res.send({ appointments });
  }
});

module.exports = router;

