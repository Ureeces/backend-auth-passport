const User = require("../model/User");
const bcrypt = require("bcryptjs");
const dbErrorHelper = require("../../lib/dbErrorHelper/dbErrorHelper");

module.exports = {
  signUp: async (req, res) => {
    try {
      let createdUser = new User({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
      });

      let genSalt = await bcrypt.genSalt(12);
      let hashedPassword = await bcrypt.hash(createdUser.password, genSalt);

      createdUser.password = hashedPassword;

      createdUser.save();

      res.json({
        message: "User created",
      });
    } catch (e) {
      const { message, statusCode } = dbErrorHelper(e);

      res.status(500).json({
        message: dbErrorHelper(e),
      });
    }
  },

  login: () => {},
};
