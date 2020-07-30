const Application = require('../models/application');

const applicationController = {};

applicationController.getApps = async (req, res) => {
    await Application.find({},{_id:0}, (err, data) => {
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

applicationController.postApp = async (req, res) => {
    const {name, description, owner} = req.body;
    if(!name || !description || !owner){
        res.status(400).send('Write all the fields');
        return;
    }
    const code = name.split(' ').join('-');
    var app = new Application({
        name: name,
        description: description,
        owner: owner,
        code: code,
        focus: false,
    });
    await app.save( (err) => {
        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            message: 'Your App was created successfully'
        });
    })
};

applicationController.updateApp = async (req, res) => {
    const app_code = req.params.app_code;
    const {name, description, owner, code} = req.body;
    if(!name || !description){
        res.status(400).send('Write all the fields');
        return;
    }
    await Application.updateOne( { code: app_code}, req.body, (err, data) => {
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

applicationController.deleteApp = async (req, res) => {
    const app_code = req.params.app_code;
    await Application.deleteOne( { code: app_code}, (err, data) => {
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

applicationController.getApp = async  (req, res) => {
    const app_code = req.params.app_code;
    await Application.findOne( {code: app_code},{ _id: 0}, (err, data) => {
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

applicationController.getFocusApp= async (req, res)=> {
    const user_id = req.params.user_id;
    await Application.findOne( {focus: true, owner: user_id}, (err, data) => {
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

applicationController.changeFocusApp = async(req, res) => {
    const user_id = req.params.user_id;
    const new_focus_code = req.body.app_code;
    if(!new_focus_code){
        res.status(400).send('Write the code of the new active app');
        return;
    }
    await Application.updateOne({focus: true, owner: user_id}, {$set: {focus: false}}, (err) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                err
            });
        }
    });
    await Application.updateOne({code: new_focus_code, owner: user_id},{$set: {focus: true}}, (err, data) => {
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
}


module.exports = applicationController;
