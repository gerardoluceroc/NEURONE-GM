const User = require('../models/user');
const UserToken = require('../models/userToken');
const axios = require("axios");

userController = {};

userController.signup =  async  (req, res) => {
    const {username, email} = req.body;
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
    await UserToken.deleteOne({username: username}, err => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
    })
    await axios.post(url, {username: username, password: password, service: "NEURONE-GM"}).then((axiosRes) => {
        const userToken = new UserToken({
            username: axiosRes.data.username,
            token: axiosRes.data.accessToken,
            timestamp: new Date(),
            expiration: 86400000
        })
        userToken.save(err => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.status(200).json({
                ok: true,
                data: axiosRes.data
            });
        })
    }).catch((err) => {
        res.status(200).json({
            ok: false,
            err: err.response.data
        });
    });
}

module.exports = userController;