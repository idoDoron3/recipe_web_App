var express = require("express");
var router = express.Router();
const MySql = require("../routes/utils/MySql");
const DButils = require("../routes/utils/DButils");
const bcrypt = require("bcrypt");



router.post("/register", async (req, res, next) => {
  try {
    // parameters exists
    // valid parameters
    // username exists
    let user_details = {
      username: req.body.username,
      firstname: req.body.first_name,
      lastname: req.body.last_name,
      country: req.body.country,
      password: req.body.password,
      email: req.body.email,
      profilePic: req.body.profilePic
    }
    console.log(user_details.firstname);  // Log the correct variable
    console.log(user_details.lastname);   // Log the correct variable

    let users = [];
    users = await DButils.execQuery("SELECT username from users");

    if (users.find((x) => x.username === user_details.username))
      throw { status: 409, message: "Username taken" };

    //Check if the email already exists
    users = await DButils.execQuery(`SELECT email FROM users WHERE email = '${user_details.email}'`);
    if (users.length > 0) {
      throw { status: 409, message: "Email already in use" };
    }
    // add the new username
    let hash_password = bcrypt.hashSync(
      user_details.password,
      parseInt(process.env.bcrypt_saltRounds)
    );

    console.log("Password before hashing: ", user_details.password);
    console.log("Hashed password: ", hash_password);
    
    await DButils.execQuery(
      `INSERT INTO users (username, first_name, last_name, country, password, email)
       VALUES ('${user_details.username}', '${user_details.firstname}', '${user_details.lastname}',
               '${user_details.country}', '${hash_password}', '${user_details.email}')`
    );
    
    res.status(201).send({ message: "user created", success: true });
  } catch (error) {
    console.error("Registration error: ", error); // Log the error

    next(error);
  }
});

router.post("/Login", async (req, res, next) => {
  try {
    const users = await DButils.execQuery("SELECT username FROM users");
    if (!users.find((x) => x.username === req.body.username))
      throw { status: 401, message: "Username or Password incorrect" };

    // check that the password is correct
    const user = (
      await DButils.execQuery(
        `SELECT * FROM users WHERE username = '${req.body.username}'`
      )
    )[0];

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      throw { status: 401, message: "Username or Password incorrect" };
    }
    // Set cookie
    if (!req.session) {
      throw new Error("Session is not initialized");
    }

    // Set session user_id
    req.session.user_id = user.user_id;
    console.log("User ID saved in session:", req.session.user_id);
    
    // return cookie
    res.status(200).send({ message: "login succeeded", success: true });
  } catch (error) {
    next(error);
  }
});

router.post("/Logout", function (req, res) {
  req.session.reset(); // reset the session info --> send cookie when  req.session == undefined!!
  res.send({ success: true, message: "logout succeeded" });
});

module.exports = router;