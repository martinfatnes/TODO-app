const express = require("express");
const protect = require("../login/protect");
const db = require("../db");
const router = express.Router();

router.post("/api/category", protect, async (req, res, next) => {
  const updata = req.body;
  const username = res.locals.username;

  try {
    const data = await db.createCategory(
      updata.header,
      username,
      updata.shareStatus,
      updata.tag,
      updata.date
    );

    if (data.rows.length > 0) {
      res.status(200).json({ msg: "Added category" }).end();
    } 
    else if(updata.header = ""){
      res.status(400).json({msg: "Lists must contain header"}).end();
    }
  } catch (err) {
    next(err);
  }
});

router.post("/api/category/privacy", protect, async (req, res, next) => {
  const {share, categoryId} = req.body;
  const username = res.locals.username;

  try {
    const data = await db.updateCategoryShare(username, share, categoryId)

    if (data.rows.length > 0) {
      res.status(200).json({ msg: "Was updated" }).end();
    } else {
      res.status(200).json({ msg: "Can't update category shareStatus" }).end();
    }
  } catch (err) {
    next(err);
  }
});

router.post("/api/category/name", protect, async (req, res, next) => {
  const {name, categoryId} = req.body;
  const username = res.locals.username;

  try {
    const data = await db.updateCategoryName(username, name, categoryId)

    if (data.rows.length > 0) {
      res.status(200).json({ msg: "Was updated" });
    } else {
      res.status(200).json({ msg: "Can't update category name" });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/api/category/privacy", protect, async (req, res, next) => {
  const {share, categoryId} = req.body;
  const username = res.locals.username;

  try {
    const data = await db.updateCategoryShare(username, share, categoryId)

    if (data.rows.length > 0) {
      res.status(200).json({ msg: "Was updated" });
    } else {
      res.status(200).json({ msg: "Can't update category shareStatus" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/api/category/name", protect, async (req, res, next) => {
  const {name, categoryId} = req.body;
  const username = res.locals.username;

  try {
    const data = await db.updateCategoryName(username, name, categoryId)

    if (data.rows.length > 0) {
      res.status(200).json({ msg: "Was updated" });
    } else {
      res.status(200).json({ msg: "Can't update category name" });
    }
  } catch (err) {
    console.log(err);
  }
});


router.delete("/api/category/:id", protect, async (req, res, next) => {
  const id = req.params.id;
  const username = res.locals.username;

  try {
    const data = await db.deleteCategory(id, username);
    if (data.rows.length > 0) {
      res.status(200).json({ msg: "Deleted category" }).end();
    } 
    else{
      res.status(404).json({msg: "Undefined List"}).end();
    }
  } catch (err) {
    next(err);
  }
});

router.get("/api/category/all", protect, async (req, res, next) => {
  const username = res.locals.username;

  try {
    const data = await db.getAllCategoriesUser(username);

    if (data.rows.length > 0) {
      res.status(200).json(data.rows).end();
    }
    else{
      res.status(404).json({msg: "No categories found"}).end();
    }

  } catch (err) {
    next(err);
  }
});

router.put("/api/tags", async (req, res, next) => {
  const updata = req.body;

  try {
    const data = await db.getTag(updata.id, updata.tag);

    if (data.rows.length > 0) {
      res.status(200).json(data.rows).end();
    }
    else{
      res.status(404).json({msg: "Cant find selected list"}).end();
    }

  } catch (err) {
    next(err);
  }
});

router.put("/api/setDate", async (req, res, next) => {
  const updata = req.body;

  categoryId = updata.categoryId;
  date = updata.date;
  try {
    const data = await db.setDate(date, categoryId);

    if (data.rows.length > 0) {
      res.status(200).json(data.rows).end();
    }
    else{
      res.status(404).json({msg: "Cant find selected list"}).end();
    }

  } catch (err) {
    next(err);
  }
});

router.put("/api/modify/category", async (req, res, next) => {
  const updata = req.body;

  if(updata.date === ""){
    updata.date = null;
  }

  try{
    const data = await db.updateCategory(updata.header, updata.public, "#" + updata.tag, updata.date, updata.id);

    if(data.rowCount > 0){
      res.status(200).json({msg: "Card was updated!"}).end();
    }
    else{
      res.status(404).json({msg: "Cant find selected list"}).end();
    }
  }
  catch(err){
    next(err);
  }
})

module.exports = router;
