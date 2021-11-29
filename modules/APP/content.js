const express = require('express');
const protect = require('../login/protect');
const db = require('../db');
const router = express.Router();

router.post('/api/category', protect, async (req, res, next) => {
    const updata = req.body;
    const username = res.locals.username;
    try{
        const data = await db.createCategory(updata.header, username, updata.shareStatus);
        
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

router.delete('/api/category/:id', protect, async (req, res, next) => {
    const id = req.params.id;
    const username = res.locals.username;

    try{
        const data = await db.deleteCategory(id, username);
        if(data.rows.length > 0){
            res.status(200).json({msg: 'Deleted category'});
        }
        else{
            throw 'Could not delete';
        }
    }
    catch(err){
        console.log(err);
    }

     //  Sletter også innhold om kategorien hadde noe
     await deleteCategoryContent();
})

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

router.post('/api/unlistedContent', protect, async (req, res, next) => {
    const updata = req.body;
    const username = res.locals.username;
    try{
        const data = await db.createToDoItem(updata.content, username, null, updata.shareStatus);

        if(data.rows.length > 0){
            res.status(200).json({msg: "unlisted items"});
        }
        else{
            throw "could nt add"
        }
    }
    catch(err){
        next(err);
    }
})

router.get('/api/category/all', protect, async (req, res, next) => {
    const username = res.locals.username;
    try{
        const data = await db.getAllCategoriesUser(username);
        
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

router.get('/api/category/public', protect, async (req, res, next) => {
    const username = res.locals.username;
    try{
        const data = await db.getPublicCategory(username);

        if(data.rows.length > 0){
            res.status(200).json(data.rows);
        }
    }
    catch(err){
        next(err);
    }
})

router.get('/api/content/public/:id', async (req, res, next) => {
    const categoryid = req.params.id;
    try{
        const data = await db.getPublicContent(categoryid);
    
        if(data.rows.length > 0){
            res.status(200).json(data.rows);
        }
        else{
            res.status(404).json({msg: "This category has no content"});
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


router.get('/api/content/all/:id', protect, async (req, res, next) => {
    const username = res.locals.username;
    const categoryId = req.params.id;

    try{
        const data = await db.getContentOfCategory(username, categoryId);

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

router.get('/api/content/category', protect, async (req, res, next) => {
    const username = res.locals.username;
    const categoryId = req.body;

    try{
        const data = await getContentOfCategory(username, categoryId);

        if(data.rows.length > 0){
            res.status(200).json(data.rows).end();
        }
    }
    catch(err){
        next(err);
    }
})

router.put('/api/updateContent', async (req, res, next) => {
    const updata = req.body;
    console.log(updata);
    try{
        const data = await db.updateToDoItem(updata.content, updata.id);

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

router.put('/api/update/complteded', async (req, res, next) => {
    const updata = req.body;
    try{
        const data = await db.updateCompletedItems(updata.id, updata.status);
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