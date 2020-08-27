const Application = require('../models/application');

checkAppCodeParam = (req, res, next) => {
    const app_code = req.params.app_code;
    if(!app_code){
        res.status(400).send('Failed! Write App Code!');
        return;
    }
    // Check if name exists
    Application.findOne({
        code: app_code
    }).exec((err, app) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!app) {
            res.status(400).send({ message: "Failed! App doesn't exist!" });
            return;
        }

        next();
    });
};


const applicationMiddleware = {
    checkAppCodeParam
};

module.exports = applicationMiddleware;