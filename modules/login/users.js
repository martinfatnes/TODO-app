const express = require('express');
const protect = require('./protect');
const db = require('../db');
const utils = require('./auth_utils');
const router = express.Router();

//CREATE USER
router.post('/api/createUser', async (req, res, next) => {
    const credString = req.headers.authorization; 
    const cred = utils.decodeCred(credString);

    if(cred.username === '' || cred.password === ''){
        res.status(400).json({err: "Please fill in unsername and password"}).end();
        return;
    }

    const hash = utils.createHash(cred.password);

    try{
        const data = await db.createUser(cred.username, hash.value, hash.salt);

        if(data.rows.length > 0){
            res.status(200).json({
                msg: "User created"
            })
        }
    }
    catch(err){
        if(err.constraint === "username_unique"){
            res.status(400).json({
                err: "Username already exists"
            }).end();
            return;
        }
        next(err);
    }
})

//GET USER WITH USERNAME
router.get('/api/getUser', (req, res, next) => {

})

//USER LOGIN
router.post('/api/user/login', async (req, res, next) => {
    const credString = req.headers.authorization; 
    const cred = utils.decodeCred(credString);

    try{
        const data = await db.getUser(cred.username);

        if(data.rows.length <= 0){
            res.status(404).json({err: "user does not exist"}).end();
            return;
        }

        const verify = utils.verifyPassword(cred.password, data.rows[0].password, data.rows[0].salt);
        const token = utils.createToken(data.rows[0].username, data.rows[0].id);

        if(verify){
            res.status(200).json({
                msg: "You are logged in",
                token: token
            }).end();
            return;
        }
        else if(data.rows.length > 0){
            res.status(404).json({
                err: "Wrong password"
            }).end();
            return;
        }    
    }
    catch(err){
        next(err);
    }
})

//DELETE USER
router.delete('/api/user/delete', protect, async (req, res, next) => {
    const userid = res.locals.userid;

    try{
        const data = await db.deleteUser(userid);

        if(data.rows.length > 0){
            res.status(200).json({msg: "User was deleted"}).end();
        }
        else{
            throw "could not delete";
        }
    }
    catch(err){
        next(err);
    }
})

module.exports = router;