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
    const {name, description, owner, code} = req.body;
    if(!name || !description || !owner || !code){
        res.status(400).send('Write all the fields');
        return;
    }
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
    if(!name || !description || !owner || !code){
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


module.exports = applicationController;
