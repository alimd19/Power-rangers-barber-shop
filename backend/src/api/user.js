const router = require("express").Router();
const { User } = require("../db/models");

router.get("/getUser/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/getUserByType/:usertype", async (req, res, next) => {
  const usertype = req.params.usertype;
  if (usertype != "") {
    const user = await User.find({ userType: usertype }).exec();
    res.status(200).json({ user });
  } else {
    res.status(400).json({ message: "Invalid Request" });
  }
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

// update a user
router.put("/updateUser/:id", async (req, res, next) => {
  const id = req.params.id;
  console.log(id);

  try {
    await User.updateOne({ _id: id }, [
      {
        $set: {
          fname: req.body.fname,
          lname: req.body.lname,
          email: req.body.email,
        },
      },
    ]);

    res
      .status(200)
      .json({ message: `User with id: ${id} updated successfully!` });
  } catch (err) {
    res.status(400).json({ message: err.message });
    return;
  }
});

module.exports = router;
