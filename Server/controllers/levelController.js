const Level = require('../models/level');
const Point = require('../models/point');
const levelController = {};

levelController.getLevels = async (req, res) => {
    const app_code = req.params.app_code;
    await Level.find({app_code: app_code}, {_id: 0}, (err, data) => {
        if (err)
        {
            return res.status(404).json({
                ok: false,
                err
            })
        }
        res.status(200).json({
            ok: true,
            data
        });
    }).populate('point_required');
};

levelController.postLevel = async (req, res) => {
    const app_code = req.params.app_code;
    const {name, description, point_required, point_threshold, code} = req.body;
    if(!name || !description || !point_required || !point_threshold || !code){
        res.status(400).send('Write all the fields');
        return;
    }
    const point = await Point.findOne({code: point_required}, (err)=>{
        if(err){
            return res.status(404).json({
                ok: false,
                err
            })
        }
    });
    var level = new Level({
        name: name,
        description: description,
        app_code: app_code,
        point_required: point._id,
        point_threshold: point_threshold,
        code: code
    });
    await level.save( (err, data) => {
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

levelController.updateLevel = async (req, res) => {
    const level_code = req.params.level_code;
    const {name, description, point_required, point_threshold, code} = req.body;
    if(!name || !description || !point_required || !point_threshold || !code){
        res.status(400).send('Write all the fields');
        return;
    }
    const point = await Point.findOne({code: point_required}, (err)=>{
        if(err){
            return res.status(404).json({
                ok: false,
                err
            })
        }
    });
    req.body.point_required = point._id;
    await Level.updateOne( { code: level_code}, req.body, (err, data) => {
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

levelController.deleteLevel = async (req, res) => {
    const level_code = req.params.level_code;
    await Level.deleteOne( { code: level_code}, (err, data) => {
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

levelController.getLevel = async  (req, res) => {
    const level_id = req.params.level_id;
    await Level.findOne( { _id: level_id}, (err, data) => {
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


module.exports = levelController;
