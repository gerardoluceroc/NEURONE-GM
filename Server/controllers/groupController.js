const Group = require('../models/group');

const groupController = {};

groupController.getGroups = async (req, res) => {
    const app_name = req.params.app_name;
    await Group.find({ app_name: app_name }, (err, data) => {
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

groupController.postGroup = async (req, res) => {
    const app_name = req.params.app_name;
    const {name, description, point_required_id, point_threshold, identifier} = req.body;
    if(!name || !description || !point_required_id || !point_threshold || !identifier){
        res.status(400).send('Write all the fields');
        return;
    }
    var group = new group({
        name: name,
        description: description,
        app_name: app_name,
        point_required_id: point_required_id,
        point_threshold: point_threshold,
        identifier: identifier
    });
    await group.save( (err, data) => {
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

groupController.updateGroup = async (req, res) => {
    const group_id = req.params.group_id;
    const {name, description, point_required_id, point_threshold} = req.body;
    if(!name || !description || !point_required_id || !point_threshold){
        res.status(400).send('Write all the fields');
        return;
    }
    await group.updateOne( { _id: group_id}, req.body, (err, data) => {
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

groupController.deleteGroup = async (req, res) => {
    const group_id = req.params.group_id;
    await group.deleteOne( { _id: group_id}, (err, data) => {
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

groupController.getGroup = async  (req, res) => {
    const group_id = req.params.group_id;
    await group.findOne( { _id: group_id}, (err, data) => {
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


module.exports = groupController;
