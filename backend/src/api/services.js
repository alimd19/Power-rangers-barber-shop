const router = require("express").Router();
const { Service } = require("../db/models");

router.get("/getService", async (req, res, next) => {
  const services = await Service.find({}).exec();
  res.send({ services });
});

module.exports = router;
