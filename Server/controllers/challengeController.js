const Challenge = require('../models/challenge');
const ActionChallenge = require('../models/actionChallenge');
const ChallengeRequisite = require('../models/challengeRequisite');
const ChallengePlayer = require('../models/challengePlayer');
const challengeController = {};

challengeController.getChallenges = async (req, res) => {
    const app_name = req.params.app_name;
    await Challenge.find({ app_name: app_name }, (err, data) => {
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

challengeController.postChallenge = async (req, res) => {
    const app_name = req.params.app_name;
    const {name, description, start_date, end_date, assign_to, actions_required, challenges_required, badge_id, identifier} = req.body;
    if(!name || !description || !start_date || !end_date || !assign_to || !actions_required || !challenges_required || identifier){
        res.status(400).send('Write all the fields');
        return;
    }
    var challenge = new Challenge({
        name: name,
        description: description,
        app_name: app_name,
        start_date: start_date,
        end_date: end_date,
        assign_to: assign_to,
        actions_required: actions_required,
        challenges_required: challenges_required,
        badge_id: badge_id,
        identifier: identifier
    });
    await challenge.save( (err) => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
    });
    const actionsChallenges = [];
    const challengeRequisites = [];
    const challengesPlayers = [];
    for (let i = 0 ; i < actions_required.length ; i++){
        actionsChallenges.push(new ActionChallenge({
            app_name: app_name,
            player_id: "5efff75cf7e4097189574527",
            challenge_id: challenge._id,
            challenge_name: name,
            action_id: actions_required[i].action_id,
            action_name: actions_required[i].name,
            action_counter: 0,
            total_actions_required: actions_required[i].times_required,
            start_date: start_date,
            end_date: end_date,
            completed: false,
            active: true,
        }))
    }
    for (let i = 0 ; i < challenges_required.length ; i++){
        challengeRequisites.push(new ChallengeRequisite({
            app_name: app_name,
            player_id: "5efff75cf7e4097189574527",
            challenge_id: challenge._id,
            challenge_name: name,
            challenge_required_id: challenges_required[i].challenge_id,
            challenge_required_name: challenges_required[i].name,
            completed: false,
            active: true,
        }))
    }
    for (let i = 0 ; i < 1 ; i++){
        challengesPlayers.push(new ChallengePlayer({
            app_name: app_name,
            player_id: "5efff75cf7e4097189574527",
            challenge_id: challenge._id,
            challenge_name: name,
            start_date: start_date,
            end_date: end_date,
            completed: false,
            active: true,
            badge_id: badge_id,
        }))
    }
    await ActionChallenge.insertMany(actionsChallenges,(err) => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
    });
    await ChallengeRequisite.insertMany(challengeRequisites,(err) => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
    });
    await ChallengePlayer.insertMany(challengesPlayers, (err) => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
    });
    res.status(200).json({
        ok: true,
        challenge
    });
};

challengeController.getChallengesRequisites = async (req, res)=>{
    const app_name = req.params.app_name;
    await ChallengeRequisite.find({ app_name: app_name}, (err, data) => {
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
}

challengeController.updateChallenge = async (req, res) => {

};

challengeController.deleteChallenge = async (req, res) => {

};

challengeController.getChallenge = async  (req, res) => {

};


module.exports = challengeController;
