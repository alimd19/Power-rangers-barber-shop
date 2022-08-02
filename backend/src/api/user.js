const router = require("express").Router();
const { User } = require("../db/models");

router.get("/getUser/:id", async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id).exec();
  res.send({ user });
});

router.get("/getUserByType/:usertype", async (req, res, next) => {
  const usertype = req.params.usertype;
  const user = await User.find({userType:usertype}).exec();
  res.send({ user });
});

router.get("/getUserByEmail/:email", async (req, res, next) => {
  const email = req.params.email;
  const users = await User.find({email:email}).exec();
  res.send({ users });
});
module.exports = router;