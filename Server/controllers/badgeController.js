const Badge = require('../models/badge');
const multer = require('multer');
var path = require('path');

const badgeController = {};

const storage = multer.diskStorage({
    destination: 'public/images',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
});

badgeController.upload = multer({
    storage,
    dest: 'public/images'
});


badgeController.getBadges = async (req, res) => {
    const app_name = req.params.app_name;
    await Badge.find({ app_name: app_name }, (err, data) => {
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

badgeController.postBadge =  async  (req, res) => {
    const app_name = req.params.app_name;
    const {title, description, identifier} = req.body;
    if(!title || !description || !identifier){
        res.status(400).send('Write all the fields');
        return;
    }
    var badge = new Badge({
        title: title,
        description: description,
        app_name: app_name,
        image_path: req.file.path,
        times_earned: 0,
        last_time_earned: null,
        identifier: identifier
    });
    await badge.save( (err, data) => {
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

badgeController.updateBadge = async (req, res) => {
    const badge_id = req.params.badge_id;
    const {title, times_earned, image_path, description, last_time_earned} = req.body;
    if(!title || !times_earned || !image_path || !description || !last_time_earned){
        res.status(400).send('Write all the fields');
        return;
    }
    await Badge.updateOne( { _id: badge_id}, req.body, (err, data) => {
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

badgeController.deleteBadge = async (req, res) => {
    const badge_id = req.params.badge_id;
    await Badge.deleteOne( { _id: badge_id}, (err, data) => {
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

badgeController.getBadge = async  (req, res) => {
    const badge_id = req.params.badge_id;
    await Badge.findOne( { _id: badge_id}, (err, data) => {
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


module.exports = badgeController;
