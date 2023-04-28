const express = require("express");
const multer = require("multer");
const path = require("path");
// const Signup = require("../model/signup");
const {
  getUser,
  addUser,
  getPosts,
  getUsers,
  editUser,
  deleteUser,
  createUser,
  getLogin,
  getSearch,
  getProfile,
} = require("../controller/user-controller");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "image",
  filename: (req, file, cb) => cb(
    null,
    `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`,
  ),
});

const upload = multer({ storage });

router.get("/", getUsers);
router.post("/add-news", addUser);
router.get("/post", getPosts);
router.get("/:id", getUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);
router.post("/register", upload.single("image"), createUser);
router.get("/profile/:id", getProfile);
router.post("/login", getLogin);
router.get("/search/:key", getSearch);

module.exports = router;
