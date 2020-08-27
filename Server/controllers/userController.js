const User = require('../models/user');

//const bcrypt = require("bcryptjs");

userController = {};

userController.signup =  async  (req, res) => {
    const {username, password, email} = req.body;
    const user = new User({
        username: username,
        email: email
    });
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "User "+user.username+" was registered successfully!" });
    });
};

module.exports = userController;