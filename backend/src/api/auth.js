const router = require("express").Router();
const { User } = require("../db/models");

router.get("/getUsers", async (req, res, next) => {
  const users = await User.find({}).exec();
  res.send({ users });
});

module.exports = router;
