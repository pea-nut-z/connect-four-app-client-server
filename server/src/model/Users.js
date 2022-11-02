import mongoose from "mongoose";

const { Schema, model } = mongoose;

const requireStr = {
  type: String,
  require: true,
};

const defaultNum = {
  type: Number,
  default: 0,
};

const defaultStr = {
  type: String,
  default: "",
};

const schema = new Schema({
  userName: requireStr,
  email: requireStr,
  password: requireStr,
  played: defaultNum,
  won: defaultNum,
  token: requireStr,
});

const Users = model("users", schema);
export default Users;
