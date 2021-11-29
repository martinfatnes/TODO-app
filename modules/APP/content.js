const express = require('express');
const protect = require('../login/protect');
const db = require('../db');
const router = express.Router();

router.delete('/api/delete/content', protect, async (req, res, next) => {
    const updata = req.body;
    const username = res.locals.username;

    try{    
        const data = await db.deleteItem(username, updata.id);

        if(data.rowCount > 0){
            res.status(200).json({msg: "Content deleted"}).end();
        }
    }
    catch(err){
        next(err);
    }
})

router.post('/api/content', protect, async (req, res, next) => {
    const updata = req.body;
    const username = res.locals.username;
    console.log("geting category");
    try{
        const categoryid = await db.getCategory(updata.header, username);
        const data = await db.createToDoItem(updata.content, username, categoryid.rows[0].id, updata.shareStatus);
        
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

router.get('/api/content/public', async (req, res, next) => {
    
    try{
        const categories = await db.getPublicCategory();
        const items = await db.getContent()
        const arr = [categories.rows, items.rows];

        if(categories.rows.length > 0){   
            res.status(200).json(arr);
        }
        else{
            res.status(404).json({msg: "No data"});
        }
    }
    catch(err){
        next(err);
    }
})

router.get('/api/content/all/user', protect, async (req, res, next) => {
    const username = res.locals.username;
    try{
        const categories = await db.getAllCategoriesUser(username);
        const items = await db.getAllContentUser(username);
        const arr = [categories.rows, items.rows];
        
        if(categories.rows.length > 0){
            res.status(200).json(arr);
        }
        else{
            res.status(404).json({msg: "No data"});
        }
    }
    catch(err){
        next(err);
    }
})

router.get('/api/content/user', protect, async (req, res, next) => {
    const username = res.locals.username;
    
    try{
        const data = await db.getContentForUser(username);
        
        if(data.rows.length > 0){
            res.status(200).json(data.rows);
        }
    }
    catch(err){
        next(err);
    }
})

router.put('/api/updateContent', async (req, res, next) => {
    const updata = req.body;
    
    try{
        const data = await db.updateToDoItem(updata.content, updata.id);

        if(data.rows.length > 0){
            res.status(200).json(data.rows);
        }
    }
    catch(err){
        next(err);
    }
})

router.put('/api/update/complteded', async (req, res, next) => {
    const updata = req.body;

    try{
        const data = await db.updateCompletedItems(updata.id, updata.status);
        if(data.rows.length > 0){
            res.status(200).json(data.rows);
        }
    }
    catch(err){
        next(err);
    }
})

module.exports = router; 