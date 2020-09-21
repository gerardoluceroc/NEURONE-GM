const Player = require('../models/player');

checkCreate = (req, res, next) => {
    //Check body fields
    const {name, last_name} = req.body;
    if(!name || !last_name){
        res.status(400).send('Write all the fields');
        return;
    }
    next();
};

checkPlayer = (req, res, next) => {
    const app_code = req.params.app_code;
    const player_code = req.params.level_code;
    // Check if Level exists
    Player.findOne({
        app_code: app_code,
        code: player_code
    }).exec((err, player) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!player) {
            res.status(400).send({ message: "Failed! Player doesn't exist!" });
            return;
        }
        next();
    });
}

checkCode = (req, res, next) =>{
    const app_code = req.params.app_code;
    const player_code = req.params.player_code;
    if(req.body.code && req.body.code !== player_code){
        Level.findOne({
            app_code: app_code,
            code: req.body.code
        }).exec((err, level) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (level) {
                res.status(400).send({ message: "Failed! Player Code already exists" });
                return;
            }
            next();
        });
    }
    else{
        next();
    }
}


const playerMiddleware = {
    checkCreate,
    checkPlayer,
    checkCode
};

module.exports = playerMiddleware;