const pg = require('pg');
const dbURI = "postgres://nzohxjpqrggkxy:edb443c4179a4509dbedab3c1d403852847ab181dae8080749eb26654cdb28f2@ec2-52-208-145-55.eu-west-1.compute.amazonaws.com:5432/delfh0sghmkc1j";
const connstring = process.env.DATABASE_URL || dbURI;
const pool = new pg.Pool({
    connectionString: connstring,
    ssl: {rejectUnauthorized: false}
})
const dbMethods = {};

dbMethods.createToDoItem = function(content, username, categoryid, share){
    const sql = "INSERT INTO content (id, content, username, categoryid, share) VALUES(DEFAULT, $1, $2, $3, $4) RETURNING *";
    const values = [content, username, categoryid, share];
    return pool.query(sql, values);
}

dbMethods.getContentOfCategory = function(username){
    const sql = "SELECT * FROM content WHERE username = $1";
    const values = [username];
    return pool.query(sql, values);
}

dbMethods.getPublicContent = function(categoryid){
    const sql = "SELECT * FROM content WHERE categoryid = $1 AND share = true";
    const values = [categoryid];
    return pool.query(sql, values);
}

dbMethods.updateToDoItem = function(){

}

///------------------CAtegory

dbMethods.getAllCategoriesUser = function(userid){
    const sql = "SELECT * FROM category WHERE username = $1";
    const values = [userid];
    return pool.query(sql, values);
}

dbMethods.getCategoryPublic = function(userid, public){
    const sql = "SELECT * FROM category WHERE username = $1 AND share = $2";
    const values = [userid, public];
    console.log(userid, public);
    return pool.query(sql, values);
}

dbMethods.deleteItem = function(){

}

dbMethods.createCategory = function(name, username, share){
    const sql = "INSERT INTO category (id, name, username, share) VALUES(DEFAULT, $1, $2, $3) RETURNING *";
    const values = [name, username, share];
    return pool.query(sql, values);
}

dbMethods.getCategory = function(name, username){
    const sql = "SELECT * FROM category WHERE name = $1 AND username = $2";
    const values = [name, username];
    return pool.query(sql, values);
}

dbMethods.deleteCategory = function(name, username){
    const sql = 'DELETE FROM category WHERE name = $1 AND username = $2 RETURNING *';
    const values = [name, username];
    return pool.query(sql, values);
}

dbMethods.getPublicCategory = function(){
    const sql = 'SELECT * FROM category WHERE share = true';
    return pool.query(sql);
}

//USERS---------------------------------------------------

dbMethods.createUser = function(username, password, salt){
    const sql = 'INSERT INTO users (id, username, password, salt) VALUES(DEFAULT, $1, $2, $3) RETURNING *';
    const values = [username, password, salt];
    return pool.query(sql, values);
}

dbMethods.getUser = function(username){
    const sql = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    return pool.query(sql, values);
}

dbMethods.deleteUser = function(userid){
    const sql = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const values = [userid];
    return pool.query(sql, values);
}

dbMethods.changePassword = function(userid, salt, password){
    const sql = 'UPDATE users SET password = $1, salt = $2 WHERE id = $3 RETURNING *';
    const values = [password, salt, userid];
    return pool.query(sql, values);
}

module.exports = dbMethods;