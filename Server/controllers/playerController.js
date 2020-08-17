const Player = require('../models/player');
const codeGenerator = require('../utils/codeGenerator');
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
    const {name, last_name} = req.body;
    let code = await codeGenerator.codeGenerator(app_code, name, 'player');
    const timesRepeated = await Player.countDocuments( { 'code' : { '$regex' : code, '$options' : 'i' } } );
    if(timesRepeated > 0){
        code = code+(timesRepeated+1).toString();
    }
    if(!name || !last_name ){
        res.status(400).send('Write all the fields');
        return;
    }
    var player = new Player({
        name: name,
        last_name: last_name,
        app_code: app_code,
        code,
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
