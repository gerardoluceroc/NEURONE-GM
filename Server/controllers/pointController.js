const Point = require('../models/point');

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
    const {name, abbreviation, initial_points, max_points, daily_max, is_default, hidden, code} = req.body;
    if(!name || !abbreviation || !initial_points || !max_points || !daily_max || !is_default || !hidden || !code){
        res.status(400).send('Write all the fields');
        return;
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
    await point.save( (err, data) => {
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
