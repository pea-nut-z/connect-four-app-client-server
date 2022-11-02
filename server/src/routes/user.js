import express from "express";
import Users from "../model/Users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authToken } from "../middleware/authToken.js";

const router = express.Router();

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
  try {
    const update = await Users.findOneAndUpdate(
      { _id: req.user._id },
      { ...req.body },
      { new: true, fields: { _id: 0, __v: 0, password: 0 } }
    );
    console.log({ update });

    res.json(update);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export default router;
