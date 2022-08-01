const router = require("express").Router();
const { Schedule } = require("../db/models");

router.get("/getSchedule", async (req, res, next) => {
  const schedules = await Schedule.find({}).exec();
  res.send({ schedules });
});

module.exports = router;


