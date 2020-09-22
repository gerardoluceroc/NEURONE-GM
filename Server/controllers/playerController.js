const Player = require('../models/player');
const Point = require('../models/point');
const Challenge = require('../models/challenge');
const ChallengePlayer = require('../models/challengePlayer');
const ChallengeRequisite = require('../models/challengeRequisite');
const ActionChallenge = require('../models/actionChallenge');
const ActionPlayer = require('../models/actionPlayer');
const PointPlayer = require('../models/pointPlayer');
const BadgePlayer = require('../models/badgePlayer');
const Level = require('../models/level');
const LevelPlayer = require('../models/levelPlayer');

const codeGenerator = require('../services/codeGenerator');
const playerController = {};

playerController.getPlayers = async (req, res) => {
    const app_code = req.params.app_code;
    await Player.find({ app_code: app_code }, (err, players) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            players
        });
    });
};

playerController.postPlayer = async (req, res) => {
    const app_code = req.params.app_code;
    const {name, last_name, sourceId} = req.body;
    let code = await codeGenerator.codeGenerator(app_code, name, 'player');
    const timesRepeated = await Player.countDocuments( { 'code' : { '$regex' : code, '$options' : 'i' } } );
    if(timesRepeated > 0){
        code = code+(timesRepeated+1).toString();
    }
    const player = new Player({
        name: name,
        last_name: last_name,
        app_code: app_code,
        code,
        sourceId
    });
    if(req.file){
        let image_url = 'http://localhost:3080/api/image/'+req.file.filename;
        player.image_url = image_url;
        player.image_id = req.file.id;
    }
    const points = await Point.find({app_code: app_code}, err => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
    })
    const challenges = await Challenge.find({app_code: app_code}, err => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
    })
    const levels = await  Level.find({app_code: app_code}, err => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
    }).populate('point_required');
    pointsPlayer = [];
    challengesPlayer = [];
    challengesRequisite = [];
    levelsPlayer = [];
    actionsChallenge = [];
    for(let i = 0; i<points.length; i++){
        pointsPlayer.push(new PointPlayer({
            app_code: app_code,
            player: player._id,
            point: points[i]._id,
            amount: points[i].initial_points
        }))
    }
    for(let i = 0; i<levels.length; i++){
        let levelPlayer = new LevelPlayer({
            app_code: app_code,
            player: player._id,
            level: levels[i]._id,
            point: levels[i].point_required,
            point_threshold: levels[i].point_threshold
        })
        if(levels[i].point_threshold <= levels[i].point_required.initial_points ){
            levelPlayer.acquired = true;
            levelPlayer.acquisition_date = new Date();
        }
        else{
            levelPlayer.acquired = false;
            levelPlayer.acquisition_date = null;
        }
        levelsPlayer.push(levelPlayer);
    }
    for(let i = 0; i<challenges.length; i++){
        let challengePlayer = new ChallengePlayer({
            app_code: app_code,
            player: player._id,
            challenge: challenges[i]._id,
            completed: false,
            start_date: challenges[i].start_date,
            end_date: challenges[i].end_date
        })
        if(challenges[i].badge){
            challengePlayer.badge = challenges[i].badge;
        }
        if(challenges[i].challenges_required && challenges[i].challenges_required.length > 0){
            challengePlayer.active = false;
            chall_req = challenges[i].challenges_required;
            for(let j = 0; j<chall_req.length; j++){
                let challengeRequisite = new ChallengeRequisite({
                    app_code: app_code,
                    player: player._id,
                    challenge: challenges[i]._id,
                    challenge_required: chall_req[j].challenge,
                    completed: false,
                    start_date: challenges[i].start_date,
                    end_date: challenges[i].end_date
                })
                challengesRequisite.push(challengeRequisite);
            }
        }
        else{
            challengePlayer.active = true;
        }
        actions_req = challenges[i].actions_required;
        for(let j = 0; j<actions_req.length; j++){
            let actionChallenge = new ActionChallenge({
                app_code: app_code,
                player: player._id,
                challenge: challenges[i]._id,
                action: actions_req[j].action,
                action_counter: 0,
                total_actions_required: actions_req[j].times_required,
                completed: false,
                start_date: challenges[i].start_date,
                end_date: challenges[i].end_date,
                active: challengePlayer.active
            })
            actionsChallenge.push(actionChallenge);
        }
        challengesPlayer.push(challengePlayer);
    }
    await ActionChallenge.insertMany(actionsChallenge,(err) => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
    });
    await ChallengePlayer.insertMany(challengesPlayer, (err) => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
    });
    await ChallengeRequisite.insertMany(challengesRequisite,(err) => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
    });
    await LevelPlayer.insertMany(levelsPlayer,(err) => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
    });
    await PointPlayer.insertMany(pointsPlayer,(err) => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
    });
    await player.save( (err, data) => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            data
        });
    })
};

