const Point = require('../models/point');

const pointController = {};

pointController.getPoints = async (req, res) => {
    const app_name = req.params.app_name;
    await Point.find({ app_name: app_name }, (err, data) => {
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
    const app_name = req.params.app_name;
    const {name, abbreviation, initial_points, max_points, daily_max, is_default, hidden, identifier} = req.body;
    if(!name || !abbreviation || !initial_points || !max_points || !daily_max || !is_default || !hidden || !identifier){
        res.status(400).send('Write all the fields');
        return;
    }
    var point = new Point({
        name: name,
        abbreviation: abbreviation,
        app_name: app_name,
        initial_points: initial_points,
        max_points: max_points,
        daily_max: daily_max,
        is_default: is_default,
        hidden: hidden,
        identifier: identifier
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
    const point_id = req.params.point_id;
    const {name, abbreviation, initial_points, max_points, daily_max, is_default, hidden} = req.body;
    if(!name || !abbreviation || !initial_points || !max_points || !daily_max || !is_default || !hidden){
        res.status(400).send('Write all the fields');
        return;
    }
    await Point.updateOne( { _id: point_id}, req.body, (err, data) => {
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
    const point_id = req.params.point_id;
    await Point.deleteOne( { _id: point_id}, (err, data) => {
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
    const point_id = req.params.point_id;
    await Point.findOne( { _id: point_id}, (err, data) => {
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
