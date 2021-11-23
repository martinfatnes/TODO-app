const express = require('express');
const protect = require('../login/protect');
const db = require('../db');
const router = express.Router();

router.post('/api/category', protect, async (req, res, next) => {
    const updata = req.body;
    const username = res.locals.username;

    try{
        const data = await db.createCategory(updata.header, username);
        
        if(data.rows.length > 0){
            res.status(200).json({msg: 'Added category'});
        }
        else{
            throw "Could not create category";
        }
    }
    catch(err){
        console.log(err);
    }
})

router.delete('/api/delete/category', protect, async (req, res, next) => {
    const updata = req.body;
    const userid = res.locals.userid;

    try{
        const data = await db.deleteCategory(updata.name, userid);

        if(data.rows.length > 0){
            res.status(200).json({msg: 'Deletd category'});
        }
        else{
            throw 'Could not delete';
        }
    }
    catch(err){
        console.log(err);
    }
})

router.post('/api/content', protect, async (req, res, next) => {
    const updata = req.body;
    const username = res.locals.username;

    try{
        const categoryid = await db.getCategory(updata.header, username);
        const data = await db.createToDoItem(updata.content, username, categoryid.rows[0].id);
        
        if(data.rows.length > 0 || categoryid.rows.length > 0){
            res.status(200).json({msg: 'Added content'});
        }
        else{
            throw "Could not create category";
        }
    }
    catch(err){
        next(err);
    }
})

router.get('/api/category/all', protect, async (req, res, next) => {
    const userid = res.locals.userid;

    try{
        const data = await db.getAllCategoriesUser(userid);
        
        if(data.rows.length > 0){
            res.status(200).json(data.rows);
        }
        else{
            res.status(404).json({msg: 'You have no categories'});
        }
    }
    catch(err){
        next(err);
    }
})

router.get('/api/content/all', protect, async (req, res, next) => {
    const userid = res.locals.userid;

    try{
        const data = await db.getContentOfCategory(userid);

        if(data.rows.length > 0){
            res.status(200).json(data.rows);
        }
        else{
            res.status(404).json({msg: "no content here"});
        }
    }
    catch(err){
        next(err);
    }
})


module.exports = router; 