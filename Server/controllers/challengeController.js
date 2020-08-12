const Challenge = require('../models/challenge');
const Action = require('../models/action');
const Point = require('../models/point');
const Player = require('../models/player');
const ActionChallenge = require('../models/actionChallenge');
const ChallengeRequisite = require('../models/challengeRequisite');
const ChallengePlayer = require('../models/challengePlayer');
const codeGenerator = require('../utils/codeGenerator');
const challengeController = {};

challengeController.getChallenges = async (req, res) => {
    const app_code = req.params.app_code;
    await Challenge.find({ app_code: app_code }, (err, data) => {
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
    }).populate('actions_required.action').populate('challenges_required.challenge').populate( 'points_awards.point')
};

challengeController.postChallenge = async (req, res) => {
    const app_code = req.params.app_code;
    const {name, description, start_date, end_date, assign_to, actions_required, challenges_required, badge_id, points_awards} = req.body;
    if(!name || !description || !start_date || !end_date || !assign_to){
        res.status(400).send('Write all the fields');
        return;
    }
    let code = codeGenerator.codeGenerator(app_code, name, 'chall');
    const timesRepeated = await Challenge.countDocuments( { 'code' : { '$regex' : code, '$options' : 'i' } } );
    if(timesRepeated > 0){
        code = code+(timesRepeated+1).toString();
    }
    let actions = [];
    let challenges = [];
    let points = [];
    if(actions_required && actions_required.length > 0){
        for(let i = 0; i<actions_required.length; i++){
            await Action.findOne({code: actions_required[i].action_code}, (err, action)=>{
                if(err){
                    return res.status(404).json({
                        ok: false,
                        err
                    });
                }
                actions.push({action: action._id, times_required: actions_required[i].times_required});
            })
        }
    }
    if(challenges_required && challenges_required.length > 0){
        for(let i = 0; i<challenges_required.length; i++){
            await Challenge.findOne({code: challenges_required[i].challenge_code}, (err, challenge)=>{
                if(err){
                    return res.status(404).json({
                        ok: false,
                        err
                    });
                }
                challenges.push({challenge: challenge._id});
            })
        }}
    if(points_awards && points_awards.length > 0){
            for(let i = 0; i<points_awards.length; i++){
                await Point.findOne({code: points_awards[i].point_code}, (err, point)=>{
                    if(err){
                        return res.status(404).json({
                            ok: false,
                            err
                        });
                    }
                    points.push({point: point._id, amount: points_awards[i].amount});
                })
            }
        }
    var challenge = new Challenge({
        name: name,
        description: description,
        app_code: app_code,
        start_date: start_date,
        end_date: end_date,
        assign_to: assign_to,
        code: code,
        actions_required: actions,
        challenges_required: challenges,
        points_awards: points
    });
    await challenge.save( (err ) => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
    });
    const players = await Player.find({ app_code: app_code }, (err) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                err
            });
        }
    });
    const actionsChallenges = [];
    const challengeRequisites = [];
    const challengesPlayers = [];
    for (let i = 0 ; i < challenge.actions_required.length ; i++){
        for( let j = 0; j < players.length; j++){
            actionsChallenges.push(new ActionChallenge({
                app_code: app_code,
                player: players[j]._id,
                challenge: challenge._id,
                challenge_name: name,
                action: challenge.actions_required[i].action._id,
                action_counter: 0,
                total_actions_required: challenge.actions_required[i].times_required,
                start_date: start_date,
                end_date: end_date,
                completed: false,
                active: true,
            }))
        }
    }
    for (let i = 0 ; i < challenges_required.length ; i++){
        for(let j = 0; j<players.length; j++){
            challengeRequisites.push(new ChallengeRequisite({
                app_code: app_code,
                player_id: players[j]._id,
                challenge: challenge._id,
                challenge_required: challenges_required[i].challenge,
                completed: false,
                active: true,
            }))
        }
    }
    for (let i = 0 ; i < 1 ; i++){
        for(let j = 0; j<players.length; j++){
            challengesPlayers.push(new ChallengePlayer({
                app_code: app_code,
                player: players[j]._id,
                challenge: challenge._id,
                completed: false,
                active: true,
                badge_id: badge_id,
            }))
        }
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
