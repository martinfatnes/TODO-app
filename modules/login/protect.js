const utils = require('./auth_utils');

function protect(req, res, next){
    const token = req.headers.autorization;

    if(!token){
        res.status(401).json({error: "Valid token not found"}).end();
        return;
    }

    const payload = utils.verifyToken(token);
    
    if(!payload){
        res.status(403).json({error: "Not a valid token"}).end();
        return;
    }

    res.locals.userid = payload.userid;
    res.locals.username = payload.user;

    next();
}

module.exports = protect;