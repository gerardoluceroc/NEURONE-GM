const User = require('../models/user');
const axios = require("axios");

userController = {};

userController.signup =  async  (req, res) => {
    const {username, email} = req.body;
    console.log("hi")
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

userController.signin = async (req, res) => {
    const {username, password} = req.body;
    const url = process.env.AuthPORT+'/credential/signin';
    await axios.post(url, {username: username, password: password, service: "NEURONE-GM"}).then((axiosRes) => {
        res.status(200).json({
            ok: true,
            data: axiosRes.data
        });
    }).catch((err) => {
        res.status(200).json({
            ok: false,
            err: err.response.data
        });
    });
}

module.exports = userController;