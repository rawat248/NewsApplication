const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,

});

const Login = mongoose.model("login", userSchema);
module.exports = Login;