playerController.updatePlayer = async (req, res) => {
    const player_code = req.params.player_code;
    const {name, last_name, code, sourceId} = req.body;
    await Player.findOne( { code: player_code}, (err, player) => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
        if(name){
            player.name = name;
        }
        if(last_name){
            player.last_name = last_name;
        }
        if(code){
            player.code = code;
        }
        if(sourceId){
            player.sourceId = sourceId;
        }
        if(req.file){
            if(player.image_id){
                imageStorage.gfs.delete(player.image_id);
            }
            let image_url = 'http://localhost:3080/api/image/'+req.file.filename;
            player.image_url = image_url;
            player.image_id = req.file.id;
        }
        player.save((err , data) => {
            if(err){
                return res.status(404).json({
                    ok: false,
                    err
                });
            }
            res.status(200).json({
                ok: true,
                data
            });
        })
    })
};

playerController.deletePlayer = async (req, res) => {
    const player_code = req.params.player_code;
    const player = await Player.findOne( { code: player_code}, err => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
    })
    if(player.image_id){
        imageStorage.gfs.delete(action.image_id);
    }
    await ActionChallenge.deleteMany({player: player._id}, err => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
    });
    await ActionPlayer.deleteMany({player: player._id}, err => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
    });
    await BadgePlayer.deleteMany({player: player._id}, err => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
    });
    await ChallengePlayer.deleteMany({player: player._id}, err => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
    });
    await PointPlayer.deleteMany({player: player._id}, err => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
    });
    await Player.deleteOne( { _id: player._id}, (err, data) => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            data
        });
    })
};

playerController.getPlayer = async  (req, res) => {
    const player_code = req.params.player_code;
    await Player.findOne( { code: player_code}, {_id: 0}, (err, data) => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            data
        });
    })
};

playerController.getPlayerCompletedChallenges = async (req, res) => {
    const player_code = req.params.player_code;
    const player = await Player.findOne( { code: player_code}, err => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
    })
    await ChallengePlayer.find({player: player._id, completed: true}, (err, data) =>{
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            data
        });
    }).populate('challenge').populate('player')
}

playerController.getPlayerPoints = async (req, res) => {
    const player_code = req.params.player_code;
    const player = await Player.findOne( { code: player_code}, err => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
    })
    await PointPlayer.find({player: player._id}, (err, pointPlayer) => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
        let data = [];
        for(let i = 0; i<pointPlayer.length; i++){
            if(pointPlayer[i].point){
                data.push(pointPlayer[i]);
            }
        }
        res.status(200).json({
            ok: true,
            data
        });
    }).populate('point').populate('player')
}

playerController.getPlayerBadges = async (req, res) => {
    const player_code = req.params.player_code;
    const player = await Player.findOne( { code: player_code}, err => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
    })
    await BadgePlayer.find({player: player._id}, (err, data) => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            data
        });
    }).populate('badge').populate('player')
}

playerController.getPlayerLevels = async (req, res) => {
    const player_code = req.params.player_code;
    const player = await Player.findOne( { code: player_code}, err => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
    })
    await LevelPlayer.find({player: player._id, acquired: true}, (err, data) => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            data
        });
    }).populate('level').populate('player')
}


module.exports = playerController;
