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

    /*
     //  Sletter også innhold om kategorien hadde noe
     await deleteCategoryContent();

     Vi har en sånn foreign key mellom kategori og content, så sletting av kategori
     tar med seg alt innhold med samme kategori id(fk).

     */
})

router.get('/api/category/all', protect, async (req, res, next) => {
    const username = res.locals.username;
    
    try{
        const data = await db.getAllCategoriesUser(username);
        
        if(data.rows.length > 0){
            res.status(200).json(data.rows);
        }
    }
    catch(err){
        next(err);
    }
})

router.get('/api/category/public', async (req, res, next) => {
    try{
        const data = await db.getPublicCategory();

        if(data.rows.length > 0){
            res.status(200).json(data.rows);
        }
    }
    catch(err){
        next(err);
    }
})

module.exports = router;