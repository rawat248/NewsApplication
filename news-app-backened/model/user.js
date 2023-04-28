const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
  posted: Date,

});
// const Schema = mongoose.Schema;
// const userSchema = new Schema({
//   Image: {
//     type: String,
//     required: true,
//   },
//   Title: {
//     type: String,
//     required: true,
//   },
//   Description: {
//     type: String,
//     required: true,
//   },

// });

const postUser = mongoose.model("user", userSchema);

module.exports = postUser;
// module.exports = mongoose.model("user", userSchema);
