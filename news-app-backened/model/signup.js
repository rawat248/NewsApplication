const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  image: String,
});

const Signup = mongoose.model("signup", userSchema);
module.exports = Signup;
