const UserToken = require("../models/userToken");

verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ok: false, message: "No token provided!"});
    }
    UserToken.findOne({token: token}, (err, userToken) => {
        if (err){
            return res.status(404).json({
                ok: false,
                err
            });
        }
        if(!userToken){
            return res.status(401).send({ok: false, message: "Failed! Not Authorized!" });
        }
        const timestamp = userToken.timestamp;
        const expiration = userToken.expiration;
        if((new Date()).getTime() - timestamp.getTime() > expiration){
            UserToken.deleteOne({username: userToken.username}, err => {
                if(err){
                    return res.status(404).json({
                    ok: false,
                    err
                });
                }
                return res.status(401).send({ok: false, message: "Token expired!" });
            })
        }
        else{
            req.authUsername = userToken.username;
            next()
        }
    })
};

const authMiddleware = {
    verifyToken
};

module.exports = authMiddleware;