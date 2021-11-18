const crypto = require("crypto");

const utils = {};

utils.decodeCred = function(credstring){
    const cred = {};

    const b64String = credstring.replace('basic ', '');

    const asciiString = Buffer.from(b64String, 'base64').toString('ascii');

    cred.username = asciiString.replace(/:.*/, '');

    cred.password = asciiString.replace(cred.username + ':', '');

    return cred;
}

utils.createHash = function(password){
    const hash = {};

    hash.salt = Math.random().toString();
    hash.value = crypto.scryptSync(password, hash.salt, 64).toString('hex');

    return hash;
}

utils.createToken = function(username, userID){
    const part1 = JSON.stringify({'alg': 'H256', 'typ': 'JWT'});
    const part2 = JSON.stringify({'user': username, 'userid': userID, 'iat': Date.now()});

    const b64Part1 = Buffer.from(part1).toString('base64');
    const b64Part2 = Buffer.from(part2).toString('base64');

    const openPart = b64Part1 + '.' + b64Part2;

    const secret = "dronningmaudsland";
    const sign = crypto.createHmac('SHA256', secret).update(openPart).digest('base64');

    return openPart + '.' + sign;
}

utils.verifyToken = function(token){
    const tokenArr = token.split('.');
    const openPart = tokenArr[0] + '.' + tokenArr[1];
    const signToCheck = tokenArr[2];

    const secret = "dronningmaudsland";
    const sign = crypto.createHmac('SHA256', secret).update(openPart).digest('base64');

    if(signToCheck != sign){
        return false;
    }

    const payloadText = Buffer.from(tokenArr[1], 'base64').toString('ascii');
    const payload = JSON.parse(payloadText);

    const expireTime = payload.iat + 24 * 60 * 60 * 1000;

    if(expireTime < Date.now()){
        return false;
    }

    return payload;
}

utils.verifyPassword = function(pswFromUser, hashFromDB, saltFromDB){
    const hash = crypto.scryptSync(pswFromUser, saltFromDB, 64).toString('hex');
    if(hash === hashFromDB){
        return true;
    }

    return false;
}

module.exports = utils;