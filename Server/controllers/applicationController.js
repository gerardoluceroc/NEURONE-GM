const Application = require('../models/application');

const applicationController = {};

applicationController.getApps = async (req, res) => {
    await Application.find( (err, actions) => {
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
        code: code
    });
    await app.save( (err, data) => {
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

applicationController.updateApp = async (req, res) => {
    const app_name = req.params.app_name;
    const {name, description, owner, code} = req.body;
    if(!name || !description || !owner || !code){
        res.status(400).send('Write all the fields');
        return;
    }
    await Application.updateOne( { name: app_name}, req.body, (err, data) => {
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
    const app_name = req.params.app_name;
    await Application.deleteOne( { name: app_name}, (err, data) => {
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
    const app_name = req.params.app_name;
    await Application.findOne( {name: app_name}, (err, data) => {
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
}


module.exports = applicationController;
