const ActionPlayer = require('../models/actionPlayer');
const Player = require('../models/player');
const Action = require('../models/action');
const ActionChallenge = require('../models/actionChallenge');
const ChallengeRequisite = require('../models/challengeRequisite');
const ChallengePlayer = require('../models/challengePlayer');

const actionPlayerController = {};

actionPlayerController.getActionsPlayer = async (req, res) => {
    const app_code = req.params.app_code;
    const player_code = req.params.player_code;
    const player = await Player.findOne({code: player_code}, (err) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                err
            });
        }
    });
    await ActionPlayer.find({ app_code: app_code, player: player._id }, (err, actions) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            actions
        });
    });
};

actionPlayerController.postActionPlayer = async (req, res) => {
    const app_code = req.params.app_code;
    const player_code = req.params.player_code;
    const {action_code, date } = req.body;
    if(!action_code || !date){
        res.status(400).send('Write all the fields');
    }
    const player = await Player.findOne({code: player_code}, (err) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                err
            });
        }
    });
    const action = await Action.findOne({code: action_code}, (err) => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            })
        }
    });
    var actionPlayer = new ActionPlayer({
        app_code: app_code,
        action: action._id,
        player: player._id,
        date: date
    });
    await ActionChallenge.updateMany({app_code: app_code, player: player._id, action: action._id, completed: false}, {$inc: {action_counter: 1}});
    await actionPlayer.save((err) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                err
            });
        }
    });
    await ActionChallenge.updateMany({app_code: app_code, player: player._id, action: action._id, $expr: {$gte:["$action_counter","$total_actions_required"]}}, {$set: {completed: true}}, (err) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                err
            });
        }
    });
    await ActionChallenge.aggregate([
        {$match: {player:player._id, active:true}},
        {$group: { _id: "$challenge", status: {$min: "$completed"}}}
    ], (err,data) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                err
            });
        }
        for(let i = 0; i<data.length; i++){
            if(data[i].status){
                ChallengeRequisite.updateMany({app_code: app_code, player: player._id, challenge_required: data[i]._id, active: true}, {$set: {completed: true}}, (err) => {
                    if (err) {
                        return res.status(404).json({
                            ok: false,
                            err
                        });
                    }
                });
                ChallengePlayer.updateOne({app_code: app_code, player: player._id, challenge: data[i]._id, active: true}, {$set: {completed: true}},(err) => {
                    if (err) {
                        return res.status(404).json({
                            ok: false,
                            err
                        });
                    }
                });
                console.log("Notificar que "+player.name+" "+player.last_name+" ha completado el desafío "+data[i]._id);;
            }
        }
    });
    res.status(200).json({
        ok: true,
        actionPlayer
    });
};


module.exports = actionPlayerController;
