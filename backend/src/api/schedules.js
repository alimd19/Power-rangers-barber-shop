const router = require("express").Router();
const { Schedule } = require("../db/models");

router.get("/getSchedule", async (req, res, next) => {
  const schedules = await Schedule.find({}).exec();
  res.send({ schedules });
});

router.get("/getScheduleById/:id", async (req, res, next) => {
  const id= req.params.id;
  try{
    const schedules = await Schedule.findById(id).exec();
    res.status(200).json({schedules})
  }catch(err)
  {
    res.status(400).json({message:err.message})
  }
});

module.exports = router;


