const mongoose = require("mongoose");
const createError = require("http-errors");

const User = require("../models/User");
/* const { check } = require("../lib/encryption"); */

exports.getUsers = async (req, res, next) => {
  /*   const queryObject = {};
  if (req.query.city) queryObject["address.city"] = req.query.city;
  if (req.query.services || { $exists: true, $not: { $size: 0 } })
    queryObject.services = req.query.services;
  if (req.query.price) queryObject.price = req.query.price;
  if (req.query.rate) queryObject.rate = req.query.rate; */
  const search = {
    city:
      (req.query.city &&
        req.query.city.replace(/(?:^|\s|[-"'([{])+\S/g, (c) =>
          c.toUpperCase()
        )) ||
      null,
    services: req.query.services || { $exists: true, $not: { $size: 0 } },
    price: req.query.price || null,
    rate: req.query.rate || null,
  };
  console.log(search);
  try {
    const users = await User.find(search).populate("services");
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    // const newUser = new User(req.body);
    const newUser = new User({ ...req.body, role: "user" });
    await newUser.save();
    const token = await newUser.generateAuthToken();
    /* console.log("newUser", newUser);
    const addedUser = await User.find({ email: req.body.email });
    console.log("addedUser", addedUser);
    if (addedUser) {
      res.cookie("loggedIn", true, {
        expires: new Date(Date.now() + 604800000),
        httpOnly: false,
      });
      res
        .cookie("X-Auth-Token", token, {
          expires: new Date(Date.now() + 604800000),
          httpOnly: true,
        })
        .status(201)
        .send(newUser);
    } */
    res
      .cookie("loggedIn", true, {
        expires: new Date(Date.now() + 604800000),
        httpOnly: false,
        "Access-Control-Allow-Origin":
          process.env.NODE_ENV === "production"
            ? "https://doitforme.com"
            : "http://localhost:3001",
      })
      .cookie("X-Auth-Token", token, {
        expires: new Date(Date.now() + 604800000),
        httpOnly: true,
        "Access-Control-Allow-Origin":
          process.env.NODE_ENV === "production"
            ? "https://doitforme.com"
            : "http://localhost:3001",
      })
      .status(201)
      .send(newUser);
  } catch (err) {
    if (err.code === 11000) console.log("it works");
    console.log(err);
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new createError.NotFound();
    const user = await User.findById(id);
    // .select('-password');
    if (!user) throw new createError.NotFound();
    if (req.canSeeFullUser) res.status(200).send(user);
    else {
      const reducedUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        services: user.services,
      };
      res.status(200).send(reducedUser);
    }
  } catch (err) {
    next(err);
  }
};

exports.userImage = async (req, res, next) => {
  try {
    console.log(req.file);
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new createError.NotFound();
    const imagePath = req.file.path;
    const updated = await User.findByIdAndUpdate(id, { image: imagePath });
    if (!updated) throw new createError.NotFound();

    res.status(200).send(updated);
  } catch (err) {
    next(err);
  }
};
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new createError.NotFound();
    const found = await User.findById(id);
    if (!found) throw new createError.NotFound();
    for (const key in req.body) {
      found[key] = req.body[key];
    }
    found.role = "user";
    found.save();
    res.status(200).send(found);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new createError.NotFound();
    const deleted = await User.findByIdAndRemove(id);
    if (!deleted) throw new createError.NotFound();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Check if user with the given email exists
    const loginUser = await User.findOne({ email });
    // If email doesn't exist, throw an error
    if (!loginUser)
      throw new createError.Unauthorized(
        "Your email or password was incorrect! Please try again"
      );
    const isAuthenticated = await loginUser.authenticate(password);
    // If password doesn't match, throw an error
    if (!isAuthenticated)
      throw new createError.Unauthorized(
        "Your email or password was incorrect! Please try again"
      );
    // Since password match, create a JWT token and save it with the user
    const token = await loginUser.generateAuthToken();
    // Send the token to the client so they can access protected routes
    res.cookie("loggedIn", true, {
      expires: new Date(Date.now() + 604800000),
      httpOnly: false,
    });
    res
      .cookie("X-Auth-Token", token, {
        expires: new Date(Date.now() + 604800000),
        httpOnly: true,
      })
      .status(200)
      .send(loginUser);
  } catch (err) {
    next(err);
  }
};
