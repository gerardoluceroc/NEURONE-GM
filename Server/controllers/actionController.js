const Action = require('../models/action');
const Application = require('../models/application');
const codeGenerator = require('../utils/codeGenerator');

const actionController = {};

actionController.getActions = async (req, res) => {
    const app_code = req.params.app_code;
    await Action.find({ app_code: app_code }, {_id: 0}, (err, actions) => {
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
    const app_code = req.params.app_code;
    const {name, description, repeatable} = req.body;
    if(!name || !description || !repeatable){
        res.status(400).send('Write all the fields');
        return;
    }
    let code = codeGenerator.codeGenerator(app_code, name, 'action');
    const timesRepeated = await Action.countDocuments( { 'code' : { '$regex' : code, '$options' : 'i' } } );
    if(timesRepeated > 0){
        code = code+(timesRepeated+1).toString();
    }
    const action = new Action({
        name: name,
        description: description,
        app_code: app_code,
        repeatable: repeatable,
        code: code
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
    const action_code = req.params.action_code;
    const {name, description, repeatable} = req.body;
    if(!name || !description || !repeatable){
        res.status(400).send('Write all the fields');
        return;
    }
    await Action.updateOne( { code: action_code}, req.body, (err, data) => {
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
    const action_code = req.params.action_code;
    await Action.deleteOne( { code: action_code}, (err, data) => {
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
    const action_code = req.params.action_code;
    await Action.findOne( { code: action_code}, {_id: 0}, (err, data) => {
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
