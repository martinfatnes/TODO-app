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
    } else {
      throw "Could not create category";
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
    } else {
      throw "Could not delete";
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/api/category/all", protect, async (req, res, next) => {
  const username = res.locals.username;

  try {
    const data = await db.getAllCategoriesUser(username);

    if (data.rows.length > 0) {
      res.status(200).json(data.rows).end();
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
  } catch (err) {
    next(err);
  }
});

router.put("/api/modify/category", async (req, res, next) => {
  const updata = req.body;

  try{
    const data = await db.updateCategory(updata.header, updata.public, "#" + updata.tag, updata.date, updata.id);

    if(data.rows.length > 0){
      res.status(200).json({msg: "Category updated!"});
    }

  }
  catch(err){
    next(err);
  }
})

module.exports = router;
