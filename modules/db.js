const pg = require('pg');
const dbURI = "postgres://nzohxjpqrggkxy:edb443c4179a4509dbedab3c1d403852847ab181dae8080749eb26654cdb28f2@ec2-52-208-145-55.eu-west-1.compute.amazonaws.com:5432/delfh0sghmkc1j";
const connstring = process.env.DATABASE_URL || dbURI;
const pool = new pg.Pool({
    connectionString: connstring,
    ssl: {rejectUnauthorized: false}
})
const dbMethods = {};

dbMethods.createToDoItem = function(data, userid, categoryid){
    const sql = "INSERT INTO content (id, data, userid, categoryid) VALUES(DEFAULT, $1, $2, $3) RETURNING *";
    const values = [data, userid, categoryid];
    return pool.query(sql, values);
}

dbMethods.getContentOfCategory = function(userid){
    const sql = "SELECT * FROM content WHERE userid = $1";
    const values = [userid];
    return pool.query(sql, values);
}

dbMethods.updateToDoItem = function(){

}

dbMethods.getAllCategoriesUser = function(userid){
    const sql = "SELECT * FROM category WHERE userid = $1";
    const values = [userid];
    return pool.query(sql, values);
}

dbMethods.deleteItem = function(){

}

dbMethods.createCategory = function(header, userid){
    const sql = "INSERT INTO category (id, name, userid) VALUES(DEFAULT, $1, $2) RETURNING *";
    const values = [header, userid];
    return pool.query(sql, values);
}

dbMethods.getCategory = function(header, userid){
    const sql = "SELECT * FROM category WHERE name = $1 AND userid = $2";
    const values = [header, userid];
    return pool.query(sql, values);
}

dbMethods.deleteCategory = function(name, userid){
    const sql = 'DELETE FROM category WHERE name = $1 AND userid = $2 RETURNING *';
    const values = [name, userid];
    return pool.query(sql, values);
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