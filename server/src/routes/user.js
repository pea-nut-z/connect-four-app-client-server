import express from "express";
import Users from "../model/Users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authToken } from "../middleware/authToken.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Cannot Find User");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET);
      const { userName, email, played, won } = user;
      res.json({ token, userName, email, played, won });
    } else {
      res.status(400).send("Invalid Password");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const data = { ...req.body, password: hashedPassword };
    const user = await Users.create(data);
    const { userName, email, played, won } = user;
    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET);
    res.json({ token, userName, email, played, won });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.patch("/update", authToken, async (req, res) => {
  if (req.body.password) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
  }

  try {
    const update = await Users.findOneAndUpdate(
      { _id: req.user._id },
      { ...req.body },
      { new: true, fields: { _id: 0, __v: 0, password: 0 } }
    );
    res.json(update);
  } catch (err) {
    res.sendStatus(500);
  }
});

export default router;
