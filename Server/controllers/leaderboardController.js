const Leaderboard = require('../models/leaderboard');
const ActionPlayer = require('../models/actionPlayer');
const Player = require('../models/player');
const Action = require('../models/action');
const codeGenerator = require('../utils/codeGenerator');

const leaderboardController = {};

leaderboardController.getLeaderboards = async (req, res) => {
    const app_code = req.params.app_code;
    await Leaderboard.find({ app_code: app_code }, {_id: 0}, (err, data) => {
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

leaderboardController.postLeaderboard = async (req, res) => {
    const app_code = req.params.app_code;
    const {name, parameter, element_code} = req.body;
    if(!name || !parameter || !element_code){
        res.status(400).send('Write all the fields');
        return;
    }
    let code = codeGenerator.codeGenerator(app_code, name, 'lb');
    const timesRepeated = await Leaderboard.countDocuments( { 'code' : { '$regex' : code, '$options' : 'i' } } );
    if(timesRepeated > 0){
        code = code+(timesRepeated+1).toString();
    }
    var leaderboard = new Leaderboard({
        app_code: app_code,
        name: name,
        parameter: parameter,
        element_code: element_code,
        code: code
    });
    await leaderboard.save( (err, data) => {
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

leaderboardController.updateLeaderboard = async (req, res) => {
    const leaderboard_code = req.params.leaderboard_code;
    const {name, abbreviation, initial_points, max_points, daily_max, is_default, hidden, code} = req.body;
    await Leaderboard.updateOne( { code: leaderboard_code}, req.body, (err, data) => {
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

leaderboardController.deleteLeaderboard = async (req, res) => {
    const leaderboard_code = req.params.leaderboard_code;
    await Leaderboard.deleteOne( { code: leaderboard_code}, (err, data) => {
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

leaderboardController.getLeaderboard = async  (req, res) => {
    const leaderboard_code = req.params.leaderboard_code;
    await Leaderboard.findOne( { code: leaderboard_code}, {_id: 0}, (err, data) => {
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

leaderboardController.makeLeaderboard = async (req, res)=> {
    const leaderboard_code = req.params.leaderboard_code;
    const app_code = req.params.app_code;
    const leaderboard = await Leaderboard.findOne({code: leaderboard_code}, err =>{
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
    });
    const players = await Player.find({app_code: app_code}, err =>{
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
    });
    if(leaderboard.parameter ==='actions'){
        const leaderboardResult = [];
        const action  = await Action.findOne({app_code: app_code, code: leaderboard.element_code}, err=>{
            if(err){
                return res.status(404).json({
                    ok: false,
                    err
                });
            }
        });
        for(let i = 0; i<players.length; i++){
            await ActionPlayer.countDocuments({app_code: app_code, action: action._id, player: players[i]._id}, (err, count)=>{
                if(err){
                    return res.status(404).json({
                        ok: false,
                        err
                    });
                }
                leaderboardResult.push({name: players[i].name, last_name: players[i].last_name, amount: count})
            })
        }
        res.status(200).json({
            ok: true,
            leaderboardResult
        });
    }
    else{
        res.status(400).send('Fail');
    }
};


module.exports = leaderboardController;
