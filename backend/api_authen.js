const express = require("express");
const router = express.Router();
const user = require("./models/user");
const bcrypt = require("bcryptjs");
const constants = require("./constant");

router.post("/login", async (req, res) => {
  console.log("login: " + JSON.stringify(req.body));
  const { username, password } = req.body;
  const result = await user.findOne({ where: { username: username } });
  try {
    if (result) {
      if (bcrypt.compareSync(password, result.password)) {
        res.json({
          result: constants.kResultOk,
          message: JSON.stringify(result),
        });
      } else {
        res.json({ result: constants.kResultNok, message: "Invalid password" });
      }
    } else {
      res.json({ result: constants.kResultNok, message: "Invalid username" });
    }
  } catch (error) {
    res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await user.findOne({ where: { username: username } });
    if (foundUser) {
      // duplicate username
      res.json({
        result: constants.kResultNok,
        message: JSON.stringify(error),
      });
    }

    console.log("register: " + JSON.stringify(req.body));
    req.body.password = await bcrypt.hash(password, 8);
    const result = await user.create(req.body);
    res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
  } catch (error) {
    res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
  }
});

module.exports = router;
