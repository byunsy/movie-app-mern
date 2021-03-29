const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

// ========================================================================= //
// USERS ROUTES
// ========================================================================= //

// POST: REGISTER ROUTE =======================================================
// - Attain register-information from the client and store this info in the
//   database(MongoDB).
router.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    //  if error occurs
    if (err)
      return res.json({
        success: false,
        err,
      });
    //  if successful
    return res.status(200).json({
      success: true,
    });
  });
});

// POST: LOGIN ROUTE ==========================================================
router.post("/login", (req, res) => {
  // 1. Check if the requested email exists in the database.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "We could not find any user with this email address.",
      });
    }
    // 2. If there is one, check if the requested password matches
    //    the user's password in the database.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "Incorrect password.",
        });
      }
      // 3. If passwords match, then create token
      user.generateToken((err, user) => {
        if (err) {
          return res.status(400).send(err);
        }
        // Save token in cookie
        res.cookie("x_authExp", user.tokenExp);
        res.cookie("x_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

// GET: AUTHENTICATION ROUTE ==================================================
// - Need to use midleware called 'auth' in './middleware/auth.js'
router.get("/auth", auth, (req, res) => {
  // If reached here, it must mean that the user has passed authentication
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

// GET: LOGOUT ROUTE ==========================================================
router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, user) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).send({ success: true });
  });
});

module.exports = router;
