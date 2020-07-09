const Badge = require('../models/badge');

const badgeController = {};

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

badgeController.postBadge= async (req, res) => {
    const app_name = req.params.app_name;
    const {title, times_earned, image_path, description, last_time_earned} = req.body;
    if(!title || !times_earned || !image_path || !description || !last_time_earned){
        res.status(400).send('Write all the fields');
        return;
    }
    var badge = new badge({
        title: title,
        description: description,
        app_name: app_name,
        image_path: image_path,
        last_time_earned: last_time_earned
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
