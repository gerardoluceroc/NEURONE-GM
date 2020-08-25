const Badge = require('../models/badge');
const imageStorage = require('../middlewares/imageStorage');

const badgeController = {};


badgeController.xdxd = (req, res) => {
    console.log("Hola")
    res.json({ file: req.file});
}


badgeController.getBadges = async (req, res) => {
    imageStorage.gfs.find({ filename: req.params.filename}).toArray((err, files) =>{
        if(!files || files.length === 0){
            return res.status(404).json({
                err: 'No files exist'
            })
        }
        if(files[0].contentType === 'image/jpeg' || files[0].contentType === 'img/png'){
            imageStorage.gfs.openDownloadStreamByName(req.params.filename).pipe(res);
        }else{
            return res.status(404).json({
                err: 'No Image'
            })
        }
    })
};

badgeController.getBadges2 = async (req, res) => {
    imageStorage.gfs.find().toArray((err, files) =>{
        if(!files || files.length === 0){
            return res.status(404).json({
                err: 'No files exist'
            })
        }
        return res.json(files);
    })
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
