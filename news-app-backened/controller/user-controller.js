const Joi = require("joi");
const User = require("../model/user");
const Signup = require("../model/signup");

exports.getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);

    const skip = (page - 1) * size;

    const total = await User.countDocuments();
    const users = await User.find().skip(skip).limit(size);

    res.json({
      records: users,
      total,
      page,
      size,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.addUser = async (request, response) => {
  try {
    const schema = Joi.object({
      image: Joi.string().required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
      posted: Joi.date(),
    });

    const { error } = schema.validate(request.body);

    if (error) return response.status(400).send(error.details[0].message);

    const user = request.body;

    const newUser = new User(user);

    await newUser.save();
    response.send(newUser);
  } catch (error) {
    response.status(500).send(error.message);
  }
};

exports.getPosts = async (req, res) => {
  // try {
  //   const users = await User.find();
  //   response.status(200).json(users);
  // } catch (error) {
  //   response.status(404).json({ message: error.message });
  // }
  try {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);

    const skip = (page - 1) * size;

    const total = await User.countDocuments();
    const users = await User.find().skip(skip).limit(size);

    res.json({
      records: users,
      total,
      page,
      size,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getUser = async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    response.status(200).json(user);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

exports.editUser = async (request, response) => {
  const user = request.body;

  const editUser = new User(user);
  try {
    await User.updateOne({ _id: request.params.id }, editUser);
    response.status(201).json(editUser);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

exports.deleteUser = async (request, response) => {
  try {
    await User.deleteOne({ _id: request.params.id });
    response.status(201).json("User deleted Successfully");
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  console.log(req.body);
  try {
    const {
      firstname, lastname, email, password,
    } = req.body;
    let image = null;

    if (req.file) {
      image = req.file.path;
    }

    let user = await Signup.create({
      firstname,
      lastname,
      email,
      password,
      image,
    });

    user = user.toObject();
    delete user.password;

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getProfile = async (request, response) => {
  try {
    const user = await Signup.findById(request.params.id).select("-password -email");
    response.status(200).json(user);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

exports.getLogin = async (request, response) => {
  if (request.body.password && request.body.email) {
    const user = await Signup.findOne(request.body).select("-password");
    if (user) {
      response.send(user);
    } else {
      response.send({ result: "No user found" });
    }
  } else {
    response.send({ result: "No user found" });
  }
};

exports.getSearch = async (request, response) => {
  const result = await User.find({
    $or: [
      { title: { $regex: request.params.key } },
    ],
  });
  response.send(result);
};
