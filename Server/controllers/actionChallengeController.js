const ActionChallenge = require('../models/actionChallenge');

const actionChallengeController = {};

actionChallengeController.getActionsChallenges = async (req, res) => {
    const app_name = req.params.app_name;
    await ActionChallenge.find({ app_name: app_name}, (err, data) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            data
        });
    });
};

actionChallengeController.test = async (req, res) => {

};



module.exports = actionChallengeController;
