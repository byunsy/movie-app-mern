// Require Express.js and create port
const express = require("express");
const app = express();
const port = 5000;
const cookieParser = require("cookie-parser");

/// ======================================================================== //
// SET UP LOCAL HOST AND DATABASE
// ========================================================================= //

// Check if local host port has opened successfully
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Connect to dev.js or prod.js depending on process.env
const config = require("./config/key");

// Connect to MongoDB using Mongoose
const mongoose = require("mongoose");

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// ========================================================================= //
// MODELS AND ROUTES
// ========================================================================= //

// Use express to read/parse the body of incoming object
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use cookie-parser to save generated token in cookie
app.use(cookieParser());

// Routes for users and favorite
app.use("/api/users", require("./routes/users"));
app.use("/api/favorite", require("./routes/favorite"));
