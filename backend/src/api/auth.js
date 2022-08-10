const router = require("express").Router();
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const { User } = require("../db/models");

// jwt generator function
const createToken = (id, userType) => {
  const newToken = jwt.sign({ id, userType }, "powerrangers", {
    expiresIn: "1h",
  });
  return newToken;
};

//Login route
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    res.status(400).json({ message: "All fields must be filled" });
    return;
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({ message: "Incorrect email" });
    return;
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    res.status(400).json({ message: "Invalid credentials" });
  } else {
    // creating token
    const token = createToken(user._id, user.userType);

    res
      .status(200)
      .json({ id: user._id, email, token, userType: user.userType });
  }
});

//Signup route
router.post("/signup", async (req, res, next) => {
  const { fname, lname, email, password, phone, userType } = req.body;

  // validation
  if (!fname || !lname || !email || !password || !phone || !userType) {
    res.status(400).json({ message: "All fields must be filled" });
    return;
  }

  if (!validator.isEmail(email)) {
    res.status(400).json({ message: "Invalid email" });
    return;
  }

  // if (!validator.isStrongPassword(password)) {
  //   res.status(400).json({ message: "Please use a strong password" });
  //   return;
  // }

  const exists = await User.findOne({ email });

  if (exists) {
    res.status(400).json({ message: "Email already in use" });
    return;
  }

  // encrypting/hashing password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  try {
    // creating userF
    const user = await User.create({
      fname,
      lname,
      email,
      phone,
      password: hash,
      userType,
    });

    // creating token
    const token = createToken(user._id, user.userType);

    res
      .status(200)
      .json({ id: user._id, email, token, userType: user.userType });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
