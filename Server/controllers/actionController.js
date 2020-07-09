const Action = require('../models/action');
const Application = require('../models/application');

const actionController = {};

actionController.getActions = async (req, res) => {
    const app_name = req.params.app_name;
    await Action.find({ app_name: app_name }, (err, actions) => {
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

actionController.postAction = async (req, res) => {
    const app_name = req.params.app_name;
    const {name, description, repeatable} = req.body;
    if(!name || !description || !repeatable){
        res.status(400).send('Write all the fields');
        return;
    }
    var action = new Action({
        name: name,
        description: description,
        app_name: app_name,
        repeatable: repeatable
    });
    await action.save( (err, data) => {
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

actionController.updateAction = async (req, res) => {
    const action_id = req.params.action_id;
    const {name, description, repeatable} = req.body;
    if(!name || !description || !repeatable){
        res.status(400).send('Write all the fields');
        return;
    }
    await Action.updateOne( { _id: action_id}, req.body, (err, data) => {
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

actionController.deleteAction = async (req, res) => {
    const action_id = req.params.action_id;
    await Action.deleteOne( { _id: action_id}, (err, data) => {
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

actionController.getAction = async  (req, res) => {
    const action_id = req.params.action_id;
    await Action.findOne( { _id: action_id}, (err, data) => {
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

module.exports = actionController;
