const router = require("express").Router();
const { User } = require("../db/models");

router.get("/getUser/:id", async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id).exec();
  res.send({ user });
});

router.get("/getUserByType/:usertype", async (req, res, next) => {
  const usertype = req.params.usertype;
  const user = await User.find({ userType: usertype }).exec();
  res.send({ user });
});

router.get("/getUserByEmail/:email", async (req, res, next) => {
  const email = req.params.email;
  const users = await User.find({ email: email }).exec();
  res.send({ users });
});

// delete user by ID for testing
router.delete("/deleteUser/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    await User.deleteOne({ _id: id });
    res
      .status(200)
      .json({ message: `User with id: ${id} deleted successfully!` });
  } catch (err) {
    res.status(400).json({ message: err.message });
    return;
  }
});

module.exports = router;
