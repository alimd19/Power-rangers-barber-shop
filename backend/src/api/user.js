const router = require("express").Router();
const { User } = require("../db/models");

router.get("/getUser/:id", async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id).exec();
  res.send({ user });
});

module.exports = router;