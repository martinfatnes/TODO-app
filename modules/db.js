const pg = require("pg");
const dbURI =
  "postgres://nzohxjpqrggkxy:edb443c4179a4509dbedab3c1d403852847ab181dae8080749eb26654cdb28f2@ec2-52-208-145-55.eu-west-1.compute.amazonaws.com:5432/delfh0sghmkc1j";
const connstring = process.env.DATABASE_URL || dbURI;
const pool = new pg.Pool({
  connectionString: connstring,
  ssl: { rejectUnauthorized: false },
});
const dbMethods = {};

//CONTENT---------------------------------------------------

dbMethods.createToDoItem = function (content, username, categoryid, share) {
  const sql =
    "INSERT INTO content (id, content, username, categoryid, share) VALUES(DEFAULT, $1, $2, $3, $4) RETURNING *";
  const values = [content, username, categoryid, share];
  return pool.query(sql, values);
};

dbMethods.getContent = function () {
  const sql = "SELECT * FROM content";
  return pool.query(sql);
};

dbMethods.updateToDoItem = function (content, id) {
  const sql = "UPDATE content SET content = $1 WHERE id = $2 RETURNING *";
  const values = [content, id];
  return pool.query(sql, values);
};

dbMethods.updateCompletedItems = function (id, status) {
  const sql = "UPDATE content SET done = $2 WHERE id = $1 RETURNING *";
  const values = [id, status];
  return pool.query(sql, values);
};

dbMethods.getAllContentUser = function (username) {
  const sql = "SELECT * FROM content WHERE username = $1";
  const values = [username];
  return pool.query(sql, values);
};

//CATEGORY---------------------------------------------------

dbMethods.updateCategory = function(name, share, tag, date, id){
  const sql = "UPDATE category SET name = $1, share = $2, tag = $3, date = $4 WHERE id = $5";
  const values = [name, share, tag, date, id];
  return pool.query(sql, values);
}

dbMethods.setDate = function (date, categoryId) {
  const sql = "UPDATE category SET date = $1 WHERE id = $2 RETURNING *";
  const values = [categoryId, date];
  return pool.query(sql, values);
};

dbMethods.getTag = function (id, tag) {
  const sql = "UPDATE category SET tag = $1 WHERE id = $2 RETURNING *";
  const values = [tag, id];
  return pool.query(sql, values);
};

dbMethods.getAllCategoriesUser = function (username) {
  const sql = "SELECT * FROM category WHERE username = $1";
  const values = [username];
  return pool.query(sql, values);
};

dbMethods.getCategory = function (id, username) {
  const sql = "SELECT * FROM category WHERE id = $1 AND username = $2";
  const values = [id, username];
  return pool.query(sql, values);
};

dbMethods.deleteItem = function (username, id) {
  const sql = "DELETE FROM content WHERE username = $1 AND id = $2";
  const values = [username, id];
  return pool.query(sql, values);
};

dbMethods.createCategory = function (name, username, share, tag, date) {
  const sql =
    "INSERT INTO category (id, name, username, share, tag, date) VALUES(DEFAULT, $1, $2, $3, $4, $5) RETURNING *";
  const values = [name, username, share, tag, date];
  return pool.query(sql, values);
};

dbMethods.deleteCategory = function (id, username) {
  const sql =
    "DELETE FROM category WHERE id = $1 AND username = $2 RETURNING *";
  const values = [id, username];
  return pool.query(sql, values);
};

dbMethods.getPublicCategory = function () {
  const sql = "SELECT * FROM category WHERE share = true";
  return pool.query(sql);
};

dbMethods.getContentForUser = function (username) {
  const sql = "SELECT * FROM content WHERE username = $1";
  const values = [username];
  return pool.query(sql, values);
};

//USERS---------------------------------------------------

dbMethods.createUser = function (username, password, salt) {
  const sql =
    "INSERT INTO users (id, username, password, salt) VALUES(DEFAULT, $1, $2, $3) RETURNING *";
  const values = [username, password, salt];
  return pool.query(sql, values);
};

dbMethods.getUser = function (username) {
  const sql = "SELECT * FROM users WHERE username = $1";
  const values = [username];
  return pool.query(sql, values);
};

dbMethods.deleteUser = function (userid) {
  const sql = "DELETE FROM users WHERE id = $1 RETURNING *";
  const values = [userid];
  return pool.query(sql, values);
};

dbMethods.changePassword = function (userid, salt, password) {
  const sql =
    "UPDATE users SET password = $1, salt = $2 WHERE id = $3 RETURNING *";
  const values = [password, salt, userid];
  return pool.query(sql, values);
};

module.exports = dbMethods;
