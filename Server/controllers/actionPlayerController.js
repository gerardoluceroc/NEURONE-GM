const ActionPlayer = require('../models/actionPlayer');
const ActionChallenge = require('../models/actionChallenge');

const actionPlayerController = {};

actionPlayerController.getActionsPlayer = async (req, res) => {
    const app_name = req.params.app_name;
    const player_id = req.params.player_id;
    await ActionPlayer.find({ app_name: app_name, player_id: player_id }, (err, actions) => {
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
    const app_name = req.params.app_name;
    const player_id = req.params.player_id;
    const {action_name, action_id, date } = req.body;
    if(!action_name || !action_id || !date){
        return callback('Write all the fields');
    }
    var actionPlayer = new ActionPlayer({
        action_name: action_name,
        action_id: action_id,
        date: date,
        player_id: player_id,
        app_name: app_name
    });
    actionPlayer.save((err) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                err
            });
        }
        console.log({"time": Date.now(), "a": "primera"})
    });
    ActionChallenge.updateMany({app_name: app_name, player_id: player_id, action_id: action_id}, {$inc: {action_counter: 1}}, (err) => {
        if (err) {
            ActionPlayer.deleteOne({_id: actionPlayer._id});
            return res.status(404).json({
                ok: false,
                err
            });
        }
        console.log(Date.now())
    });
    await ActionChallenge.updateMany({app_name: app_name, player_id: player_id, action_id: action_id, $expr: {$eq:["$action_counter","$total_actions_required"]}}, {$set: {completed: true}}, (err,data) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                err
            });
        }
        console.log({"time": Date.now(), "a": "tercera"})
    });
    await ActionChallenge.aggregate([
        {$match: {player_id:player_id, active:true}},
        {$group: { _id: "$challenge_id", status: {$min: "$completed"}}}
    ], (err,data) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                err
            });
        }
        for(let i = 0; i<data.length; i++){
            if(data[i].status){
                console.log("Notificar que "+player_id+" ha completado el desafío "+data[i]._id);
            }
        }
        res.status(200).json({
            ok: true,
            data
        });
    });

};

actionPlayerController.test = async (req, res) => {
    ActionChallenge.find({$expr: {$eq:["$action_counter","$total_actions_required"]}}, (err, data ) => {
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
    });
    const x = ActionPlayer.findOne({app_name: "NEURONE"});
    console.log(x);
}


module.exports = actionPlayerController;
