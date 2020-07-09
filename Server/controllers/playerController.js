const Player = require('../models/player');

const playerController = {};

playerController.getPlayers = async (req, res) => {
    const app_name = req.params.app_name;
    await Player.find({ app_name: app_name }, (err, players) => {
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
    const app_name = req.params.app_name;
    const {name, last_name} = req.body;
    if(!name || !last_name){
        res.status(400).send('Write all the fields');
        return;
    }
    var player = new Player({
        name: name,
        last_name: last_name,
        app_name: app_name
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

};

playerController.deletePlayer = async (req, res) => {

};

playerController.getPlayer = async  (req, res) => {

};


module.exports = playerController;
