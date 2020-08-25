const ActionPlayer = require('../models/actionPlayer');
const Player = require('../models/player');
const Action = require('../models/action');
const ActionChallenge = require('../models/actionChallenge');
const ChallengeRequisite = require('../models/challengeRequisite');
const ChallengePlayer = require('../models/challengePlayer');
const Challenge = require('../models/challenge');
const PointPlayer = require('../models/pointPlayer');

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
    const player = await Player.findOne({code: player_code}, (err,pla) => {
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
    await actionPlayer.save((err) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                err
            });
        }
    });
    //Se suma una acción realizada dentro del modelo action challenge (el cual lleva la cuenta de cuantas acciones realizadas del jugador para completar un desafío)
    await ActionChallenge.updateMany({
        app_code: app_code,
        player: player._id,
        action: action._id, 
        active: true,
        completed: false,
        $and: [
            { $expr: {$gte: [new Date(date), "$start_date"]} },
            { $expr: {$lte: [new Date(date), "$end_date"]} }
        ]
        },
        {$inc: {action_counter: 1}
    });
    await ActionChallenge.updateMany({
        app_code: app_code, 
        player: player._id, 
        action: action._id,
        active: true, 
        $expr: {$gte:["$action_counter","$total_actions_required"]},
        $and: [
            { $expr: {$gte: [new Date(date), "$start_date"]} },
            { $expr: {$lte: [new Date(date), "$end_date"]} }
        ]},
        {$set: {completed: true}}, (err) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                err
            });
        }
    });
    //Se hace una agregación de todas las entradas actionChallenge, tomando como id al challenge y al value como el mínimo del campo completed
    //Esto debido a que cuando un desafío ha sido completado, el mínimo de campo completado será true.
    await ActionChallenge.aggregate([
        {$match: {player:player._id, active: true, $and: [
            { $expr: {$gte: [new Date(date), "$start_date"]} },
            { $expr: {$lte: [new Date(date), "$end_date"]} }
        ]}},
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
                ChallengePlayer.findOne({app_code: app_code,player: player._id, challenge: data[i]._id},(err, challPlayer) => {
                    if (err) {
                        return res.status(404).json({
                            ok: false,
                            err
                        });
                    }
                    if(challPlayer.completed === false){
                        challPlayer.completed = true;
                        challPlayer.save(err => {
                            if (err) {
                                return res.status(404).json({
                                    ok: false,
                                    err
                                });
                            }
                        })
                        ChallengeRequisite.updateMany({app_code: app_code, player: player._id, challenge_required: data[i]._id}, {$set: {completed: true}}, (err) => {
                            if (err) {
                                return res.status(404).json({
                                    ok: false,
                                    err
                                });
                            }
                            ChallengeRequisite.aggregate([
                                {$match: {player:player._id}},
                                {$group: { _id: "$challenge", status: {$min: "$completed"}}}
                            ], (err, challReqAgr) =>{
                                if (err) {
                                    return res.status(404).json({
                                        ok: false,
                                        err
                                    });
                                }
                                for(let n = 0; n<challReqAgr.length; n++){
                                    if(challReqAgr[n].status){
                                        ActionChallenge.updateMany({app_code: app_code, player: player._id, challenge: challReqAgr[n]._id, active: false}, {$set: {active: true}},
                                            err => {
                                                if(err){
                                                    return res.status(404).json({
                                                        ok: false,
                                                        err
                                                    });
                                                }
                                            }
                                        );
                                        ChallengePlayer.updateMany({app_code: app_code, player: player._id, challenge: challReqAgr[n]._id, active: false}, {$set: {active: true}},
                                            err => {
                                                if(err){
                                                    return res.status(404).json({
                                                        ok: false,
                                                        err
                                                    });
                                                }
                                            }
                                        );
                                    }
                                }
                            })
                        });
                        Challenge.findOne({_id: data[i]._id}, (err, chall) => {
                            if (err) {
                                return res.status(404).json({
                                    ok: false,
                                    err
                                });
                            }
                            console.log("Notificar que "+player.name+" "+player.last_name+" ha completado el desafío "+ chall.name);
                            for(let i = 0; i<chall.points_awards.length; i++){
                                PointPlayer.findOne({point: chall.points_awards[i].point._id, player: player._id}, (err, pointPlayer)=>{
                                    if (err) {
                                        return res.status(404).json({
                                            ok: false,
                                            err
                                        });
                                    }
                                    if(pointPlayer){
                                        pointPlayer.amount += chall.points_awards[i].amount;
                                        pointPlayer.save(err=>{
                                            if (err) {
                                                return res.status(404).json({
                                                    ok: false,
                                                    err
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        }).populate( 'points_awards.point')
                    }
                });
            }
        }
    });
    res.status(200).json({
        ok: true,
        actionPlayer
    });
};

actionPlayerController.test = (req, res) => {
    const date = new Date(req.body.date);
    Challenge.find({app_code: "NEURONE-A-DAY", $and: [
        { $expr: {$gte: [date, "$start_date"]} },
        { $expr: {$lte: [date, "$end_date"]} }
    ]}
      , (err,data)=>{
        res.status(200).json({
            ok: true,
            data
        });
    });
}

module.exports = actionPlayerController;
