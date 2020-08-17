const Point = require('../models/point');
const Player = require('../models/player');
const PointPlayer = require('../models/pointPlayer');
const codeGenerator = require('../utils/codeGenerator');

const pointController = {};

pointController.getPoints = async (req, res) => {
    const app_code = req.params.app_code;
    await Point.find({ app_code: app_code }, {_id: 0}, (err, data) => {
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

pointController.postPoint = async (req, res) => {
    const app_code = req.params.app_code;
    const {name, abbreviation, initial_points, max_points, daily_max, is_default, hidden} = req.body;
    if(!name || !abbreviation || !initial_points || !max_points || !daily_max || !is_default || !hidden ){
        res.status(400).send('Write all the fields');
        return;
    }
    let code = await codeGenerator.codeGenerator(app_code, name, 'point');
    const timesRepeated = await Point.countDocuments( { 'code' : { '$regex' : code, '$options' : 'i' } } );
    if(timesRepeated > 0){
        code = code+(timesRepeated+1).toString();
    }
    var point = new Point({
        name: name,
        abbreviation: abbreviation,
        app_code: app_code,
        initial_points: initial_points,
        max_points: max_points,
        daily_max: daily_max,
        is_default: is_default,
        hidden: hidden,
        code: code
    });
    const players = await Player.find({ app_code: app_code }, (err) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                err
            });
        }
    });
    const pointPlayers = [];
    await point.save( err => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
    })
    for(let i = 0; i<players.length; i++){
        pointPlayers.push(new PointPlayer({
            app_code: app_code,
            player: players[i]._id,
            point: point._id,
            amount: point.initial_points,
        }));
    }
    await PointPlayer.insertMany(pointPlayers, err => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
    });
    res.status(200).json({
        ok: true,
        data: point
    })
};

pointController.updatePoint = async (req, res) => {
    const point_code = req.params.point_code;
    const {name, abbreviation, initial_points, max_points, daily_max, is_default, hidden, code} = req.body;
    if(!name || !abbreviation || !initial_points || !max_points || !daily_max || !is_default || !hidden || !code){
        res.status(400).send('Write all the fields');
        return;
    }
    await Point.updateOne( { code: point_code}, req.body, (err, data) => {
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

pointController.deletePoint = async (req, res) => {
    const point_code = req.params.point_code;
    await Point.deleteOne( { code: point_code}, (err, data) => {
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

pointController.getPoint = async  (req, res) => {
    const point_code = req.params.point_code;
    await Point.findOne( { code: point_code}, {_id: 0}, (err, data) => {
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


module.exports = pointController;
