const Level = require('../models/level');

const levelController = {};

levelController.getLevels = async (req, res) => {
    const app_name = req.params.app_name;
    await Level.find({ app_name: app_name }, (err, data) => {
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

levelController.postLevel = async (req, res) => {
    const app_name = req.params.app_name;
    const {name, description, point_required_id, point_threshold} = req.body;
    if(!name || !description || !point_required_id || !point_threshold){
        res.status(400).send('Write all the fields');
        return;
    }
    var level = new Level({
        name: name,
        description: description,
        app_name: app_name,
        point_required_id: point_required_id,
        point_threshold: point_threshold
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
    const level_id = req.params.level_id;
    const {name, description, point_required_id, point_threshold} = req.body;
    if(!name || !description || !point_required_id || !point_threshold){
        res.status(400).send('Write all the fields');
        return;
    }
    await Level.updateOne( { _id: level_id}, req.body, (err, data) => {
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
    const level_id = req.params.level_id;
    await Level.deleteOne( { _id: level_id}, (err, data) => {
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
